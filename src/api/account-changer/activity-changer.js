import axios from "axios";
import { BASE_URL } from "../index";

async function changeActivity(token, message) {
  const json = JSON.stringify({
    custom_status: {
      text: `${message}`,
    },
  });

  let res = await axios.patch(`${BASE_URL}users/@me/settings`, json, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  return res;
}

export default changeActivity;
