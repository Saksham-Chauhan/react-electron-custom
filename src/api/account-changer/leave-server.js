import axios from "axios";
import { BASE_URL } from "../index";

async function leaveServer({ token, guildId, proxy, solution = null }) {
  try {
    const json = JSON.stringify(
      solution ? { lurking: false, captcha_key: solution } : { lurking: false }
    );
    return await axios({
      url: `${BASE_URL}/users/@me/guilds/${guildId}`,
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: token },
      proxy: proxy,
      data: json,
    });
  } catch (error) {
    return error;
  }
}

export default leaveServer;
