const axios = require("axios");
const util = require("util");
const { getBearerToken } = require("twit/lib/helpers");
const bearers = new Map();
const getbearerToken = util.promisify(getBearerToken);

async function fetchTweets(cKey, cSecret, account) {
  if (!bearers.has(cKey)) {
    bearers.set(
      cKey,

      // Use Twit's helper function to get bearer token
      await getbearerToken(cKey, cSecret)
    );
  }
  let bearer = bearers.get(cKey);
  let res;

  // Authenticate using bearer token in request headers
  try {
    res = await axios(
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
    console.log("Error catch in fetchTweet helper", e.message);
    throw new Error("Error in fetching tweets");
  }
}

module.exports = { fetchTweets };
