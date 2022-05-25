import { directDiscordJoinAPI } from "../../../api";

import { getCaptchaResult } from "../captcha-resolver";

export const resolveMassJoinerCaptcha = async ({
  proxy,
  code,
  token,
  obj,
  sitekey,
}) => {
  console.log("resolveMassJoinerCaptcha");
  try {
    const res = await getCaptchaResult(sitekey, proxy, code);
    console.log("In Resolve Mass Joiner Captcha", res);
    if (res?.data?.errorId === 0) {
      const solution = res.data.solution.gRecaptchaResponse;
      return await directDiscordJoinAPI(proxy, code, token, obj, solution);
    } else {
      return { status: 400 };
    }
  } catch (e) {
    return e;
  }
};
