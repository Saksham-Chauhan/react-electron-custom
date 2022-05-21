const bytenode = require("bytenode");
const path = require("path");

(async () => {
  await bytenode.compileFile({
    filename: `${path.join(__dirname, "../process/spoof-process.js")}`,
    compileAsModule: true,
    electron: false,
    createLoader: true,
    loaderFilename: "",
  });
})();

const spooferProcess = require("../process/spoof-process.jsc");

class SpooferManager {
  constructor() {
    this.bots = {};
  }

  addSpoofer(data) {
    let proxyArr = data.proxyValue.split("\n") || [];
    this.bots[data.id] = new spooferProcess(
      data.id,
      data.url,
      proxyArr,
      global.mainWin,
      data.isDisableImage
    );
  }

  startSpoofer(id) {
    if (id in this.bots) {
      this.bots[id].launchBrowser();
    }
  }

  stopAllSpoofer() {
    Object.keys(this.bots).forEach((spoof) => {
      this.stopSpoofer(spoof);
    });
  }

  deleteAllSpoofer() {
    Object.keys(this.bots).forEach((spoof) => {
      this.deleteSpoofer(spoof);
    });
  }

  toggleSpoofer(id) {
    if (id in this.bots) {
      this.bots[id].toggleBrowser();
    } else {
      this.sendError("Instance not created");
    }
  }

  stopSpoofer(id) {
    if (id in this.bots) {
      this.bots[id].closeBrowser();
    }
  }

  deleteSpoofer(id) {
    if (id in this.bots) {
      this.bots[id].deleteBrowser();
      delete this.bots[id];
    }
  }
  sendError(msg) {
    if (global.mainWin) {
      global.mainWin.webContents.send("error", msg);
    }
  }
}

module.exports = new SpooferManager();
