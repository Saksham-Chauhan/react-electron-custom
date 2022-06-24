const bytenode = require("bytenode");
const path = require("path");
const logManager = require("./log-manager.jsc");

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
    bytenode.compileFile({
      filename: `${path.join(__dirname, "../../helper/index.js")}`,
      output: `${path.join(__dirname, "../../helper/index.jsc")}`,
    });
    await bytenode.runBytecodeFile(
      `${path.join(__dirname, "../process/giveawayJoiner-process.jsc")}`
    );
    await bytenode.runBytecodeFile(
      `${path.join(__dirname, "../../helper/index.jsc")}`
    );
  } catch (e) {
    console.log(e);
  }
})();

const GiveawayJoinerProcess = require("../process/giveawayJoiner-process.jsc");
const { getEncryptedToken } = require("../../helper/index.jsc");

class MassGiveawayJoinerManager {
  constructor() {
    this.bots = {};
  }

  addMonitor(data) {
    const { id, serverid, botid, tokens, delay } = data;
    for (let i = 0; i < tokens.length; i++) {
      // this.bots[id] = new GiveawayJoinerProcess(
      //   id,
      //   token,
      //   serverid,
      //   botid,
      //   delay
      // );
    }
    logManager.logMessage(
      `Giveaway joiner start monitoring with token:${getEncryptedToken(token)}`
    );
  }

  stopMonitor(id) {
    if (id in this.bots) {
      this.bots[id].stop();
      delete this.bots[id];
    }
  }
}

module.exports = new MassGiveawayJoinerManager();
