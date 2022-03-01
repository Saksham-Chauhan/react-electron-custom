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

  toggleSpoofer(id) {
    if (id in this.bots) {
      this.bots[id].toggleBrowser();
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
}

module.exports = new SpooferManager();
