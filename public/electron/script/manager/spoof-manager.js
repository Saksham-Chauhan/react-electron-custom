const spooferProcess = require("../process/spoof-process");
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
      global.mainWin
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
      this.senError("Instance not created");
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
  senError(msg) {
    if (global.mainWin) {
      global.mainWin.webContents.send("error", msg);
    }
  }
}

module.exports = new SpooferManager();
