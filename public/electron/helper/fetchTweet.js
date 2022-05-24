const axios = require("axios");
const util = require("util");
const { getBearerToken } = require("twit/lib/helpers");
const getbearerToken = util.promisify(getBearerToken);

// FUTURE SCOPE => Fetch tweets without API Key
async function fetchTweets(cKey, cSecret, account) {
  try {
    const bearer = await getbearerToken(cKey, cSecret);
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
    return res.data[0];
  } catch (e) {
    return e.message;
  }
}

module.exports = { fetchTweets };
