const { Client } = require("discord.js-selfbot");
const open = require("open");
const { ipcMain } = require("electron");

class LinkOpenerMonitor {
  monitor = new Client();
  /**
   * @param {Array} channelArray channel that want to monitor
   * @param {Array} keywordArray keywords that a message contain
   * @param {Object} chromeUser open profile with selected chromeProfile
   * @param {String} monitorToken monitor with selected disoord token
   * @param {String} id unique ID for each monitor
   */
  constructor(channelArray, keywordArray, chromeUser, monitorToken, id) {
    this.channelList = channelArray || [];
    this.keywordList = keywordArray || [];
    this.token = monitorToken;
    this.id = id;
    this.chromeProfile = chromeUser;
    this.isMonitorStart = false;
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
        this.sensMonitorStatus("Invalid token", false);
      });
    } else this.sensMonitorStatus("Invalid token", false);
  }

  /**
   * function scan each discord message
   * @param {Number} channelID
   * @param {String} msgContent
   * */
  async scanMessage(channelID, msgContent) {
    if (this.isMonitorStart) {
      if (this.channelList.includes(channelID)) {
        if (this.testUrlRegex(msgContent)) {
          let flag = this.containsKeyword(this.keywordList, msgContent);
          if (this.keywordList.length === 0 || flag) {
            if (this.chromeProfile) {
              let log = `${msgContent} open with ${this.chromeProfile.label} chrome profile`;
              this.sendWebhook(log);
              ipcMain.emit("add-log", log);
              await open(msgContent, {
                app: {
                  name: open.apps.chrome,
                  arguments: [`--profile-directory=${selectedChrome["value"]}`],
                },
              });
            } else {
              let log = `${msgContent} open with Default chrome profile`;
              this.sendWebhook(log);
              ipcMain.emit("add-log", log);
              await open(msgContent, {
                app: {
                  name: open.apps.chrome,
                  arguments: [`--profile-directory=Default`],
                },
              });
            }
          }
        }
      }
    }
  }

  /**
   * function check whether Message is url or not
   * @param {String} url
   */
  testUrlRegex(url) {
    const regex =
      /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
    if (regex.test(url)) return true;
    return false;
  }

  /**
   * function check whether Message conatin specific keyword
   * @param {Array} keywordsLO
   * @param {String} message
   */
  containsKeyword(keywordsLO, message) {
    let flag = false;
    for (let i = 0; i < keywordsLO.length; i++)
      if (message.includes(keywordsLO[i])) {
        flag = true;
        break;
      }
    return flag;
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
   * function send webhook notification
   * @param {String} status
   */
  sendWebhook(status) {
    const win = global.mainWin;
    if (win) {
      win.webContents.send("webhook-status", { status, type: "LO" });
    }
  }
}

module.exports = LinkOpenerMonitor;
