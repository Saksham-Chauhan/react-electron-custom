const bytenode = require("bytenode");
const path = require("path");

(async () => {
  try {
    await bytenode.runBytecodeFile(
      `${path.join(__dirname, "../process/giveawayJoiner-process.jsc")}`
    );
  } catch (e) {
    console.log(e);
  }
})();

const GiveawayJoinerProcess = require("../process/giveawayJoiner-process.jsc");

class GiveawayJoinerManager {
  constructor() {
    this.bots = {};
  }

  addMonitor(data) {
    // TODO => Destructure
    // const {ID, serverID, authorID, token, delay} = data
    const serverID = data?.serverid;
    const authorID = data?.botid;
    const token = data?.token;
    const delay = data?.delay;
    this.bots[data.id] = new GiveawayJoinerProcess(
      data.id,
      token,
      serverID,
      authorID,
      delay
    );
  }

  stopMonitor(id) {
    if (id in this.bots) {
      this.bots[id].stop();
      delete this.bots[id];
    }
  }
}

module.exports = new GiveawayJoinerManager();
