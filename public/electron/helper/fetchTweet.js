const axios = require("axios");
const util = require("util");
const { getBearerToken } = require("twit/lib/helpers");
const getbearerToken = util.promisify(getBearerToken);

let lastMsgId = null;

const fetchTweets = async (clientKey, clientSecret, account) => {
  try {
    const bearer = await getbearerToken(clientKey, clientSecret);
    const res = await axios(
      `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${account}&count=1&include_rts=1`,
      {
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${bearer}`,
        },
      }
    );
    if (lastMsgId !== res.data[0].id) {
      lastMsgId = res.data[0].id;
      return res.data[0];
    } else return {};
  } catch (e) {
    return e.message;
  }
};

module.exports = { fetchTweets };
