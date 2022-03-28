import axios from "axios";
import { BASE_URL } from "../index";

async function leaveServer(token, guildid) {
  const json = JSON.stringify({ lurking: false });

  let res = await axios.delete(`${BASE_URL}users/@me/guilds/${guildid}`, json, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  return res;
}
leaveServer();
