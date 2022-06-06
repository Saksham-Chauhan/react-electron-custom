const DiscordSpooferProcess = require("../process/discord-spoof-process");

class DiscordManager {
  constructor() {
    this.bots = {};
  }

  addSpoofer(data) {
    const { id, isDisableImage = false, proxyValue } = data;
    this.bots[id] = new DiscordSpooferProcess(
      id,
      proxyValue.split("\n") || [],
      isDisableImage
    );
  }
}

module.exports = new DiscordManager();
