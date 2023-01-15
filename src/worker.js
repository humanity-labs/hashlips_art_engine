const basePath = process.cwd();
const { NETWORK } = require(`${basePath}/constants/network.js`);
const fs_promises = require("fs").promises;
const sha1 = require(`${basePath}/node_modules/sha1`);
const { createCanvas, loadImage } = require(`${basePath}/node_modules/canvas`);
const { performance } = require('perf_hooks');
const PQueue = require('p-queue').default;

const buildDir = `${basePath}/build`;
const {
  format,
  baseUri,
  description,
  background,
  extraMetadata,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
} = require(`${basePath}/src/config.js`);

const generate = () => {
  const canvas = createCanvas(format.width, format.height);
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = format.smoothing;
  return { canvas, ctx };
};

const saveImage = async (canvas, _editionCount) => {
  return fs_promises.writeFile(
    `${buildDir}/images/${_editionCount}.png`,
    canvas.toBuffer("image/png")
  );
};

const genColor = () => {
  let hue = Math.floor(Math.random() * 360);
  let pastel = `hsl(${hue}, 100%, ${background.brightness})`;
  return pastel;
};

const drawBackground = (ctx) => {
  ctx.fillStyle = background.static ? background.default : genColor();
  ctx.fillRect(0, 0, format.width, format.height);
};

const addText = (ctx, _sig, x, y, size) => {
  ctx.fillStyle = text.color;
  ctx.font = `${text.weight} ${size}pt ${text.family}`;
  ctx.textBaseline = text.baseline;
  ctx.textAlign = text.align;
  ctx.fillText(_sig, x, y);
};

const addMetadata = (_dna, _edition, attrs) => {
  const dateTime = Date.now();
  let metadata = {
    name: `${namePrefix} #${_edition}`,
    description: description,
    image: `${baseUri}/${_edition}.png`,
    dna: sha1(_dna),
    edition: _edition,
    date: dateTime,
    ...extraMetadata,
    attributes: attrs,
    // compiler: "HashLips Art Engine",
  };
  if (network === NETWORK.sol) {
    metadata = {
      // Added metadata for solana
      name: metadata.name,
      symbol: solanaMetadata.symbol,
      description: metadata.description,
      // Added metadata for solana
      seller_fee_basis_points: solanaMetadata.seller_fee_basis_points,
      image: `${_edition}.png`,
      // Added metadata for solana
      external_url: solanaMetadata.external_url,
      edition: _edition,
      ...extraMetadata,
      attributes: metadata.attributes,
      properties: {
        files: [
          {
            uri: `${_edition}.png`,
            type: "image/png",
          },
        ],
        category: "image",
        creators: solanaMetadata.creators,
      },
    };
  }
  return metadata;
};

const loadLayerImg = async (_layer) => {
  try {
    return new Promise(async (resolve) => {
      const image = await loadImage(`${_layer.selectedElement.path}`);
      resolve({ layer: _layer, loadedImage: image });
    });
  } catch (error) {
    console.error("Error loading image:", _layer.selectedElement.path, error);
  }
};

const drawElement = (ctx, _renderObject, _index) => {
  const start = performance.now();
  ctx.globalAlpha = _renderObject.layer.opacity;
  ctx.globalCompositeOperation = _renderObject.layer.blend;
  
  if (text.only) {
    console.debug(`> Drawing text to canvas..`);
    addText(
      ctx,
      `${_renderObject.layer.name}${text.spacer}${_renderObject.layer.selectedElement.name}`,
      text.xGap,
      text.yGap * (_index + 1),
      text.size
    );
  }
  else {
    // console.debug(`> Drawing element to canvas..`);
    ctx.drawImage(
      _renderObject.loadedImage,
      0,
      0,
      format.width,
      format.height
    );
  }

  const end = performance.now();
  console.debug(`> drawElement`, ((end - start) / 1000).toFixed(2), `sec`);
};

const saveMetaDataSingleFile = async (_editionCount, metadata) => {
  console.debug(
    `> Writing metadata for`, _editionCount, `: ${JSON.stringify(metadata, null, 2)}`
  );
  return fs_promises.writeFile(
    `${buildDir}/json/${_editionCount}.json`,
    JSON.stringify(metadata, null, 2),
    'utf8'
  );
};

const build = async (edition, callback) => {
  console.debug(`> [build-worker]`, edition);
  const start_ts = performance.now();
  const elements = edition.layers.map((layer) => loadLayerImg(layer));
  edition.layer = generate();

  return Promise.all(elements).then(async (renderObjects, idx) => {
    // console.log("> Clearing canvas");
    // edition.layer.ctx.clearRect(0, 0, format.width, format.height);

    // if (gif.export) {
    //   console.debug(`> adding gif export..`);
    //   hashlipsGiffer = new HashlipsGiffer(
    //     edition.layer.canvas,
    //     edition.layer.ctx,
    //     `${buildDir}/gifs/${edition.abstractedIndex}.gif`,
    //     gif.repeat,
    //     gif.quality,
    //     gif.delay
    //   );
    //   hashlipsGiffer.start();
    // }

    if (background.generate) {
      console.debug(`> Generating background..`);
      drawBackground(edition.layer.ctx);
    }

    const attrs = new Array(renderObjects.length);
    renderObjects.forEach((render, index) => {
      attrs[index] = {
        trait_type: render.layer.name,
        value: render.layer.selectedElement.name,
      };
    });
    const metadata = addMetadata(edition.dna, edition.abstractedIndex, attrs);

    const renders = renderObjects.map(async (renderObject, index) => {
      return new Promise(async (resolve) => {
        drawElement(
          edition.layer.ctx,
          renderObject,
          index,
        );
        // if (gif.export) hashlipsGiffer.add();
        resolve();
      });
    });

    await Promise.all(renders);

    // if (gif.export) {
    //   hashlipsGiffer.stop();
    // }

    return Promise.allSettled([
      saveImage(edition.layer.canvas, edition.abstractedIndex),
      saveMetaDataSingleFile(edition.abstractedIndex, metadata),
    ])
    .then(() => {
      const end_ts = performance.now();
      console.debug(
        `>`, `Created edition: #`, edition.abstractedIndex, ` DNA (hash): ${edition.dnaHash}\n`, 
        `>`, ((end_ts - start_ts) / 1000).toFixed(2), `sec\n`,
      );
      callback({
        attrs,
        metadata,
      });
    })
    .catch(e => console.warn(`> [error]`, e));
  });
};

console.debug(`> Worker module initialized..`);
module.exports = build;
