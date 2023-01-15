const basePath = process.cwd();
const fs_promises = require("fs").promises;
const sha1 = require(`${basePath}/node_modules/sha1`);
const { createCanvas, loadImage } = require(`${basePath}/node_modules/canvas`);
const { performance } = require('perf_hooks');

const buildDir = `${basePath}/build`;
const { NETWORK } = require(`${basePath}/constants/network.js`);
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


const writeImage = async (canvas, edition) => {
  return fs_promises.writeFile(
    `${buildDir}/images/${edition}.png`,
    canvas.toBuffer("image/png")
  );
};

const writeMetadata = async (edition, metadata) => {
  console.debug(
    `> Writing metadata for`, edition, `: ${JSON.stringify(metadata, null, 2)}`
  );
  return fs_promises.writeFile(
    `${buildDir}/json/${edition}.json`,
    JSON.stringify(metadata, null, 2),
    'utf8'
  );
};

const buildMetadata = (_dna, _edition, attrs) => {
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

const loadLayerImg = async (layer) => {
  try {
    return new Promise(async (resolve) => {
      const image = await loadImage(`${layer.selectedElement.path}`);
      resolve({ layer, loadedImage: image });
    });
  } catch (error) {
    console.error("Error loading image:", layer.selectedElement.path, error);
  }
};

const generate = () => {
  const canvas = createCanvas(format.width, format.height);
  const ctx = canvas.getContext("2d");
  ctx.imageSmoothingEnabled = format.smoothing;
  return { canvas, ctx };
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

const drawElement = async (ctx, renderObject, index) => {
  return new Promise(async (resolve) => {
    const s = performance.now();
    ctx.globalAlpha = renderObject.layer.opacity;
    ctx.globalCompositeOperation = renderObject.layer.blend;
    
    if (text.only) {
      console.debug(`> Drawing text to canvas..`);
      addText(
        ctx,
        `${renderObject.layer.name}${text.spacer}${renderObject.layer.selectedElement.name}`,
        text.xGap,
        text.yGap * (index + 1),
        text.size
      );
    }
    else {
      // console.debug(`> Drawing element to canvas..`);
      ctx.drawImage(
        renderObject.loadedImage,
        0,
        0,
        format.width,
        format.height
      );
    }
  
    const e = performance.now();
    console.debug(`> drawElement`, index, parseFloat(((e - s) / 1000).toFixed(2)), `sec`);
    resolve();
  });
};

const build = async (edition, callback) => {
  console.debug(`> [build-worker]`, edition);
  const start_ts = performance.now();
  const elements = edition.layers.map(layer => loadLayerImg(layer));
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

    const attrs = renderObjects.map(render => {
      return {
        trait_type: render.layer.name,
        value: render.layer.selectedElement.name,
      };
    });
    const metadata = buildMetadata(edition.dna, edition.abstractedIndex, attrs);

    const renders = renderObjects.map(async (renderObject, index) => {
      // if (gif.export) hashlipsGiffer.add();
      return drawElement(
        edition.layer.ctx,
        renderObject,
        index,
      );
    });

    // if (gif.export) {
    //   hashlipsGiffer.stop();
    // }

    return Promise.allSettled([
      ...renders,
      writeImage(edition.layer.canvas, edition.abstractedIndex),
      writeMetadata(edition.abstractedIndex, metadata),
    ])
    .then(() => {
      const end_ts = performance.now();
      console.debug(
        `>`, `Created edition: #`, edition.abstractedIndex, ` DNA (hash): ${edition.dnaHash}`, 
        `\n>`, parseFloat(((end_ts - start_ts) / 1000).toFixed(2)), `sec\n`,
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
