const bytenode = require("bytenode");
const path = require("path");

(async () => {
  try {
    bytenode.compileFile({
      filename: `${path.join(__dirname, "../process/linkOpener-process.js")}`,
      output: `${path.join(__dirname, "../process/linkOpener-process.jsc")}`,
    });
    await bytenode.runBytecodeFile(
      `${path.join(__dirname, "../process/linkOpener-process.jsc")}`
    );
  } catch (e) {
    console.log(e);
  }
})();

const linkOpenerProcess = require("../process/linkOpener-process.jsc");

class LinkOpenerManager {
  constructor() {
    this.bots = {};
  }

  addMonitor(data) {
    const { channelIDs, keywords, chromeUser, monitorToken, id } = data;
    this.bots[id] = new linkOpenerProcess(
      id,
      monitorToken?.value?.split(":")[2],
      channelIDs?.split("\n"),
      keywords?.label?.split("\n"),
      chromeUser
    );
  }

  stopMonitor(id) {
    if (id in this.bots) {
      this.bots[id].stop();
      delete this.bots[id];
    }
  }
}

module.exports = new LinkOpenerManager();
