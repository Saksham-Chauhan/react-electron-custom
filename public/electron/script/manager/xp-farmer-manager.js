const bytenode = require("bytenode");
const path = require("path");

(async () => {
  try {
    await bytenode.runBytecodeFile(
      `${path.join(__dirname, "../process/xp-farmer-process.jsc")}`
    );
  } catch (e) {
    console.log(e);
  }
})();

const xpfarmerProcess = require("../process/xp-farmer-process.jsc");

class XPFarmerManager {
  constructor() {
    this.bots = {};
  }

  addFarmer(data) {
    const proxy = this.parseProxyGroup(data.proxyGroup);
    console.log("ppp", proxy, data.proxyGroup);
    if (proxy) {
      this.bots[data.id] = new xpfarmerProcess(
        data.monitorToken,
        data.channelId,
        proxy
      );
    } else {
      this.sendMessage(data);
    }
  }

  sendMessage(data) {
    const win = global.mainWin;
    if (win) {
      win.webContents.send("no-proxy", data);
    }
  }

  parseProxyGroup(proxyGroup) {
    const arr = proxyGroup?.value?.split("\n");
    if (arr !== undefined) {
      const random = this.randomInt(0, arr.length - 1);
      return arr[random];
    } else return false;
  }

  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  stopFarmer(data) {
    if (data.id in this.bots) {
      this.bots[data.id].stop();
      delete this.bots[data.id];
    }
  }
}

module.exports = new XPFarmerManager();
