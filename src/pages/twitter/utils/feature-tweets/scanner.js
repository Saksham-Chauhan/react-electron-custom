import webhookHandler from "../../../../helper/webhook";
const { ipcRenderer } = window.require("electron");
const axios = require("axios");
// const QrCode = window.require("qrcode-reader");
// const Jimp = window.require("jimp");

let filteredArray, base64Text, re, binaryText;

function binaryCheck(tweetText) {
  binaryText = tweetText
    .split(" ")
    .map((x) => String.fromCharCode(parseInt(x, 2)))
    .join("");

  re = /[a-zA-Z0-9]/g; // Atleast one alphanumeric
  // Checks if the output string has any body
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
  // Checks if the output string has any body
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
// eslint-disable-next-line no-unused-vars
async function ocrResolver(media) {
  let ocrArr = [];
  for (const m of media) {
    if (m.type === "photo") {
      const text = await ipcRenderer.invoke("imageText", m.media_url);
      if (text) {
        ocrArr.push(text);
      }
    }
  }
  return ocrArr;
}
// eslint-disable-next-line no-unused-vars
// async function qrResolver(media) {
//   let qrArr = [];
//   for (let m of media) {
//     // let response = await axios.get(m.media_url, {
//     //     responseType: "arraybuffer",
//     // });
//     // const buffer = Buffer.from(response.data, "base64");
//     // console.log(buffer);
//     const image = await Jimp.read(m.media_url);
//     const qr = new QrCode();
//     qr.callback = (err, res) => {
//       if (res) {
//         qrArr.push(res.result);
//       }
//     };
//     qr.decode(image.bitmap);
//   }
//   if (qrArr.length === 0) {
//     return null;
//   }
//   return qrArr;
// }

// Checks Pastebin Links (helper)
async function _parsePasteHaste(url, pattern) {
  url = url.split(pattern);
  url = "https://" + pattern + "raw/" + url[1];
  let response = await axios.get(url);
  return response.data;
}

// Parse hastebin only considering there is only one link
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
  // console.log("urls", urls);
  let response = [];
  for (let url of urls) {
    const urlName = url.expanded_url;
    for (let k of keywords) {
      if (urlName.includes(k)) response.push(urlName);
    }
  }
  filteredArray = () =>
    response.filter(function (item, pos) {
      return response.indexOf(item) === pos;
    });

  response = filteredArray(response);
  return response;
}

const scanner = async (tweetObject, keywords, webhooks, openerFlag) => {
  let FTObject = Object.assign({}, tweetObject);
  const user = {
    name: tweetObject.user.name,
    screen_name: tweetObject.user.screen_name,
    profile_url: tweetObject.user.profile_image_url,
  };
  FTObject.binaryText = binaryCheck(tweetObject.text);
  if (FTObject.binaryText == null) {
    FTObject.mathSolved = mathSolver(tweetObject.text);
  }
  FTObject.base64Text = base64Check(tweetObject.text);

  if (FTObject.entities.urls.length > 0) {
    // Pastebin Parsing
    FTObject.pastebinText = await pastebinParser(FTObject.entities.urls);
    //send pasbin content to webhook

    // If openerFlag is true parse URLs
    if (openerFlag) {
      FTObject.urlsExtracted = urlParser(FTObject.entities.urls, keywords);
    }
  }

  // Assign a featured tweet type
  if (FTObject.binaryText !== null) {
    FTObject.featured_type = "Binary";
    webhookHandler(
      webhooks,
      user,
      "Binary Found",
      FTObject.binaryText.toString().split(",").join("\n")
    );
  } else if (FTObject.base64Text !== null) {
    FTObject.featured_type = "Base64";
    webhookHandler(
      webhooks,
      user,
      "base64 Found",
      FTObject.binaryText.toString().split(",").join("\n")
    );
  } else if (FTObject.mathSolved !== null) {
    FTObject.featured_type = "Maths";
    webhookHandler(
      webhooks,
      user,
      "Maths",
      FTObject.mathSolved.toString().split(",").join("\n")
    );
  } else if (
    typeof FTObject.pastebinText !== "undefined" &&
    FTObject.pastebinText !== null &&
    FTObject.pastebinText.length > 0
  ) {
    FTObject.featured_type = "Pastebin";
    webhookHandler(
      webhooks,
      user,
      "Pastbin Text",
      FTObject.pastebinText.toString().split(",").join("\n")
    );
  } else if ("urlsExtracted" in FTObject) {
    FTObject.featured_type = "URLs extracted";
    if (webhooks.length > 0) {
      webhookHandler(
        webhooks,
        user,
        "Urls Found",
        FTObject.urlsExtracted.toString().split(",").join("\n")
      );
    }
  } else if ("inviteExtracted" in FTObject) {
    FTObject.featured_type = "Invite extracted";
  } else if ("qrText" in FTObject && FTObject.qrText !== null) {
    FTObject.featured_type = "QR";
    webhookHandler(
      webhooks,
      user,
      "QR Found",
      FTObject.qrText.toString().split(",").join("\n")
    );
  } else if ("ocrText" in FTObject) {
    FTObject.featured_type = "OCR";
    webhookHandler(
      webhooks,
      user,
      "OCR Found",
      FTObject.ocrText.toString().split(",").join("\n")
    );
  }

  return FTObject;
};

export default scanner;
