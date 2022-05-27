const bytenode = require("bytenode");
const path = require("path");

(async () => {
  try {
    bytenode.compileFile({
      filename: `${path.join(
        __dirname,
        "../process/giveawayJoiner-process.js"
      )}`,
      output: `${path.join(
        __dirname,
        "../process/giveawayJoiner-process.jsc"
      )}`,
    });
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
    const { id, serverid, botid, token, delay } = data;
    this.bots[id] = new GiveawayJoinerProcess(
      id,
      token,
      serverid,
      botid,
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
