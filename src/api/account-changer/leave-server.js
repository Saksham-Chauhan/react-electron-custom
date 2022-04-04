import axios from "axios";
import { BASE_URL } from "../index";

async function leaveServer(token, guildid, proxy) {
  try {
    const json = JSON.stringify({ lurking: false });
    return await axios({
      url: `${BASE_URL}users/@me/guilds/${guildid}`,
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
