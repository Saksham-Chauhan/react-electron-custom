import axios from "axios";
import poller from "promise-poller";
import { useSelector } from "react-redux";
import { getEncryptedToken } from "..";
import { fetchClientCaptchaKey } from "../../features/counterSlice";
import { sendLogs } from "../electron-bridge";

const CAPTCHA_SITEKEY = "4c672d35-0701-42b2-88c3-78380b0db560";

export const useCaptchaResolverMassJoiner = () => {
  const clientKey = useSelector(fetchClientCaptchaKey);

  // GET THE TASK ID

  const getTask = (proxy, inviteCode, captchaData) => {
    console.log("first", inviteCode, captchaData);
    const { captcha_sitekey, captcha_rqdata } = captchaData;
    // const {
    //   host,
    //   port,
    //   auth: { username, password },
    // } = proxy;
    return new Promise(async (resolve, reject) => {
      const obj = {
        type: "HCaptchaTaskProxyless",
        websiteURL: `https://discord.com/invites/${inviteCode}`,
        websiteKey: captcha_sitekey,
        data: captcha_rqdata,
        // type: "HCaptchaTask",
        // websiteURL: `https://discord.com/invites/${inviteCode}`,
        // websiteKey: captcha_sitekey,
        // proxyType: "http",
        // proxyAddress: host,
        // proxyPort: port,
        // proxyLogin: username,
        // proxyPassword: password,
        userAgent:
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) kyro-v1/0.9.2 Chrome/98.0.4758.141 Electron/17.4.0 Safari/537.36",
        //   "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116",
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
                  websiteKey: CAPTCHA_SITEKEY,
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
          sendLogs(`Unable to get captcha task id`);
          reject("Task ID not found" + res.data);
        }
      } catch (error) {
        sendLogs(`Unable to get captcha task id`);
        reject(error.message);
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
          throw new Error();
        }
      } catch (error) {
        sendLogs(`Unable to get captcha solution`);
        throw new Error();
      }
    });
  };

  // MANAGE PROCESS OF POLLING AND CAPTCHA
  const solveCaptcha = async (fn, args) => {
    sendLogs(`Resolving captcha of token :${getEncryptedToken(args.token)}`);
    const { proxy, inviteCode, captchaData } = args;
    getTask(proxy, inviteCode, captchaData).then((response) => {
      if (response) {
        poller({
          taskFn: () => {
            return new Promise(async (resolve, reject) => {
              console.log("RESPONSE IS RECEIVED", response);
              getSolution(response)
                .then((solution) => {
                  console.log("CAPTCHA IS SOLVED", solution);
                  if (fn instanceof Function) {
                    console.log("in if");
                    fn({ ...args, solution: solution.msg, captchaData })
                      .then((res) => {
                        if (res?.response) {
                          sendLogs(
                            `Error after solve captcha with token: ${args.token}`
                          );
                        }
                        resolve(res);
                      })
                      .catch((err) => {
                        // console.log("Some error from discord---", err);
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
                  } else {
                    console.log("Not a Function");
                  }
                })
                .catch((err) => {
                  reject(err);
                });
            });
          },
          interval: 500,
          retries: 10,
        })
          .then((res) => console.log("THEN", res))
          .catch((e) => console.log("CATCH", e));
      }
    });
  };

  return solveCaptcha;
};
