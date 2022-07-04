const isDev = require("electron-is-dev");
const path = require("path");
const { ipcMain } = require("electron");
const exec = require("child_process").execFile;

class XPFarmerProcess {
  constructor(token, channelID, proxy) {
    this.exePath = isDev
      ? `${path.join(__dirname, "../../../windows/xpfarmer.exe")}`
      : `${path.join(__dirname, "../../../../build/windows/xpfarmer.exe")}`;
    this.process = null;
    this.isRunning = false;
    this.token = token;
    this.channelID = channelID;
    this.proxy = proxy;
    this.init();
  }

  init() {
    if (this.process === null) {
      try {
        ipcMain.emit("debugger", this.exePath);
        this.process = exec(
          this.exePath,
          [this.token, this.channelID, this.proxy],
          function (err, data) {
            console.log(err);
          }
        );
        this.isRunning = true;
        this.process.stdout.on("data", (data) => {
          console.log("Output: ", data.toString("utf8"));
        });
        this.process.stderr.on("data", (data) => {
          console.log("Error: ", data.toString("utf8"));
        });
        ipcMain.emit(
          "add-log",
          `Process is Running with Pid ${this.process.pid}`
        );
      } catch (e) {
        ipcMain.emit("debugger", this.exePath);
        this.process = null;
        ipcMain.emit(
          "add-log",
          `Something went wrong on executing xpFarmer with pid ${this.process.pid} Errro ${e.message}`
        );
      }
    } else console.log("ALREADY RUNNING!!!!!");
  }

  stop() {
    if (this.isRunning && this.process != null && "pid" in this.process) {
      ipcMain.emit(
        "add-log",
        `XP farmer is Stopping with pid, ${this.process.pid}`
      );
      try {
        process.kill(this.process.pid);
      } catch (e) {
        ipcMain.emit(
          "add-log",
          `Something went wrong during killing process with ${this.process.pid} Error message:${e.message}`
        );
      }
    } else console.log("something not found!!!");
  }
}

module.exports = XPFarmerProcess;
