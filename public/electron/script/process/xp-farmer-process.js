const isDev = require("electron-is-dev");
const { spawn } = require("child_process");
const path = require("path");

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
        this.process = spawn(this.exePath, [
          this.token,
          this.channelID,
          this.proxy,
        ]);
        this.isRunning = true;
        this.process.stdout.on("data", (data) => {
          console.log("Output: ", data.toString("utf8"));
        });
        this.process.stderr.on("data", (data) => {
          console.log("Error: ", data.toString("utf8"));
        });
        console.log("Process is Running with Pid", this.process.pid);
      } catch (e) {
        this.process = null;
        console.log("this is error", e);
      }
    } else console.log("ALREADY RUNNING!!!!!");
  }

  stop() {
    if (this.isRunning) {
      if (this.process != null && "pid" in this.process) {
        console.log("XP farmer is Stopping with pid", this.process.pid);
        try {
          process.kill(this.process.pid);
        } catch (e) {
          console.log(e);
        }
      } else console.log("something not found!!!");
    } else console.log("NOT RUNNING!!!");
  }
}

module.exports = XPFarmerProcess;
