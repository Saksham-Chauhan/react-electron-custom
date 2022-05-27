const bytenode = require("bytenode");
const path = require("path");
const v8 = require("v8");

v8.setFlagsFromString("--no-lazy");

(async () => {
  try {
    bytenode.compileFile({
      filename: `${path.join(__dirname, "/main.js")}`,
      output: `${path.join(__dirname, "/main.jsc")}`,
    });
    bytenode.runBytecodeFile(`${path.join(__dirname, "/main.jsc")}`);
  } catch (e) {
    console.log(e);
  }
})();

require("./main.jsc");
