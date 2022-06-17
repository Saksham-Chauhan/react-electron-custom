const axios = require("axios");
const util = require("util");
const { getBearerToken } = require("twit/lib/helpers");
const getbearerToken = util.promisify(getBearerToken);

let list = [];
let retry = true;

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
    return res;
  } catch (e) {
    return e.message;
  }
}

const startMonitoring = async (cKey, cSecret, key, userList) => {
  retry = true;
  for (let i = 0; i < userList.length; i++) {
    const res = await fetchTweets(cKey, cSecret, userList[i].value);
    for (let j = 0; j < list.length; j++) {
      if (
        userList[i].value === list[j].value &&
        list[j]["sms"] !== res.data[0].text
      ) {
        console.log(
          "in if condition",
          userList[i].value === list[j].value &&
            list[j]["sms"] !== res.data[0].text
        );
        global.mainWin.webContents.send("get-twite", res.data[0]);
        list[i]["sms"] = res.data[0].text;
        console.log("----", list);
      }
    }
  }
  await sleep(100);
  if (retry) {
    console.log("loop");
    startMonitoring(cKey, cSecret, key, userList);
  }
};

const stopMonitoring = () => {
  retry = false;
  console.log("clear with =>" + retry);
};

const sleep = (time) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

const setList = (data) => {
  console.log("ppppp start strat");
  list = [...data];
};
