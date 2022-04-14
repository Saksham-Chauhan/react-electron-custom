const { Client } = require("discord.js-selfbot");
const open = require("open");
const { ipcMain } = require("electron");
const { inviteJoinerTest } = require("../../helper/fetchTweet");
const { default: axios } = require("axios");
const BASE_URL = "https://discord.com/api/v9/";

class InviteJoinerMonitor {
  monitor = new Client();
  /**
   * @param {Array} channelArray channel that want to monitor
   * @param {String} monitorToken monitor with selected disoord token
   * @param {Array} tokenArray token group that has to join
   * @param {Array} proxyArray  use different IP to avoid account banned
   * @param {String} id unique ID for each monitor
   * @param {Number} delay
   */
  constructor(channelArray, tokenArray, proxyArray, monitorToken, delay, id) {
    this.id = id;
    this.token = monitorToken;
    this.tokenList = tokenArray;
    this.proxyList = proxyArray;
    this.isMonitorStart = false;
    this.chromeProfile = chromeUser;
    this.channelList = channelArray || [];
    this.delay = delay ? parseInt(delay) : 2000;
    this.init();
  }

  init() {
    this.monitor.on("ready", () => {
      this.sensMonitorStatus("Monitoring...", true);
    });
    this.monitor.on("message", async (message) => {
      let msgContent = message.content;
      let channelID = message.channel.id;
      await this.scanMessage(channelID, msgContent);
    });
    if (/^[0-9A-Za-z_.-]+$/.test(this.token)) {
      this.isMonitorStart = true;
      this.monitor.login(this.token).catch((e) => {
        console.error(e.message);
      });
    } else console.log("Not valid token");
  }

  /**
   * function scan each discord message
   * @param {Number} channelID
   * @param {String} msgContent
   */
  async scanMessage(channelID, msgContent) {
    if (this.isMonitorStart) {
      if (this.channelList.includes(channelID)) {
        let inviteCode = checkDiscordInvite(msgContent);
        if (inviteCode) {
          for (let i = 0; i < this.tokenList.length; i++) {
            const token = this.tokenList[i].split(":")[3];
            const proxy = this.getProxy(this.proxyList);
            try {
              const info = await this.discordServerInviteAPI(
                inviteCode,
                token,
                proxy
              );
              if (info.status === 200) {
                let log = `Joined ${info.data.guild.name} server `;
                ipcMain.emit("add-log", log);
                break;
              }
            } catch (error) {
              let log = `Something went wrong ${error.message} while joining server  `;
              ipcMain.emit("add-log", log);
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
    const indIndex = this.randomIntFromInterval(0, proxyArray?.length || 0);
    let proxySplit = proxyArray[indIndex]?.split(":");
    const [host, port, username, password] = proxySplit;
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
    let inviteCheck = url.match(
      /(https?:\/\/)?(www\.)?(discord\.(gg|io|me|li)|discord\.com|discordapp\.com\/invite)\/.+[a-z|A-Z|0-9]/g
    );
    return inviteCheck ? true : false;
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
    this.sensMonitorStatus("Stopped", false);
    this.monitor.destroy();
  }

  /**
   * function send Monitor status to rendrer process
   * @param {String} status
   * @param {Boolean} active
   */
  sensMonitorStatus(status, active) {
    const win = global.mainWin;
    if (win) {
      win.webContents.send("lo-status", { id: this.id, status, active });
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
      url: `${BASE_URL}invites/${inviteCode}`,
      headers: { Authorization: token },
      method: "POST",
      data: JSON.stringify({}),
      proxy,
    });
  }
}

module.exports = InviteJoinerMonitor;

// on] {
//   [electron]   id: '733225747363397636',
//   [electron]   username: 'jack1998',
//   [electron]   avatar: 'https://cdn.discordapp.com/avatars/733225747363397636/b9738c4de589b634d52e09ce0a863d21.png',
//   [electron]   discriminator: '4346',
//   [electron]   public_flags: 0,
//   [electron]   flags: 0,
//   [electron]   banner: null,
//   [electron]   banner_color: null,
//   [electron]   accent_color: null,
//   [electron]   locale: 'en-US',
//   [electron]   mfa_enabled: false,
//   [electron]   email: 'yaduvanshiabhi1998@gmail.com',
//   [electron]   verified: true,
//   [electron]   joined_at: '2022-04-01T08:44:24.776000+00:00',
//   [electron]   roles: [],
//   [electron]   iat: 1649962784
//   [electron] }
