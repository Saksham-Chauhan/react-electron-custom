const bytenode = require("bytenode");
const path = require("path");

(async () => {
  try {
    bytenode.compileFile({
      filename: `${path.join(
        __dirname,
        "../process/discord-spoof-process.js"
      )}`,
      output: `${path.join(__dirname, "../process/discord-spoof-process.jsc")}`,
    });
    await bytenode.runBytecodeFile(
      `${path.join(__dirname, "../process/discord-spoof-process.jsc")}`
    );
  } catch (e) {
    console.log(e);
  }
})();

const DiscordSpooferProcess = require("../process/discord-spoof-process.jsc");

class DiscordManager {
  constructor() {
    this.bots = {};
  }

  addSpoofer(data) {
    const {
      id,
      proxyGroup: { value },
      claimerGroup,
    } = data;
    const claimerList = claimerGroup.value.split("\n") || [];
    let flag = false;
    let invalidTokenIndex = [];
    for (let i = 0; i < claimerList.length; i++) {
      const [email, passowrd] = claimerList[i]?.split(":");
      if (email && passowrd && id) {
        this.bots[`${id}-${i}`] = new DiscordSpooferProcess(
          id,
          value.split("\n") || [],
          this.getValidClaimerList(claimerGroup.value),
          email,
          passowrd
        );
      } else {
        invalidTokenIndex.push(i + 1);
        flag = true;
      }
    }

    if (flag) {
      this.sendError(
        `Invalid format in Discord token\n${invalidTokenIndex.join(",")}`
      );
    }
  }

  stopSpoofer({ claimer, id }) {
    const claimerList = claimer.value.split("\n") || [];
    for (let i = 0; i < claimerList.length; i++) {
      if (`${id}-${i}` in this.bots) {
        this.bots[`${id}-${i}`].deleteBrowser();
      }
    }
  }

  deleteBrowser() {
    Object.keys(this.bots).forEach((id) => {
      delete this.bots[id];
    });
  }

  sendError(msg) {
    if (global.mainWin) {
      global.mainWin.webContents.send("error", msg);
    }
  }
  getValidClaimerList(value) {
    let count = 0;
    const arr = value.split("\n");
    for (let i = 0; i < arr.length; i++) {
      const cred = arr[i].split(":");
      if (cred[0] && cred[1]) count++;
    }
    return count;
  }
}

module.exports = new DiscordManager();
