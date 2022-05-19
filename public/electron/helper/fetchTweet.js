const axios = require("axios");
const util = require("util");
const { getBearerToken } = require("twit/lib/helpers");
const bearers = new Map();
const getbearerToken = util.promisify(getBearerToken);

async function fetchTweets(cKey, cSecret, account) {
  try {
    if (!bearers.has(cKey)) {
      bearers.set(cKey, await getbearerToken(cKey, cSecret));
    }
    let bearer = bearers.get(cKey);
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

async function checkTwitterAPI(cKey, cSecret) {
  const account = "KodersHQ";
  try {
    if (!bearers.has(cKey)) {
      bearers.set(cKey, await getbearerToken(cKey, cSecret));
    }
    let bearer = bearers.get(cKey);
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
    return res.status === 200;
  } catch (error) {
    throw new Error(error.message);
  }
}

module.exports = { fetchTweets, checkTwitterAPI };
