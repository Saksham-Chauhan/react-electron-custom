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
  constructor(id, token, serverID, authorID, delay) {
    this.id = id;
    this.token = token;
    this.serverID = serverID;
    this.authorID = authorID;
    this.delay = delay;
    this.isMonitorStart = true;
    this.init();
  }
  init() {
    this.monitor.on("ready", () => {
      this.sendMonitoStatus("Monitoring", true);
    });
    this.monitor.on("message", async (message) => {
      await this.sendReply(
        message.embeds[0],
        message.channel.guild.id,
        message.author.id,
        message
      );
    });
    this.isMonitorStart = true;
    this.monitor.login(this.token).catch((e) => {
      this.sendMonitoStatus("Invalid token", false);
    });
  }
  async sendReply(embed, serverId, authorId, message) {
    if (serverId === this.serverId) {
      if (authorId === this.authorId) {
        if (
          embed.title.toLowerCase().includes("google") &&
          embed.description.toLowerCase().includes("search")
        ) {
          await message.react("🎉");
          const x = Math.floor(Math.random() * replyList.length + 1);
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
    this.sendMonitoStatus("Stopped", false);
    this.monitor.destroy();
  }

  sendMonitoStatus(status, active) {
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
