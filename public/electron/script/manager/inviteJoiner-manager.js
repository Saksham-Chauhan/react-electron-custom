const bytenode = require("bytenode");
const path = require("path");

(async () => {
  await bytenode.compileFile({
    filename: `${path.join(__dirname, "../process/inviteJoiner-process.js")}`,
    compileAsModule: true,
    electron: false,
    createLoader: true,
    loaderFilename: "",
  });
})();

const inviteJoinerMonitor = require("../process/inviteJoiner-process.jsc");

class InviteJoinerManager {
  constructor() {
    this.bots = {};
  }

  addMonitor(data) {
    // TODO => Destructure
    const channelArray = data?.channelIDs?.split("\n");
    const proxyArray = data?.proxyGroup?.value?.split("\n");
    const tokenArray = data?.claimerGroup?.value?.split("\n");
    const monitorToken = data?.monitorToken?.value?.split(":")[2];
    this.bots[data.id] = new inviteJoinerMonitor(
      data.id,
      channelArray,
      tokenArray,
      proxyArray,
      monitorToken,
      data?.delay || 1000
    );
  }

  // TODO => Add stop monitor in helper
  stopMonitor(id) {
    if (id in this.bots) {
      this.bots[id].stop();
      delete this.bots[id];
    }
  }
}

module.exports = new InviteJoinerManager();
