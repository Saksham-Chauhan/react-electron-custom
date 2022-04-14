const linkOpenerProcess = require("../process/linkOpener-process");

class LinkOpenerManager {
  constructor() {
    this.bots = {};
  }

  addMonitor(data) {
    const channelArray = data?.channelIDs?.split("\n");
    const keywordArray = data?.keywords?.split("\n");
    const chromeUser = data?.chromeUser;
    const monitorToken = data?.monitorToken?.value?.split(":")[3];
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
