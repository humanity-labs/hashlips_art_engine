const basePath = process.cwd();
const { build, buildSetup } = require(`${basePath}/src/main.js`);

const resume = process.env.RESUME;

(() => {
  if (resume) {
    // TODO
  } else {
    buildSetup();
  }
  build();
})();
