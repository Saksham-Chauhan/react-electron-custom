import axios from "axios";
import { BASE_URL } from "../index";

async function changeActivity(token, guildid, name, proxy) {
  console.log("first", token, guildid, name, proxy);
  try {
    const json = JSON.stringify({
      nick: `${name}`,
    });

    let res = await axios.patch(
      `${BASE_URL}guilds/${guildid}/members/@me`,
      json,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        proxy: proxy,
      }
    );
    return res;
  } catch (error) {
    console.log(error.response);
    throw new Error(
      "Something went wrong on changing nickname" + error.message
    );
  }
}

export default changeActivity;
