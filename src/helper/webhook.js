import axios from "axios";

async function webhookHandler(webhook, user, title, content) {
  let embed = {
    embeds: [
      {
        title: title,
        description: content,
        url: "https://www.twitter.com/home",
        color: 857138,
        footer: {
          icon_url:
            "https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png",
          text: "Twitter monitor Webhook",
        },
        thumbnail: {
          url: "https://www.twitter.com/home",
        },
        author: {
          name: `New Tweet By ${user.name}`,
          url: "https://www.twitter.com/home",
          icon_url: user.profile_url,
        },
      },
    ],
  };
  //   webhooks.forEach(async ({ webhook }) => {
  await axios.post(webhook, embed);
  //   });
}
export default webhookHandler;
