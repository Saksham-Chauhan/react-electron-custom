import axios from "axios";

async function xpFarmer(proxy, channelID, token) {
  const json = JSON.stringify({
    token: token,
    channel_id: channelID,
    proxy: proxy,
  });
  try {
    const res = await axios.post(`http://127.0.0.1:3001/get-response`, json);
    return res;
  } catch (error) {
    return error;
  }
}
export default xpFarmer;
