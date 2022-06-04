// import { getCaptchaResult } from "../captcha-resolver";
// import { directDiscordJoinAPI } from "../../../api";

import axios from "axios";
import { BASE_URL } from "../../../api";

export const joinServer = (solution, proxy, inviteCode, token, captchaData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios({
        url: `${BASE_URL}/invites/${inviteCode}`,
        headers: {
          Authorization: token,
        },
        method: "POST",
        data: JSON.stringify({
          captcha_key: solution,
          captcha_rqtoken: captchaData.captcha_rqtoken,
          // captcha_rqdata: captchaData.captcha_rqdata,
          // captcha_sitekey: captchaData.captcha_sitekey,
          // captcha_service: "hcaptcha",
          // isInvisible: true,
        }),
        proxy,
      });
      resolve(result.data);
    } catch (error) {
      reject(error.message);
    }
  });
};
// export const joinServer = (solution, proxy, email, password, captchaData) => {
//   console.log(solution);
//   return new Promise(async (resolve, reject) => {
//     try {
//       const json = JSON.stringify({
//         login: email,
//         password: password,
//         captcha_key: solution,
//       });
//       const result = await axios.post(`${BASE_URL}/auth/login`, json, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         proxy: proxy,
//       });
//       resolve(result.data);
//     } catch (error) {
//       reject(error.message);
//     }
//   });
// };
