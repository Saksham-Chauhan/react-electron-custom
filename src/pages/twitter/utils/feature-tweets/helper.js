import { generateId } from "../../../../helper";

function isEmpty(values) {
  const isEmpty =
    values["profileName"].trim() &&
    values["type"].trim() &&
    values["value"].trim();
  return isEmpty ? false : true;
}

function isDiscordInvite(url) {
  let invite = url.match(
    /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discord\.com|discordapp\.com\/invite)\/.+[a-z|A-Z|0-9]/g
  );
  if (invite) {
    return url.split("/").pop();
  }
  return invite;
}

function include(urls, Includekeywords) {
  let filteredUrls = [];
  for (let i in Includekeywords) {
    for (let j in urls) {
      if (urls[j].includes(Includekeywords[i])) {
        filteredUrls.push(urls[j]);
      }
    }
  }
  return filteredUrls;
}

const extractDataFromTweet = (tweetObj) => {
  let obj = {};
  obj["id"] = generateId();
  obj["tweet_id"] = tweetObj["id"];
  obj["text"] = tweetObj["text"];
  obj["userName"] = tweetObj["user"]["screen_name"];
  obj["createAt"] = tweetObj["created_at"];
  obj[
    "tweetLink"
  ] = `https://twitter.com/${tweetObj.user.screen_name}/status/${tweetObj.id_str}`;
  obj["profileLink"] = `https://twitter.com/${tweetObj.user.screen_name}`;
  obj[
    "followingLink"
  ] = `https://twitter.com/${tweetObj.user.screen_name}/following`;
  return obj;
};

const utils = {
  include,
  isEmpty,
  isDiscordInvite,
  extractDataFromTweet,
};
export default utils;
