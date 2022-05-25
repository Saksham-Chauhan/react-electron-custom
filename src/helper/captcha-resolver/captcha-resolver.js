import axios from "axios";
import { toastWarning } from "../../toaster";

const CAPTCHA_SITEKEY = "4c672d35-0701-42b2-88c3-78380b0db560";
let counter = 0;

const createCaptchaTask = async (sitekey, proxy, code) => {
  const {
    host,
    port,
    auth: { username, password },
  } = proxy;
  console.log("Proxy", proxy);
  const json = {
    clientKey: process.env.REACT_APP_CLIENT_KEY,
    task: {
      type: "HCaptchaTask",
      websiteURL: `https://discord.com/invites/${code}`,
      websiteKey: sitekey ? sitekey : CAPTCHA_SITEKEY,
      proxyType: "http",
      proxyAddress: host,
      proxyPort: port,
      proxyLogin: username,
      proxyPassword: password,
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) kyro-v1/0.9.2 Chrome/98.0.4758.141 Electron/17.4.0 Safari/537.36",
    },
  };
  try {
    const res = await axios.post(
      "https://api.anti-captcha.com/createTask",
      json,
      { proxy }
    );
    if (res.data.errorId === 0) {
      return res.data.taskId;
    } else {
      console.log("Task ID not found", res.data);
      toastWarning(res.data.errorDescription);
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const getCaptchaResult = async (sitekey, proxy, code) => {
  console.log("getCaptchaResult");
  const task_id = await createCaptchaTask(sitekey, proxy, code);
  console.log(task_id);
  if (task_id) {
    try {
      const json = JSON.stringify({
        clientKey: process.env.REACT_APP_CLIENT_KEY,
        taskId: task_id,
      });
      const res = await axios.post(
        "https://api.anti-captcha.com/getTaskResult",
        json
      );
      console.log("Post Data", json);
      if (res.data.errorId === 0) {
        if (res.data?.status && res.data.status === "processing") {
          if (counter < 5) {
            counter++;
            console.log(counter);
            await getCaptchaResult(sitekey, proxy, code);
          } else return { errorId: 1 };
        } else {
          // TODO => can send to logs
          // toastWarning("Captcha error");
          return res;
        }
      } else return res;
    } catch (error) {
      console.log("Error while getting captcha Solution", error);
    }
  }
};
