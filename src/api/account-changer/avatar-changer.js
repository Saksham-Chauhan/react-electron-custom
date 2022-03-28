import axios from "axios";
import { BASE_URL } from "../index";

async function changeAvatar(token, image) {
  const json = JSON.stringify({
    avatar: image,
  });

  let res = await axios.patch(`${BASE_URL}users/@me`, json, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  return res;
}

export default changeAvatar;
