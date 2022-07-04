import axios from "axios";
import poller from "promise-poller";
import { useSelector } from "react-redux";
import { getEncryptedToken } from "..";
import { fetchClientCaptchaKey } from "../../features/counterSlice";
import { toastWarning } from "../../toaster";
import { sendLogs } from "../electron-bridge";

const CAPTCHA_SITEKEY = "4c672d35-0701-42b2-88c3-78380b0db560";

export const useCaptchaResolverMassJoiner = () => {
  const clientKey = useSelector(fetchClientCaptchaKey);

  // GET THE TASK ID

  const getTask = (proxy, inviteCode, captchaData) => {
    const { captcha_sitekey, captcha_rqdata } = captchaData;
    return new Promise(async (resolve, reject) => {
      const obj = {
        type: "HCaptchaTaskProxyless",
        websiteURL: `https://discord.com/invites/${inviteCode}`,
        websiteKey: captcha_sitekey,
        data: captcha_rqdata,
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) kyro-v1/0.9.2 Chrome/98.0.4758.141 Electron/17.4.0 Safari/537.36",
      };
      try {
        const res = await axios.post(
          "https://api.anti-captcha.com/createTask",
          {
            clientKey: clientKey,
            task: inviteCode
              ? obj
              : {
                  type: "HCaptchaTaskProxyless",
                  websiteURL: `https://discord.com/`,
                  websiteKey: captcha_sitekey
                    ? captcha_sitekey
                    : CAPTCHA_SITEKEY,
                  userAgent:
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) kyro-v1/0.9.2 Chrome/98.0.4758.141 Electron/17.4.0 Safari/537.36",
                },
          }
        );
        if (res.data.errorId === 0) {
          sendLogs(`Get captcha task id`);
          resolve(res.data.taskId);
          console.log("Calling getCaptcha to get solution...");
        } else {
          toastWarning(res?.data?.errorDescription);
          sendLogs(
            `Unable to get captcha task id:${res?.data?.errorDescription}`
          );
          reject("Task ID not found" + res.data);
        }
      } catch (error) {
        sendLogs(`Unable to get captcha task id`);
        reject(error);
      }
    });
  };

  // GET THE CAPTCHA SOLUTION
  const getSolution = (taskId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getResponse = await axios.post(
          "https://api.anti-captcha.com/getTaskResult",
          {
            clientKey,
            taskId,
          }
        );
        if (getResponse.data.errorId === 0 && getResponse.data?.status) {
          if (getResponse.data.status === "ready") {
            const {
              solution: { gRecaptchaResponse },
            } = getResponse.data;
            sendLogs(`Get captcha solution`);
            resolve({
              type: "SUCCESS",
              msg: gRecaptchaResponse,
            });
          } else {
            sendLogs(`Solution is under processing`);
            reject("PROCESSING");
          }
        } else {
          sendLogs(`Unable to get captcha solution`);
          return;
        }
      } catch (error) {
        sendLogs(`Unable to get captcha solution`);
        return;
      }
    });
  };

  // MANAGE PROCESS OF POLLING AND CAPTCHA
  // entry point of captcha resolver Hook
  // TODO-> use try-catch for getSolution
  const solveCaptcha = async (fn, args) => {
    sendLogs(`Resolving captcha of token: -> ${getEncryptedToken(args.token)}`);
    const { proxy, inviteCode, captchaData } = args;
    return getTask(proxy, inviteCode, captchaData)
      .then(async (response) => {
        if (response) {
          return poller({
            taskFn: () => {
              return new Promise(async (resolve, reject) => {
                getSolution(response)
                  .then((solution) => {
                    if (fn instanceof Function) {
                      fn({ ...args, solution: solution.msg, captchaData })
                        .then((res) => {
                          resolve(res);
                        })
                        .catch((err) => {
                          sendLogs(
                            `Error after captcha resolved with token:${getEncryptedToken(
                              args.token
                            )},${err.message}`
                          );
                          resolve({
                            type: "ERROR join",
                            msg: "error",
                          });
                        });
                    }
                  })
                  .catch((err) => {
                    reject(err);
                  });
              });
            },
            interval: 500,
            retries: 3,
          })
            .then((res) => res)
            .catch((e) => console.log("CATCH", e));
        }
      })
      .catch((e) => e);
  };

  return solveCaptcha;
};
