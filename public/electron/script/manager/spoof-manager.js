const bytenode = require("bytenode");
const path = require("path");

(async () => {
  try {
    bytenode.compileFile({
      filename: `${path.join(__dirname, "../process/spoof-process.js")}`,
      output: `${path.join(__dirname, "../process/spoof-process.jsc")}`,
    });
    await bytenode.runBytecodeFile(
      `${path.join(__dirname, "../process/spoof-process.jsc")}`
    );
  } catch (e) {
    console.log(e);
  }
})();

const spooferProcess = require("../process/spoof-process.jsc");

class SpooferManager {
  constructor() {
    this.bots = {};
  }

  addSpoofer(data) {
    const { id, url, isDisableImage, proxyValue } = data;
    this.bots[id] = new spooferProcess(
      id,
      url,
      proxyValue.split("\n") || [],
      isDisableImage
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
