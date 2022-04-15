const inviteJoinerMonitor = require("../process/inviteJoiner-process");

class InviteJoinerManager {
  constructor() {
    this.bots = {};
  }

  addMonitor(data) {
    console.log(data);
    const channelArray = data?.channelIDs?.split("\n");
    const proxyArray = data?.proxyGroup?.value?.split("\n");
    const tokenArray = data?.claimerGroup?.value?.split("\n");
    const monitorToken = data?.monitorToken?.value?.split(":")[3];
    this.bots[data.id] = new inviteJoinerMonitor(
      channelArray,
      tokenArray,
      proxyArray,
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

module.exports = new InviteJoinerManager();
