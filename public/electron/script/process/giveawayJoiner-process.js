const { Client } = require("discord.js-selfbot");

const replyList = [
  "lfgooooo",
  "nice",
  "lets do it",
  "lets gooooo",
  "excited",
  "praying🙏",
  "fingers crossed",
  "🤞",
  "🙏",
  "THIS IS MINE!",
];

class GiveawayJoinerProcess {
  monitor = new Client();
  constructor(serverId, authorId, token, delay, id) {
    this.serverId = serverId;
    this.authorId = authorId;
    this.token = token;
    this.id = id;
    this.delay = delay;
    this.isMonitorStart = true;
    this.init();
  }
  init() {
    this.monitor.on("ready", () => {
      this.sensMonitorStatus("Monitoring", true);
    });
    this.monitor.on("message", async (message) => {
      const embed = message.embeds[0];
      const serverId = message.channel.guild.id;
      const authorId = message.author.id;
      await this.sendReply(embed, serverId, authorId, message);
    });
    if (/^[0-9A-Za-z_.-]+$/.test(this.token)) {
      this.isMonitorStart = true;
      this.monitor.login(this.token).catch((e) => {
        this.sensMonitorStatus("Invalid token", false);
      });
    } else this.sensMonitorStatus("Invalid token", false);
  }
  async sendReply(embed, serverId, authorId, message) {
    if (serverId === this.serverId) {
      if (authorId === this.authorId) {
        if (
          embed.title.toLowerCase().includes("google") &&
          embed.description.toLowerCase().includes("search")
        ) {
          await message.react("🎉");
          let x = Math.floor(Math.random() * replyList.length + 1);
          message.channel.startTyping();
          setTimeout(function () {
            message.channel.stopTyping();
            message.channel.send(replyList[x]);
          }, this.delay);
        }
      }
    }
  }
  stop() {
    this.isMonitorStart = false;
    this.sensMonitorStatus("Stopped", false);
    this.monitor.destroy();
  }

  sensMonitorStatus(status, active) {
    const win = global.mainWin;
    if (win) {
      win.webContents.send("giveaway-joiner-status", {
        id: this.id,
        status,
        active,
      });
    }
  }
}

module.exports = GiveawayJoinerProcess;
