const bytenode = require("bytenode");
const path = require("path");

(async () => {
  try {
    bytenode.compileFile({
      filename: `${path.join(__dirname, "../process/inviteJoiner-process.js")}`,
      output: `${path.join(__dirname, "../process/inviteJoiner-process.jsc")}`,
    });
    await bytenode.runBytecodeFile(
      `${path.join(__dirname, "../process/inviteJoiner-process.jsc")}`
    );
  } catch (e) {
    console.log(e);
  }
})();

const inviteJoinerMonitor = require("../process/inviteJoiner-process.jsc");

class InviteJoinerManager {
  constructor() {
    this.bots = {};
  }

  addMonitor(data) {
    const { channelIDs, proxyGroup, claimerGroup, monitorToken, id, delay } =
      data;
    this.bots[id] = new inviteJoinerMonitor(
      id,
      monitorToken?.value?.split(":")[2],
      claimerGroup?.value?.split("\n"),
      channelIDs?.split("\n"),
      proxyGroup?.value?.split("\n"),
      delay || 1000
    );
  }

  stopMonitor(id) {
    if (id in this.bots) {
      this.bots[id].stop();
      delete this.bots[id];
    }
  }
}

module.exports = new InviteJoinerManager();
