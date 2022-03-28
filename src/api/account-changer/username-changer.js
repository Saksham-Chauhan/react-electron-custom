import axios from "axios";
import { BASE_URL } from "../index";

async function changeUsername(token, password) {
  const json = JSON.stringify({
    username: "mynewname",
    password: password,
  });
  let res = await axios.patch(`${BASE_URL}users/@me`, json, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
  });
  return res;
}
export default changeUsername;
