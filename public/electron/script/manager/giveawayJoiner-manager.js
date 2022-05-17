const GiveawayJoinerProcess = require("../process/giveawayJoiner-process.js");

class GiveawayJoinerManager {
  constructor() {
    this.bots = {};
  }

  addMonitor(data) {
    const serverId = data?.serverid;
    const authorId = data?.botid;
    const token = data?.token;
    const delay = data?.delay;
    this.bots[data.id] = new GiveawayJoinerProcess(
      serverId,
      authorId,
      token,
      delay,
      data.id
    );
    console.log("helo in");
  }

  stopMonitor(id) {
    if (id in this.bots) {
      this.bots[id].stop();
      delete this.bots[id];
    }
  }
}

module.exports = new GiveawayJoinerManager();
