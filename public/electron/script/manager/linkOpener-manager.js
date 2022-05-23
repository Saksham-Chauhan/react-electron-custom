const bytenode = require("bytenode");
const path = require("path");

(async () => {
  try {
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
    // TOOD => Destructure
    const channelArray = data?.channelIDs?.split("\n");
    const keywordArray = data?.keywords?.label?.split("\n");
    const chromeUser = data?.chromeUser;
    const monitorToken = data?.monitorToken?.value?.split(":")[2];
    this.bots[data.id] = new linkOpenerProcess(
      channelArray,
      keywordArray,
      chromeUser,
      monitorToken,
      data.id
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
