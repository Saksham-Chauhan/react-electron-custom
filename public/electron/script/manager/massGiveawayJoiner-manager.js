const bytenode = require("bytenode");
const path = require("path");
const logManager = require("./log-manager.jsc");
const { ipcMain } = require("electron");

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

let success = 0;

ipcMain.on("increase", () => {
  success = success + 1;
});
ipcMain.on("send-final-status", () => {
  const obj = new MassGiveawayJoinerManager();
  obj.sendMonitoStatus();
});

const GiveawayJoinerProcess = require("../process/massGiveawayJoiner-process");

class MassGiveawayJoinerManager {
  constructor() {
    this.bots = {};
    this.taskID = null;
    this.tokens = null;
  }

  addMonitor(data) {
    const {
      id,
      serverid,
      botid,
      claimerGroup: { value },
      delay,
    } = data;
    const tokens = this.getTokenArray(value);
    this.tokens = tokens.length;
    this.taskID = id;
    this.bots[id] = {};
    this.flag = false;
    for (let i = 0; i < tokens.length; i++) {
      this.bots[id][tokens[i]] = new GiveawayJoinerProcess(
        id,
        tokens[i],
        serverid,
        botid,
        delay,
        i === tokens.length - 1 ? true : false
      );
    }
    this.flag = true;
    logManager.logMessage(`Mass Giveaway joiner start monitoring`);
  }

  getTokenArray(value) {
    return value.split("\n").map((item) => {
      return item.split(":")[2];
    });
  }

  stopMonitor({ id, value }) {
    const tokens = this.getTokenArray(value);
    if (id in this.bots) {
      for (let i = 0; i < tokens.length; i++) {
        this.bots[id][tokens[i]].stop();
      }
      delete this.bots[id];
    }
  }

  sendMonitoStatus() {
    const win = global.mainWin;
    if (win) {
      win.webContents.send("mass-giveaway-joiner-status", {
        id: this.taskID,
        status: `${success}/${this.tokens} Loggin`,
        active: false,
      });
    }
  }
}

module.exports = new MassGiveawayJoinerManager();
