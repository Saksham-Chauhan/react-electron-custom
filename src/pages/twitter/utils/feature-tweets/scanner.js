import webhookHandler from "../../../../helper/webhook";
const { ipcRenderer } = window.require("electron");
const axios = require("axios");
const QrCode = window.require("qrcode-reader");
const Jimp = window.require("jimp");

// TODO => Is it really needed?
let filteredArray, base64Text, re, binaryText;

// Checks Binary
function binaryCheck(tweetText) {
  binaryText = tweetText
    .split(" ")
    .map((x) => String.fromCharCode(parseInt(x, 2)))
    .join("");

  re = /[a-zA-Z0-9]/g; // Atleast one alphanumeric
  if (re.test(binaryText)) {
    return binaryText;
  } else {
    return null;
  }
}

// Checks Base64
function base64Check(tweetText) {
  base64Text = Buffer.from(tweetText, "base64").toString("utf-8");
  re = /^[ A-Za-z0-9_@./#&+-]*$/; // All alphanumeric or special characters
  if (re.test(base64Text)) {
    return base64Text;
  } else {
    return null;
  }
}

// Checks Math Solve
function mathSolver(tweetText) {
  let re = /^[0-9 +-]+$/;
  tweetText = tweetText.replace(/\s/g, "");
  if (re.test(tweetText)) {
    var total = 0;
    tweetText = tweetText.match(/[+\\-]*(\.\d+|\d+(\.\d+)?)/g) || [];
    while (tweetText.length) {
      total += parseFloat(tweetText.shift());
    }
    return total;
  } else {
    return null;
  }
}

// Checks OCR
async function ocrResolver(media) {
  let ocrArr = [];
  try {
    for (const key in media) {
      let mediaArr = media[key];
      for (let i = 0; i < mediaArr.length; i++) {
        if (mediaArr[i].type === "photo") {
          const text = await ipcRenderer.invoke(
            "imageText",
            mediaArr[i].media_url
          );
          if (text) {
            ocrArr.push(text);
          }
        }
      }
    }
    return ocrArr;
  } catch (error) {
    return ocrArr;
  }
}

// Checks QR
async function qrResolver(media) {
  let qrArr = [];
  try {
    for (const key in media) {
      let mediaArr = media[key];
      for (let i = 0; i < mediaArr.length; i++) {
        const image = await Jimp.read(mediaArr[i].media_url);
        const qr = new QrCode();
        qr.callback = (err, res) => {
          if (res) {
            qrArr.push(res.result);
          }
        };
        qr.decode(image.bitmap);
      }
    }
    if (qrArr.length === 0) {
      return null;
    }
    return qrArr;
  } catch (err) {
    // TODO => Not readable and can be dispatched
    console.error("error on resolving QR", err.message);
    return null;
  }
}

// Checks Pastebin Links
async function _parsePasteHaste(url, pattern) {
  url = url.split(pattern);
  url = "https://" + pattern + "raw/" + url[1];
  let response = await axios.get(url);
  return response.data;
}

// Parse hastebin
const pastebinParser = async (urls) => {
  let binArr = [];
  let response = await urls.map(async (url) => {
    const urlName = url.expanded_url;
    if (urlName.includes("pastebin")) {
      return await _parsePasteHaste(urlName, "pastebin.com/");
    }
  });

  for (let res of response) {
    let value = await res;
    if (value !== undefined) {
      binArr.push(value);
    }
  }

  return binArr;
};
// Checks URLs for given keywords
function urlParser(urls, keywords) {
  let response = [];
  if (!keywords.length) {
    let ur = urls.map((item) => {
      return item.expanded_url;
    });
    console.log(ur);
    return ur;
  }
  for (let url in urls) {
    const urlName = urls[url].expanded_url;
    for (let k of keywords) {
      if (urlName.includes(k["value"])) response.push(urlName);
    }
  }
  filteredArray = () =>
    response.filter(function (item, pos) {
      return response.indexOf(item) === pos;
    });
  response = filteredArray(response);
  return response;
}

const scanner = async (
  tweetObject,
  keywords,
  option,
  webhooks,
  webhookSetting,
  featureList
) => {
  let FTObject = Object.assign({}, tweetObject);
  const user = {
    name: tweetObject.user.name,
    screen_name: tweetObject.user.screen_name,
    profile_url: tweetObject.user.profile_image_url,
    tweet_link: `https://twitter.com/${tweetObject.user.screen_name}/status/${tweetObject.id_str}`,
  };
  FTObject.binaryText = binaryCheck(tweetObject.text);
  if (FTObject.binaryText == null) {
    FTObject.mathSolved = mathSolver(tweetObject.text);
  }
  FTObject.base64Text = base64Check(tweetObject.text);
  const qrText = await qrResolver(FTObject.extended_entities);
  const ocrText = await ocrResolver(FTObject.extended_entities);
  if (FTObject.entities.urls.length > 0) {
    FTObject.pastebinText = await pastebinParser(FTObject.entities.urls);
    if (option?.startAutoLinkOpener || option?.startAutoInviteJoiner) {
      FTObject.urlsExtracted = urlParser(FTObject.entities.urls, keywords);
    }
  }
  if (FTObject.binaryText !== null) {
    FTObject.featured_type = "Binary";
    if (webhookSetting?.twitterMonitor && !(FTObject["id"] in featureList)) {
      webhookHandler(
        webhooks,
        user,
        "I believe there is binary code in the tweet",
        FTObject.binaryText.toString().split(",").join("\n")
      );
    }
  } else if (FTObject.base64Text !== null) {
    FTObject.featured_type = "Base64";
    if (webhookSetting?.twitterMonitor && !(FTObject["id"] in featureList)) {
      webhookHandler(
        webhooks,
        user,
        "Base64 found",
        FTObject.binaryText.toString().split(",").join("\n")
      );
    }
  } else if (FTObject.mathSolved !== null) {
    FTObject.featured_type = "Maths";
    if (webhookSetting?.twitterMonitor && !(FTObject["id"] in featureList)) {
      webhookHandler(
        webhooks,
        user,
        "Maths solved",
        FTObject.mathSolved.toString().split(",").join("\n")
      );
    }
  } else if (
    typeof FTObject.pastebinText !== "undefined" &&
    FTObject.pastebinText !== null &&
    FTObject.pastebinText.length > 0
  ) {
    FTObject.featured_type = "Pastebin";
    if (webhookSetting?.twitterMonitor && !(FTObject["id"] in featureList)) {
      webhookHandler(
        webhooks,
        user,
        "Pastbin Text",
        FTObject.pastebinText.toString().split(",").join("\n")
      );
    }
  } else if ("urlsExtracted" in FTObject) {
    FTObject.featured_type = "URLs extracted";
    if (webhookSetting?.twitterMonitor && !(FTObject["id"] in featureList)) {
      webhookHandler(
        webhooks,
        user,
        "I believe there is link in the tweet. Trying to open.",
        FTObject.urlsExtracted.toString().split(",").join("\n")
      );
    }
  } else if ("inviteExtracted" in FTObject) {
    FTObject.featured_type = "Invite extracted";
    if (webhookSetting?.twitterMonitor && !(FTObject["id"] in featureList)) {
      webhookHandler(
        webhooks,
        user,
        "I believe there is invite link in the tweet. Trying invite joiner",
        FTObject.urlsExtracted.toString().split(",").join("\n")
      );
    }
  }
  let obj = {};
  obj["tweet_id"] = FTObject["id"];
  obj["userName"] = FTObject["user"]["screen_name"];
  obj[
    "tweetLink"
  ] = `https://twitter.com/${FTObject.user.screen_name}/status/${FTObject.id_str}`;
  obj["profileLink"] = `https://twitter.com/${FTObject.user.screen_name}`;
  obj[
    "followingLink"
  ] = `https://twitter.com/${FTObject.user.screen_name}/following`;

  obj["qrText"] = qrText;
  obj["ocrText"] = ocrText;
  obj["isJoined"] = false;
  if ("qrText" in obj && obj.qrText !== null) {
    FTObject.featured_type = "QR";
    if (webhookSetting?.twitterMonitor && !(obj["tweet_id"] in featureList)) {
      webhookHandler(
        webhooks,
        user,
        obj["tweetLink"],
        "QR found",
        obj.qrText.toString().split(",").join("\n")
      );
    }
  } else if ("ocrText" in obj && obj["ocrText"].length > 0) {
    FTObject.featured_type = "OCR";
    if (webhookSetting?.twitterMonitor && !(obj["tweet_id"] in featureList)) {
      webhookHandler(
        webhooks,
        user,
        "Text found",
        obj.ocrText.toString().split(",").join("\n")
      );
    }
  }
  delete FTObject["id"];
  delete FTObject["geo"];
  delete FTObject["user"];
  delete FTObject["lang"];
  delete FTObject["place"];
  delete FTObject["source"];
  delete FTObject["entities"];
  delete FTObject["favorited"];
  delete FTObject["retweeted"];
  delete FTObject["truncated"];
  delete FTObject["coordinates"];
  delete FTObject["contributors"];
  delete FTObject["retweet_count"];
  delete FTObject["favorite_count"];
  delete FTObject["is_quote_status"];
  delete FTObject["extended_entities"];
  delete FTObject["possibly_sensitive"];
  delete FTObject["in_reply_to_user_id"];
  delete FTObject["in_reply_to_status_id"];
  delete FTObject["in_reply_to_user_id_str"];
  delete FTObject["in_reply_to_screen_name"];
  delete FTObject["in_reply_to_status_id_str"];
  return { ...FTObject, ...obj };
};

export default scanner;
