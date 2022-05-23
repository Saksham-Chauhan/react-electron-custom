import axios from "axios";
import { BASE_URL } from "../index";

async function changeNickname(token, guildId, name, proxy) {
  try {
    const json = JSON.stringify({
      nick: name,
    });

    return await axios.patch(
      `${BASE_URL}/guilds/${guildId}/members/@me`,
      json,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        proxy: proxy,
      }
    );
  } catch (error) {
    return error;
  }
}

export default changeNickname;
