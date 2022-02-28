import axios from "axios";
const open = window.require("open");

function isEmpty(values) {
  const isEmpty =
    values["profileName"].trim() &&
    values["type"].trim() &&
    values["value"].trim();
  return isEmpty ? false : true;
}

function download(content, fileName, contentType) {
  const a = document.createElement("a");
  const file = new Blob([content], { type: contentType });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
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
function isTwitterLink(url) {
  let istwitterLink = url.match(
    /(?:http:\/\/)?(?:https:\/\/)?(?:www\.)?twitter\.com\/(#!\/)?(\w*)/g
  );
  return istwitterLink ? true : false;
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
function exclude(urls, Excludekeywords) {
  let filteredUrls = [...urls];
  for (let i in Excludekeywords) {
    for (let j in urls) {
      if (urls[j].includes(Excludekeywords[i])) {
        const index = filteredUrls.indexOf(urls[j]);
        if (index > -1) {
          filteredUrls.splice(index, 1);
        }
      }
    }
  }
  return filteredUrls;
}
function arrayUnique(array) {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1);
    }
  }
  return a;
}
async function linkOpener(urls, keywords, options, user, start, icon) {
  const data = [];
  const Includekeywords = keywords["IncludeKeywords"];
  const Excludekeywords = keywords["ExcludeKeywords"];
  let includeUrls = include(urls, Includekeywords);
  let excludeUrls = exclude(urls, Excludekeywords);
  const filteredUrls = arrayUnique(
    includeUrls
      .filter((value) => excludeUrls.includes(value))
      .concat(includeUrls)
  );
  for (let url of filteredUrls) {
    let inviteCode = isDiscordInvite(url);
    if (inviteCode && options.invite) {
      continue;
    }
    if (options.twitter && isTwitterLink(url)) {
      continue;
    }
    await open(url, {
      app: ["chrome", `--profile-directory=${user}`],
    });
    data.push({
      status: "success",
      time: `[${new Date().toLocaleTimeString("en-US")}]`,
      message: `SUCCESSFULLY OPENED: ${url}`,
      type: "links",
      speed: new Date() - new Date(start),
      icon: icon,
    });
  }
  return data;
}
async function inviteJoiner(urls, claimerToken, start) {
  const data = [];
  for (let url of urls) {
    let inviteCode = url.split("/").pop();
    try {
      let res = await axios.get(
        `https://discordapp.com/api/v8/invites/${inviteCode}`
      );
      const serverName = res.data.guild.name;
      console.log(res);
      let icon =
        "https://discordapp.com/assets/6debd47ed13483642cf09e832ed0bc1b.png";
      if (res.data.guild.icon) {
        icon = `https://cdn.discordapp.com/icons/${res.data.guild.id}/${res.data.guild.icon}.jpg`;
      }
      res = await axios.post(
        `https://discordapp.com/api/v8/invites/${inviteCode}`,
        {},
        {
          headers: {
            Authorization: "Bot" + claimerToken,
          },
        }
      );
      if (res.status === 200) {
        data.push({
          status: "success",
          time: `[${new Date().toLocaleTimeString("en-US")}]`,
          message: `SUCCESSFULLY JOINED: ${serverName}`,
          type: "invite",
          speed: new Date() - new Date(start),
          icon: icon,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  return data;
}
const utils = { inviteJoiner, linkOpener, download, isEmpty, isDiscordInvite };
export default utils;
