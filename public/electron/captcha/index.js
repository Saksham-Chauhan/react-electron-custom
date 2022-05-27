const { default: axios } = require("axios");
const { default: poller } = require("promise-poller");
const CAPTCHA_SITEKEY = "4c672d35-0701-42b2-88c3-78380b0db560";

async function createCaptchaTasK(data) {
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

      // await this.getCaptchaTask();
    } else {
      console.log("Task ID not found", res.data);
    }
  } catch (error) {
    console.log("Something went wrong while create task", error);
  }
}

function getCaptchaTask(clientKey, taskId) {
  return new Promise(async (resolve, reject) => {
    try {
      const getResponse = await axios.post(
        "https://api.anti-captcha.com/getTaskResult",
        {
          clientKey,
          taskId,
        }
      );
      console.log("DEBUG", getResponse.data.status);
      if (getResponse.data.errorId === 0 && getResponse.data?.status) {
        if (getResponse.data.status === "ready") {
          const {
            solution: { gRecaptchaResponse },
          } = getResponse.data;
          console.log("Get Captcha solution", gRecaptchaResponse);
          resolve();
        }
      } else {
        console.log({
          type: "ERROR",
          msg: "ERROR_KEY_DOES_NOT_EXIST",
        });
      }
    } catch (error) {
      console.log("Something went wrong while get task", error);
    }
  });
}

// //
// const startPolling=() =>{
//     poller({
//         taskFn: getCaptchaTask(clientKey, res.data.taskId),
//         //   shouldContinue: this.checkShouldContinuePolling,
//         interval: 2000,
//         retries: 10,
//         progressCallback: (remain, err) => {
//           console.log("Remain", remain, err);
//         },
//       })
// }
