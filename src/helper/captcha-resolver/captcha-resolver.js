import axios from "axios";
import poller from "promise-poller";
import { directDiscordJoinAPI } from "../../api";

const CAPTCHA_SITEKEY = "4c672d35-0701-42b2-88c3-78380b0db560";

export const useCaptchaResolverMassJoiner = () => {
  const tryToSolve = async (data) => {
    const { sitekey, clientKey } = data;
    try {
      const res = await axios.post("https://api.anti-captcha.com/createTask", {
        clientKey: clientKey,
        task: {
          type: "HCaptchaTaskProxyless",
          websiteURL: "https://discord.com/",
          websiteKey: sitekey ? sitekey : CAPTCHA_SITEKEY,
        },
      });
      if (res.data.errorId === 0) {
        console.log("Calling getCaptcha to get soluition...");

        poller({
          taskFn: () => {
            getCaptchaTask(clientKey, res.data.taskId, data)
              .then(async (res) => {
                console.log("Promise Resolved", res);
                const { taskObj, proxy, inviteCode, discordToken } = data;
                await directDiscordJoinAPI(
                  proxy,
                  inviteCode,
                  discordToken,
                  taskObj,
                  res.msg
                );
              })
              .catch((e) => {
                console.log("Promise Rejected", e);
              });
          },
          interval: 2000,
          retries: 10,
          progressCallback: (remain, err) => {
            console.log("Remain", remain, err);
          },
          timeout: 5000,
        });
      } else {
        console.log("Task ID not found", res.data);
      }
    } catch (error) {
      console.log("Something went wrong while create task", error);
    }
  };

  async function getCaptchaTask(clientKey, taskId, data) {
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
            resolve({
              type: "SUCCESS",
              msg: gRecaptchaResponse,
            });
          }
        } else {
          reject({ type: "ERROR", msg: "ERROR KEY DOES NOT EXIST" });
        }
      } catch (error) {
        reject({ type: "ERROR", msg: error.message });
      }
    });
  }
  return tryToSolve;
};
