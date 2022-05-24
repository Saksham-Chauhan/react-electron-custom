const bytenode = require("bytenode");
const path = require("path");
const { randomInt } = require("../../helper");
// TODO => Look into bytenode
(async () => {
  try {
    bytenode.compileFile({
      filename: `${path.join(__dirname, "../process/xp-farmer-process.js")}`,
      output: `${path.join(__dirname, "../process/xp-farmer-process.jsc")}`,
    });
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
    if (proxy) {
      const { monitorToken, channelId, id } = data;
      this.bots[id] = new xpfarmerProcess(monitorToken, channelId, proxy);
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
    if (!!arr) return arr[randomInt(0, arr.length - 1)];
    else return false;
  }

  stopFarmer(data) {
    if (data.id in this.bots) {
      this.bots[data.id].stop();
      delete this.bots[data.id];
    }
  }
}

module.exports = new XPFarmerManager();
