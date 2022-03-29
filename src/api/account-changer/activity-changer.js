import axios from "axios";
import { BASE_URL } from "../index";

async function changeActivity(token, message, proxy) {
  try {
    const json = JSON.stringify({
      custom_status: {
        text: `${message}`,
      },
    });

    let res = await axios.patch(`${BASE_URL}users/@me/settings`, json, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      proxy: proxy,
    });
    return res;
  } catch (error) {
    return error;
  }
}
export default changeActivity;
