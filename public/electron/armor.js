const bytenode = require("bytenode");
const path = require("path");
const v8 = require("v8");

v8.setFlagsFromString("--no-lazy");

(async () => {
  try {
    await bytenode.compileFile({
      filename: `${path.join(__dirname, "/main.js")}`,
      compileAsModule: true,
      electron: false,
      createLoader: true,
      loaderFilename: "",
    });
    bytenode.runBytecodeFile("/main.jsc");
  } catch (e) {
    console.log(e);
  }
})();

require("./main.jsc");
