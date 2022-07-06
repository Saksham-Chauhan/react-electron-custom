// const bytenode = require("bytenode");
// const path = require("path");

// (async () => {
//   try {
//     bytenode.compileFile({
//       filename: `${path.join(__dirname, "../process/inviteJoiner-process.js")}`,
//       output: `${path.join(__dirname, "../process/inviteJoiner-process.jsc")}`,
//     });
//     await bytenode.runBytecodeFile(
//       `${path.join(__dirname, "../process/inviteJoiner-process.jsc")}`
//     );
//   } catch (e) {
//     console.log(e);
//   }
// })();

const GiveCheckerProcess = require("../process/giveawayChecker-process");

class GiveCheckerManager {
  constructor() {
    this.bots = {};
  }

  addMonitor(data) {
    const {
      id,
      claimerGroup: { value },
      token,
      proxyGroup,
      botid,
      delay,
    } = data;
    this.bots[id] = new GiveCheckerProcess(
      value,
      token,
      proxyGroup.value,
      botid,
      delay || 1000,
      id
    );
  }

  stopMonitor(id) {
    if (id in this.bots) {
      this.bots[id].stop();
      delete this.bots[id];
    }
  }
}

module.exports = new GiveCheckerManager();
