class MyPlugin {
  constructor(params) {
    this.inputParams = params;
  }
  apply(compiler) {
    let time;
    compiler.hooks.compile.tap("MyPlugin", (params) => {
      time = Date.now();
    });
    compiler.hooks.done.tap("MyPlugin", (stas) => {
      let timeSpan = Date.now() - time;
      console.log(`Compile spend time-${this.inputParams}: ${Math.floor(timeSpan / 1000)}`);
    });
    compiler.hooks.compilation.tap("MyPlugin", (compilation) => {
      compilation.hooks.beforeHash.tap("MyPlugin", (params) => {
        console.log("*******************Before Hash***********************");
      });
    });
  }
}
module.exports = MyPlugin;
