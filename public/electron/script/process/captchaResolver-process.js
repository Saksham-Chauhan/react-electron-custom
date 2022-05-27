const { default: axios } = require("axios");
const { default: poller } = require("promise-poller");
const CAPTCHA_SITEKEY = "4c672d35-0701-42b2-88c3-78380b0db560";

class CaptchaResolverProcess {
  constructor(data) {
    this.taskId = null;
    this.clientKey = null;
    this.createCaptchaTasK(data);
  }

  async createCaptchaTasK(data) {
    const { sitekey, clientKey } = data;
    this.clientKey = clientKey;
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
        this.taskId = res.data.taskId;
        poller({
          taskFn: () => {
            this.getCaptchaTask(clientKey, res.data.taskId, data)
              .then((res) => {
                console.log("Promise Resolved", res);
                this.sendCaptchaResolverMessage(res);
              })
              .catch((e) => {
                console.log("Promise Rejected", e);
                this.sendCaptchaResolverMessage(res);
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
  }

  checkShouldContinuePolling(reason, value) {
    console.log("Should Continue");
    console.log(reason, value);
  }

  getCaptchaTask(clientKey, taskId, data) {
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
              data: JSON.stringify(data),
            });
          } else {
            reject({ type: "ERROR", msg: "PROCESSING" });
          }
        } else {
          reject({ type: "ERROR", msg: "ERROR KEY DOES NOT EXIST" });
        }
      } catch (error) {
        reject({ type: "ERROR", msg: error.message });
      }
    });
  }

  sendCaptchaResolverMessage(msgObj) {
    const win = global.mainWin;
    if (win) {
      win.webContents.send("captcha-response", msgObj);
    }
  }
}
module.exports = CaptchaResolverProcess;
