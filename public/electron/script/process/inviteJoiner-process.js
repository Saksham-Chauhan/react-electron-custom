const { Client } = require("discord.js-selfbot");
const { ipcMain } = require("electron");
const { default: axios } = require("axios");
const BASE_URL = "https://discord.com/api/v9/";

class InviteJoinerMonitor {
  monitor = new Client();
  /**
   * @param {Array} channelArray channel that want to monitor
   * @param {String} monitorToken monitor with selected discord token
   * @param {Array} tokenArray token group that has to join
   * @param {Array} proxyArray use different IP to avoid account banned
   * @param {String} id unique ID for each monitor
   * @param {Number} delay
   */
  constructor(channelArray, tokenArray, proxyArray, monitorToken, delay, id) {
    this.id = id;
    this.token = monitorToken;
    this.tokenList = tokenArray;
    this.proxyList = proxyArray;
    this.isMonitorStart = false;
    this.channelList = channelArray || [];
    this.delay = delay ? parseInt(delay) : 2000;
    this.init();
  }

  init() {
    this.monitor.on("ready", () => {
      this.sendMonitorStatus("Monitoring...", true);
    });
    this.monitor.on("message", async (message) => {
      await this.scanMessage(message.channel.id, message.content);
    });
    this.isMonitorStart = true;
    this.monitor.login(this.token).catch((e) => {
      this.sendMonitorStatus("Invalid token", false);
    });
  }

  /**
   * function scan each discord message
   * @param {Number} channelID
   * @param {String} msgContent
   */
  async scanMessage(channelID, msgContent) {
    if (this.isMonitorStart) {
      if (this.channelList.includes(channelID)) {
        const isDiscordInvite = this.checkDiscordInvite(msgContent);
        const inviteCode = this.getInviteCode(msgContent);
        if (isDiscordInvite) {
          for (let i = 0; i < this.tokenList.length; i++) {
            const token = this.tokenList[i].split(":")[2];
            const proxy = this.getProxy(this.proxyList);
            try {
              const info = await this.discordServerInviteAPI(
                inviteCode,
                token,
                proxy
              );
              // FUTURE SCOPE => Check if already joined
              if (info.status === 200) {
                const log = `Joined ${info.data.guild.name} server `;
                this.sendWebhook(log);
                ipcMain.emit("add-log", log);
                break;
              }
            } catch (error) {
              ipcMain.emit("add-log", `Something went wrong while joining server. Error: ${error.message}`);
            }
            await this.sleep();
          }
        }
      }
    }
  }

  /**
   * helper function generate random number between min & max interval
   * @param {Number} min
   * @param {Number} max
   */
  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * helper function generate random proxy
   * @param {Array} proxyArray
   */
  getProxy(proxyArray) {
    const indIndex = this.randomIntFromInterval(0, proxyArray?.length - 1 || 0);
    const [host, port, username, password] = proxyArray[indIndex]?.split(":");
    const proxy = {
      host: host,
      port: port,
      auth: {
        username: username,
        password: password,
      },
    };
    return proxy;
  }

  /**
   * helper function check message is valid invite link
   */
  checkDiscordInvite(url) {
    // TODO => Check this regex and redundancy of this function
    const inviteCheck = url.match(
      /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discord\.com|discordapp\.com\/invite)\/.+[a-z|A-Z|0-9]/g
    );
    return inviteCheck ? true : false;
  }

  /**
   * helper function extract invite code from invite link
   */
  getInviteCode(url) {
    const invite = url.match(
      /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discord\.com|discordapp\.com\/invite)\/.+[a-z|A-Z|0-9]/g
    );
    if (invite) {
      return url.split("/").pop();
    }
    return invite;
  }

  /**
   * helper function that stop the process for given delay duration
   */
  sleep() {
    return new Promise((resolve) => {
      setTimeout(resolve, this.delay);
    });
  }

  /**
   * function Stop the monitor
   */
  stop() {
    this.isMonitorStart = false;
    this.sendMonitorStatus("Stopped", false);
    this.monitor.destroy();
  }

  /**
   * function send Monitor status to rendrer process
   * @param {String} status
   * @param {Boolean} active
   */
  sendMonitorStatus(status, active) {
    const win = global.mainWin;
    if (win) {
      // TODO => lo-status to proper name convention
      win.webContents.send("lo-status", { id: this.id, status, active });
    }
  }

  /**
   * function send webhook notification
   * @param {String} status
   */
  sendWebhook(status) {
    const win = global.mainWin;
    if (win) {
      // TODO => Should not use bridge for the same
      win.webContents.send("webhook-status", { status, type: "IJ" });
    }
  }

  /**
   * API call for server joiner
   * @param {String} inviteCode
   * @param {String} token
   * @param {String} proxy
   */
  async discordServerInviteAPI(inviteCode, token, proxy) {
    return await axios({
      // TODO => Change BASE URL to without slash in the end
      url: `${BASE_URL}invites/${inviteCode}`,
      headers: { Authorization: token },
      method: "post",
      data: JSON.stringify({}),
      proxy,
    });
  }
}

module.exports = InviteJoinerMonitor;
