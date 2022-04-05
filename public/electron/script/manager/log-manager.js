const { app, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const { download } = require("electron-dl");

const FILE_NAME_PREFIX = "kyro_tool_log-";

class LogManager {
  constructor() {
    this.WAIT_INTERVAL = 20000;
    this.logString = [];
    this.folderPath = path.join(app.getPath("userData"), "/Logs");

    this.fistLogFile = null;
    this.lastLogFile = null;
    // The file we log on for the day
    this.currentLogFile = null;
    // Special date string so we parse it easily
    this.dateString = `${new Date().getDate()}_${
      new Date().getMonth() + 1
    }_${new Date().getFullYear()}.log`;
  }

  saveLogs() {
    const logString = this.logString.map((log) => `${log}\n`).join("");
    fs.appendFileSync(`${this.folderPath}/${this.currentLogFile}`, logString);
    this.logString = [];
  }

  isSameDate() {
    const lastFileDate = this.lastLogFile.split(FILE_NAME_PREFIX)[1];
    if (lastFileDate === this.dateString) {
      return true;
    }
    return false;
  }

  logMessage(log) {
    this.logString.push(`[${new Date().toLocaleString()}] - ${log}`);
  }

  initLogs() {
    if (!fs.existsSync(this.folderPath)) {
      fs.mkdirSync(this.folderPath);
    }
    const newLogFile = `${FILE_NAME_PREFIX}${this.dateString}`;
    const logFiles = fs.readdirSync(this.folderPath);
    if (logFiles.length > 0) {
      this.lastLogFile = logFiles[logFiles.length - 1];
      // If the latest log has the same day as the current day we select that file as the log file for the day
      if (this.isSameDate()) {
        this.currentLogFile = this.lastLogFile;
        console.log("Last file has the same date, don't create a new one");
      } else {
        this.currentLogFile = newLogFile;
        console.log("Creating a new log file for the day");
        fs.appendFileSync(`${this.folderPath}/${newLogFile}`, "");
      }
    } else {
      this.currentLogFile = newLogFile;
      fs.appendFileSync(`${this.folderPath}/${newLogFile}`, "");
    }
    this.startLogSession();
  }

  sendLogs() {
    fs.readFile(
      `${this.folderPath}/${this.currentLogFile}`,
      async (err, data) => {
        if (!err) {
          const win = global.mainWin;
          if (win) {
            const options = {
              buttons: ["Yes", "No"],
              defaultId: 0,
              title: "Kyro",
              message: `Do you want to download ${this.currentLogFile}`,
              detail: "Log report",
            };
            const dialogResult = await dialog.showMessageBox(win, options);
            if (dialogResult.response === 0) {
              const url = `data:text/log;base64,${new Buffer.from(
                data
              ).toString("base64")}`;
              await download(win, url, {
                saveAs: true,
              });
            }
          }
        }
      }
    );
  }

  startLogSession() {
    setInterval(() => {
      this.saveLogs();
    }, this.WAIT_INTERVAL);
  }
}

module.exports = new LogManager();
