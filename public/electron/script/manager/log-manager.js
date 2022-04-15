const { app, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const { download } = require("electron-dl");

const FILE_NAME_PREFIX = "kyro_tool";

class LogManager {
  constructor() {
    this.WAIT_INTERVAL = 20000;
    this.logString = [];
    this.folderPath = path.join(app.getPath("userData"), "/Logs");
    this.maxFileSize = 1;
    this.currentLogFile = null;
    this.logFile = `${FILE_NAME_PREFIX}.log`;
  }

  saveLogs() {
    const logString = this.logString.map((log) => `${log}\n`).join("");
    fs.appendFileSync(`${this.folderPath}/${this.currentLogFile}`, logString);
    this.logString = [];
  }

  logMessage(log) {
    this.logString.push(`[${new Date().toLocaleString()}] - ${log}`);
  }

  checkFileSize() {
    const filePath = `${this.folderPath}/${this.logFile}`;
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const fileSizeInBytes = stats.size;
      const fileSizeInMB = fileSizeInBytes / (1024 * 1024);
      return fileSizeInMB;
    }
  }
  initLogs() {
    if (!fs.existsSync(this.folderPath)) {
      fs.mkdirSync(this.folderPath);
    }
    const newLogFile = this.logFile;
    const logFiles = fs.readdirSync(this.folderPath);
    if (logFiles.length > 0) {
      this.lastLogFile = logFiles[logFiles.length - 1];
      const isExceed = this.checkFileSize() < this.maxFileSize;
      if (isExceed) {
        this.currentLogFile = this.lastLogFile;
        console.log("Last file has the same date, dont create a new one");
      } else {
        for (let i = 0; i < logFiles.length; i++) {
          fs.rmSync(`${this.folderPath}/${logFiles[i]}`);
        }
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
