const { getRandomParsedProxy, sleep } = require("../../helper/index");
const axios = require("axios");
const { Client } = require("discord.js-selfbot");
const logManager = require("../manager/log-manager.jsc");

class GiveawayChecker {
  monitor = new Client();
  constructor(
    tokensString,
    monitorToken,
    proxy,
    botID,
    delay,
    taskID,
    webhook
  ) {
    this.tokens = this.getTokenArray(tokensString) || [];
    this.monitorToken = monitorToken;
    this.usernames = [];
    this.proxy = proxy;
    this.delay = delay;
    this.botID = botID;
    this.win = [];
    this.webhook = webhook;
    this.taskID = taskID;
    this.init();
  }
  async init() {
    await this.getUsername();
    this.monitor.on("ready", () => {
      this.sendMonitorStatus("Monitoring", true);
    });
    this.monitor.on("message", async (message) => {
      if (
        message.author.id === this.botID &&
        message.content.includes("Congratulations")
      ) {
        const winnerList = message.content.match(/(<@\d*>)/gm);
        winnerList.forEach((item) => {
          const tempStr = item.substring(2, item.length - 1);
          const elem = this.usernames.find((obj) => {
            if (obj.id === tempStr) return true;
          });
          if (elem) this.win = [...this.win, elem];
        });
        // if (this.webhook && this.win.length) this.sendWebhook(this.win);
      }
    });
    this.monitor.login(this.monitorToken).catch((e) => {
      this.sendMonitorStatus("Invalid token", false);
      logManager.logMessage(
        `Giveaway checker found invalid token:${getEncryptedToken(
          this.monitorToken
        )}`
      );
    });
  }

  stop() {
    this.sendMonitorStatus("Stopped", false);
    this.monitor.destroy();
  }

  async getUsername() {
    for (let i = 0; i < this.tokens.length; i++) {
      const proxy = getRandomParsedProxy(this.proxy.split("\n"));
      try {
        const res = await axios.get("https://discord.com/api/v9/users/@me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.tokens[i],
          },
          // proxy,
        });
        if (res.status === 200 || res.status === 204) {
          this.usernames.push({
            user: res.data.username,
            id: res.data.id,
          });
        } else {
          logManager.logMessage(
            `Error when finding username in Giveaway checker`
          );
        }
      } catch (error) {
        logManager.logMessage(
          `Error when finding username with token:${getEncryptedToken(
            this.tokens[i]
          )}, error message:${error?.message}`
        );
      }
      await sleep(500);
    }
  }

  getTokenArray(value) {
    return value.split("\n").map((item) => {
      return item.split(":")[2];
    });
  }

  sendMonitorStatus(status, active) {
    const win = global.mainWin;
    if (win) {
      win.webContents.send("update-gc-status", {
        id: this.taskID,
        status,
        active,
      });
    }
  }

  sendWebhook(data) {}
}

module.exports = GiveawayChecker;
