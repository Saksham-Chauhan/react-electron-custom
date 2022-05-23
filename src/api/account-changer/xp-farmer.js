import axios from "axios";

async function xpFarmer(proxy, channelID, token) {
  const json = JSON.stringify({
    token: token,
    channel_id: channelID,
    proxy: proxy,
  });
  try {
    return await axios.post(`http://127.0.0.1:3001/get-response`, json);
  } catch (error) {
    return error;
  }
}
export default xpFarmer;
