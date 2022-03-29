import axios from "axios";
import { BASE_URL } from "../index";

async function leaveServer(token, guildid, proxy) {
  try {
    const json = JSON.stringify({ lurking: false });

    let res = await axios.delete(
      `${BASE_URL}users/@me/guilds/${guildid}`,
      json,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
          proxy: proxy,
        },
      }
    );
    return res;
  } catch (error) {
    throw new Error("Something went wrong on leaving server" + error.message);
  }
}

export default leaveServer;
