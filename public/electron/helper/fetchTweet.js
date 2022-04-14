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
    let res;
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
    return e.message;
  }
}

const inviteJoinerTest = async (
  webhook,
  userName,
  avatarProfile,
  serverName
) => {
  let embed = {
    embeds: [
      {
        title: TITLE,
        description: `${serverName} server joined successfully`,
        url: KYRO_URL,
        color: 857138,
        thumbnail: THUMB_NAIL,
        footer: FOOTER,
        author: {
          name: `Link opened by ${userName}`,
          icon_url: avatarProfile,
        },
      },
    ],
  };

  await axios.post(webhook, embed);
};

module.exports = { fetchTweets, inviteJoinerTest };
