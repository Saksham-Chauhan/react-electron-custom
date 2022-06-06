const axios = require("axios");
const util = require("util");
const Twit = require("twit");
const { getBearerToken } = require("twit/lib/helpers");
const getbearerToken = util.promisify(getBearerToken);

// FUTURE SCOPE => Fetch tweets without API Key
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

const T = new Twit({
  consumer_key: "tte5XzDiN9jY6mT4dxx32BWjG",
  consumer_secret: "3jugePvkVGeEM05Ox7IiC6Uy6BU97zFMKmnvavA97O2f7Y9lDe",
  access_token: "1103383570087763969-rXLgRpWE82KAJDQvBdCsMoBCYQoNKI",
  access_token_secret: "L0A2GZGqR4lnWvyEaZa7z4n7C8EJe82akyhuf4LBHZni1",
  timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
  strictSSL: true, // optional - requires SSL certificates to be valid.
});

const doSomething = () => {
  return new Promise((resolve, reject) => {
    T.get(
      "search/tweets",
      {
        screen_name: "@BikuMatre420",
        count: 1,
        q: `since:2022-06-6`,
      },
      function (err, data, response) {
        if (!err) {
          console.log("User to followed", data, response);
          resolve(data, response);
        } else {
          reject(err);
        }
      }
    );
  });
};

async function fetchTweets(cKey, cSecret, account, list) {
  console.log(list);
  // doSomething((response) => {
  //   try {
  //     console.log(list);
  //     return response[0];
  //   } catch (error) {
  //     return error.message;
  //   }
  // });
}

module.exports = { fetchTweets };
