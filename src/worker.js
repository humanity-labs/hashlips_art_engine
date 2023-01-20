const basePath = process.cwd();
const fs_promises = require("fs").promises;
const { createCanvas, loadImage } = require(`canvas`);
const { performance } = require('perf_hooks');
const log = require(`${basePath}/node_modules/npmlog`);
log.enableColor();

const buildDir = `${basePath}/build`;
const { NETWORK } = require(`${basePath}/constants/network.js`);
const {
  format,
  baseUri,
  description,
  // background,
  extraMetadata,
  // text,
  namePrefix,
  network,
  solanaMetadata,
  // gif,
} = require(`${basePath}/src/config.js`);

// PNG-encoded, zlib compression level 3 for faster compression,
// but larger files, no filtering
const render_opts = {
  compressionLevel: 3,
  alpha: false,
};

const writeImage = async (canvas, edition) => {
  return new Promise(resolve => {
    canvas.toBuffer((_, buffer) => {
      fs_promises
        .writeFile(`${buildDir}/images/${edition}.png`, buffer)
        .then(() => resolve());
    }, 'image/png', { ...render_opts, filters: canvas.PNG_FILTER_NONE });
  });
};

const writeMetadata = async (metadata, edition) => {
  // console.debug(
  //   `> Writing metadata for`, edition, `: ${JSON.stringify(metadata, null, 2)}`
  // );
  return fs_promises.writeFile(
    `${buildDir}/json/${edition}.json`,
    JSON.stringify(metadata, null, 2),
    'utf8',
  );
};

const buildMetadata = (_dna, dnaHash, edition, attrs) => {
  let metadata;
  if (network === NETWORK.sol) {
    metadata = {
      name: `${namePrefix} #${edition}`,
      symbol: solanaMetadata.symbol,
      description,
      seller_fee_basis_points: solanaMetadata.seller_fee_basis_points,
      image: `${edition}.png`,
      external_url: solanaMetadata.external_url,
      edition,
      ...extraMetadata,
      attributes: attrs,
      properties: {
        files: [
          {
            uri: `${edition}.png`,
            type: "image/png",
          },
        ],
        category: "image",
        creators: solanaMetadata.creators,
      },
    };
  }
  else {
    metadata = {
      name: `${namePrefix} #${edition}`,
      description,
      image: `${baseUri}/${edition}.png`,
      dna: dnaHash,
      edition,
      date: Date.now(),
      ...extraMetadata,
      attributes: attrs,
      // compiler: "HashLips Art Engine",
    };
  }
  return metadata;
};

const CACHE = [];

const loadLayerImage = async (layer) => {
  const _cache = CACHE.find(_ => _.key === layer.element.path);
  if (_cache) return Promise.resolve({ layer, image: _cache.image });

  return loadImage(`${layer.element.path}`)
  .then(image => {
    CACHE.push({
      key: layer.element.path,
      image,
    });
    return Promise.resolve({ layer, image });
  })
  .catch(err => console.error(`Error loading image:`, layer.element.path, err));
};

const generate = () => {
  const canvas = createCanvas(format.width, format.height);
  const ctx = canvas.getContext('2d', { alpha: false });
  ctx.imageSmoothingEnabled = format.smoothing;
  // ctx.imageSmoothingQuality = "high";
  return { canvas, ctx };
};

/*const genColor = () => {
  let hue = Math.floor(Math.random() * 360);
  let pastel = `hsl(${hue}, 100%, ${background.brightness})`;
  return pastel;
};*/

/*const drawBackground = (ctx) => {
  ctx.fillStyle = background.static ? background.default : genColor();
  ctx.fillRect(0, 0, format.width, format.height);
};*/

/*const addText = (ctx, _sig, x, y, size) => {
  ctx.fillStyle = text.color;
  ctx.font = `${text.weight} ${size}pt ${text.family}`;
  ctx.textBaseline = text.baseline;
  ctx.textAlign = text.align;
  ctx.fillText(_sig, x, y);
};*/

const drawElement = (ctx, renderObject, index) => {
  // const s = performance.now();
  ctx.globalAlpha = renderObject.layer.opacity;
  ctx.globalCompositeOperation = renderObject.layer.blend;
  
  /*if (text?.only) {
    console.debug(`> Drawing text to canvas..`);
    addText(
      ctx,
      `${renderObject.layer.name}${text.spacer}${renderObject.layer.element.name}`,
      text.xGap,
      text.yGap * (index + 1),
      text.size
    );
    return resolve();
  }*/

  // console.debug(`> Drawing element to canvas..`);
  ctx.drawImage(
    renderObject.image, 0, 0, format.width, format.height
  );

  // const e = performance.now();
  // console.debug(`> drawElement`, index, parseFloat(((e - s) / 1000).toFixed(2)), `sec`);
};

const layer = generate();

const build = async (edition, callback) => {
  // console.debug(`> [build-worker]`, edition);
  const elements = edition.layers.map(_ => loadLayerImage(_));

  return Promise.all(elements)
  .then(async (renderObjects, idx) => {
    const attrs = renderObjects.map(_ => ({
      trait_type: _.layer.name,
      value: _.layer.element.name,
    }));
    const metadata = buildMetadata(
      edition.dna,
      edition.dnaHash,
      edition.index,
      attrs,
    );

    const start = performance.now();
    // console.log("> Clearing canvas");
    layer.ctx.clearRect(0, 0, format.width, format.height);

    /*if (gif.export) {
      console.debug(`> adding gif export..`);
      hashlipsGiffer = new HashlipsGiffer(
        layer.canvas,
        layer.ctx,
        `${buildDir}/gifs/${edition.index}.gif`,
        gif.repeat,
        gif.quality,
        gif.delay
      );
      hashlipsGiffer.start();
    }*/

    /*if (background?.generate) {
      console.debug(`> Generating background..`);
      drawBackground(layer.ctx);
    }*/

    renderObjects.map(async (renderObject, index) => {
      // if (gif?.export) hashlipsGiffer.add();
      drawElement(
        layer.ctx,
        renderObject,
        index,
      );
    });
    // if (gif?.export) hashlipsGiffer.stop();

    const end = performance.now();
    console.debug(
      `>`, `rendering:`, parseFloat(((end - start) / 1000).toFixed(2)), `sec\n`,
    );

    process.nextTick(() => {
      console.debug(
        `>`, `Created edition: #`, edition.index, ` DNA (hash): ${edition.dnaHash}`, 
        // `\n>`, parseFloat(((end_ts - start_ts) / 1000).toFixed(2)), `sec\n`,
      );
      callback({ metadata });
    });

    return Promise.allSettled([
      // ...renders,
      writeImage(layer.canvas, edition.index),
      writeMetadata(metadata, edition.index),
    ]);
    /*.then(() => {
      // const end_ts = performance.now();
      console.debug(
        `>`, `Created edition: #`, edition.index, ` DNA (hash): ${edition.dnaHash}`, 
        // `\n>`, parseFloat(((end_ts - start_ts) / 1000).toFixed(2)), `sec\n`,
      );
      //callback({
      //  attrs,
      //  metadata,
      //});
    })*/
  });
};

console.debug(`> Worker module initialized..`);
module.exports = build;
