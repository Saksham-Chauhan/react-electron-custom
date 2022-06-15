// const axios = require("axios");
// const util = require("util");
// // const Twit = require("twit");
// const { getBearerToken } = require("twit/lib/helpers");
// const getbearerToken = util.promisify(getBearerToken);

// // FUTURE SCOPE => Fetch tweets without API Key
// async function fetchTweets(cKey, cSecret, account) {
//   try {
//     const bearer = await getbearerToken(cKey, cSecret);
//     const res = await axios(
//       `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${account}&count=1&include_rts=1`,
//       {
//         mode: "no-cors",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${bearer}`,
//         },
//       }
//     );
//     return res.data[0];
//   } catch (e) {
//     return e.message;
//   }
// }

// // const T = new Twit({
// //   consumer_key: "tte5XzDiN9jY6mT4dxx32BWjG",
// //   consumer_secret: "3jugePvkVGeEM05Ox7IiC6Uy6BU97zFMKmnvavA97O2f7Y9lDe",
// //   access_token: "1103383570087763969-rXLgRpWE82KAJDQvBdCsMoBCYQoNKI",
// //   access_token_secret: "L0A2GZGqR4lnWvyEaZa7z4n7C8EJe82akyhuf4LBHZni1",
// //   timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
// //   strictSSL: true, // optional - requires SSL certificates to be valid.
// // });

// // const doSomething = () => {
// //   return new Promise((resolve, reject) => {
// //     T.get(
// //       "search/tweets",
// //       {
// //         screen_name: "@BikuMatre420",
// //         count: 1,
// //         q: `google since:2022-06-6`,
// //       },
// //       function (err, data, response) {
// //         if (!err) {
// //           // console.log(
// //           //   "User to followed----------------------------------------------------------------\n",
// //           //   data,
// //           //   response
// //           // );
// //           resolve(data, response);
// //         } else {
// //           reject(err);
// //         }
// //       }
// //     );
// //   });
// // };

// let list = [];
// let retry = true;

// // FUTURE SCOPE => Fetch tweets without API Key
// async function fetchTweets(cKey, cSecret, account) {
//   try {
//     const bearer = await getbearerToken(cKey, cSecret);
//     const res = await axios(
//       `https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=${account}&count=1&include_rts=1`,
//       {
//         mode: "no-cors",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${bearer}`,
//         },
//       }
//     );
//     return res;
//   } catch (e) {
//     return e.message;
//   }
// }

// const startMonitoring = async (cKey, cSecret, key, userList) => {
//   retry = true;
//   for (let i = 0; i < userList.length; i++) {
//     const res = await fetchTweets(cKey, cSecret, userList[i].value);
//     for (let j = 0; j < list.length; j++) {
//       if (
//         userList[i].value === list[j].value &&
//         list[j]["sms"] !== res.data[0].text
//       ) {
//         console.log(
//           "in if condition",
//           userList[i].value === list[j].value &&
//             list[j]["sms"] !== res.data[0].text
//         );
//         global.mainWin.webContents.send("get-twite", res.data[0]);
//         list[i]["sms"] = res.data[0].text;
//         console.log("----", list);
//       }
//     }
//   }
//   await sleep(100);
//   if (retry) {
//     console.log("loop");
//     startMonitoring(cKey, cSecret, key, userList);
//   }
// };

// const stopMonitoring = () => {
//   retry = false;
//   console.log("clear with =>" + retry);
// };

// const sleep = (time) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, time);
//   });
// };

// const setList = (data) => {
//   console.log("ppppp start strat");
//   list = [...data];
// };

// module.exports = { startMonitoring, stopMonitoring, setList };

const axios = require("axios");
const util = require("util");
const { getBearerToken } = require("twit/lib/helpers");
const getbearerToken = util.promisify(getBearerToken);

class TwitterMonitor {
  constructor() {
    this.clientSecret = null;
    this.clientKey = null;
    this.userList = [];
    this.cache = {};
    this.retry = true;
  }

  async fetchTweets(account) {
    console.log(this.clientKey, this.clientSecret);
    try {
      const bearer = await getbearerToken(this.clientKey, this.clientSecret);
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
      return "-----" + e.message;
    }
  }
  isReadyToStart() {
    return (
      this.userList.length > 0 &&
      this.clientKey !== null &&
      this.clientSecret !== null
    );
  }
  async startMonitor() {
    this.retry = true;
    if (this.isReadyToStart()) {
      for (let i = 0; i < this.userList.length; i++) {
        const tweets = await this.fetchTweets(this.userList[i]["value"]);
        if (global.mainWin && !this.cache[tweets.data[0].id]) {
          global.mainWin.webContents.send("get-twite", tweets.data[0]);
          console.log("emmit");
        }
        this.cache[tweets.data[0].id] = "MESSAGE IN CACHE";
      }
    }
    await this.sleep(100);
    if (this.retry) {
      this.startMonitor();
    }
  }

  setCredentials(cKey, cSecret, userList) {
    this.clientKey = cKey;
    this.clientSecret = cSecret;
    this.userList = userList;
  }

  stopMonitoring = () => {
    this.retry = false;
    console.log("clear with =>" + this.retry);
  };

  sleep = (time) => {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  };

  testApi = async (apiKey, apiSecret, account) => {
    try {
      const bearer = await getbearerToken(apiKey, apiSecret);
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
  };
}

module.exports = new TwitterMonitor();
