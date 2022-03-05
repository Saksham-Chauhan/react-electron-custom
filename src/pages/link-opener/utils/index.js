let regex =
  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

export const testUrlRegex = (url) => {
  if (regex.test(url)) return true;
  return false;
};

export const checkDiscordInvite = (url) => {
  let inviteCheck = url.match(
    /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discord\.com|discordapp\.com\/invite)\/.+[a-z|A-Z|0-9]/g
  );
  return inviteCheck ? true : false;
};

const checkTwitterLink = (url) => {
  let istwitterLink = url.match(
    /(?:http:\/\/)?(?:https:\/\/)?(?:www\.)?twitter\.com\/(#!\/)?(\w*)/g
  );
  return istwitterLink ? true : false;
};
export const userJoiner = (
  authToken,
  apiEndpoint,
  JSONparams,
  type = "GET"
) => {
  var xhr = new XMLHttpRequest();
  xhr.open(type, "https://discordapp.com/api/v9" + apiEndpoint, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", authToken);
  xhr.send(JSON.stringify(JSONparams));
};

export const containsKeyword = (keywordsLO, message) => {
  let flag = false;

  for (let i = 0; i < keywordsLO.length; i++)
    if (message.includes(keywordsLO[i])) {
      console.log(keywordsLO, message, keywordsLO[i]);
      flag = true;
      break;
    }
  return flag;
};

/**
 * If message is Discord invite link ot twitter link ignore
 * and return false else return true
 */

export const checkOptions = (options, message) => {
  if (options.ignoreDiscordInviteLink && checkDiscordInvite(message))
    return false; // means it's a discord invite, hence ignore this link in link opener
  if (options.ignoreTwitterLink && checkTwitterLink(message)) return false;
  return true;
};

const webHookStart = (webhook, user = "", data = "", time = "") => {
  var request = new XMLHttpRequest();
  if (webhook && user === "") {
    //means we are just testing it from the settings section
    request.open("POST", webhook);
    request.setRequestHeader("Content-type", "application/json");
    let testParams = {
      content: "",
      embeds: [
        {
          title: "Testing Webhook :thinking:",
          color: 7844437,
          timestamp: time ? time : new Date(),
          footer: {
            text: "Kyro TOOLS",
            icon_url:
              "https://media.discordapp.net/attachments/703413973546041444/807246418179391538/ezgif-3-93b2d3f4fb4c.png",
          },
        },
      ],
    };
    request.send(JSON.stringify(testParams));
    return;
  }

  request.open("POST", webhook);

  request.setRequestHeader("Content-type", "application/json");

  var params = {
    //username: user,
    avatar_url: "",
    content: null, //'Ready at',
    embeds: [
      {
        title: `${user} is logged in!  :partying_face:`,
        color: 7844437,
        timestamp: time ? time : new Date(),
        footer: {
          text: "Kyro TOOLS",
          icon_url:
            "https://media.discordapp.net/attachments/703413973546041444/807246418179391538/ezgif-3-93b2d3f4fb4c.png",
        },
      },
    ],
  };

  request.send(JSON.stringify(params));
};

export const handleWebhook = async (
  webhook,
  user = "",
  data = "",
  safeMode,
  delay = 300
) => {
  //console.log("safeMode = ", safeMode);
  console.log(delay);
  if (safeMode) {
    setTimeout(() => {
      webHookStart(webhook, user, data);
    }, delay);
  } else webHookStart(webhook, user, data);
};

const downloadLogs = (content, fileName, contentType) => {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

export const handleLogsExport = (name, logs) =>
  downloadLogs(logs, name, "text/plain");
