import axios from "axios";
import { sleep } from "../../helper";
import { BASE_URL } from "../index";

async function changeActivity(token, message, emojiValue, userStatus, proxy) {
  try {
    const json = JSON.stringify({
      custom_status: {
        text: message,
        emoji_name: emojiValue,
      },
    });
    const res = await axios.patch(`${BASE_URL}/users/@me/settings`, json, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      proxy: proxy,
    });
    await sleep(2);
    if (userStatus) {
      const json2 = JSON.stringify({ status: userStatus });
      await axios.patch(`${BASE_URL}/users/@me/settings`, json2, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        proxy: proxy,
      });
    }
    return res;
  } catch (error) {
    return error;
  }
}
export default changeActivity;
