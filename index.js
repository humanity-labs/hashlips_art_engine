const basePath = process.cwd();
const { build, buildSetup } = require(`${basePath}/src/main.js`);

(() => {
  buildSetup();
  build();
})();
