import axios from "axios";
import { BASE_URL } from "../index";

async function changeActivity(token, guildid, name) {
  const json = JSON.stringify({
    custom_status: {
      nick: `${name}`,
    },
  });

  let res = await axios.patch(
    `${BASE_URL}guilds/${guildid}/members/@me`,
    json,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    }
  );
  return res;
}

export default changeActivity;
