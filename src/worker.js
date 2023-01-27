const basePath = process.cwd();
const fs_promises = require("fs").promises;
const { createCanvas, loadImage } = require(`canvas`);
const { performance } = require('perf_hooks');
// const log = require(`${basePath}/node_modules/npmlog`);
// log.enableColor();

// arweave via bundlr integration
const {
  Keypair,
  Connection,
} = require("@solana/web3.js");
const {
  Metaplex,
  keypairIdentity,
  bundlrStorage,
  toMetaplexFile,
} = require('@metaplex-foundation/js');

const KEY = process.env.KEY;
const keypair = KEY?.length ? Keypair.fromSecretKey(new Uint8Array(JSON.parse(KEY))) : Keypair.generate();
console.debug(`> keypair identity`, keypair.publicKey.toBase58());
const metaplex = Metaplex
  .make(new Connection(process.env.SOLANA_RPC))
  .use(keypairIdentity(keypair))
  .use(bundlrStorage({
  }));
const nfts = metaplex.nfts();

const buildDir = `${basePath}/build`;
const { NETWORK } = require(`${basePath}/constants/network.js`);
const {
  layer_config,
  metadata_config,
  network,
  // background,
  // text,
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
      name: `${metadata_config.name_prefix} #${edition}`,
      symbol: metadata_config.solana.symbol,
      description: metadata_config.description,
      collection: metadata_config.solana.collection,
      seller_fee_basis_points: metadata_config.solana.seller_fee_basis_points,
      image: `${edition}.png`,
      external_url: metadata_config.solana.external_url,
      edition,
      ...metadata_config.extra_metadata,
      attributes: attrs,
      properties: {
        files: [
          {
            uri: `${edition}.png`,
            type: 'image/png',
          },
        ],
        category: 'image',
        creators: metadata_config.solana.creators,
      },
    };
  }
  else {
    metadata = {
      name: `${metadata_config.name_prefix} #${edition}`,
      description: metadata_config.description,
      image: `${metadata_config.base_uri}/${edition}.png`,
      dna: dnaHash,
      edition,
      date: Date.now(),
      ...metadata_config.extra_metadata,
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
  const canvas = createCanvas(layer_config.format.width, layer_config.format.height);
  const ctx = canvas.getContext('2d', { alpha: false });
  ctx.imageSmoothingEnabled = layer_config.format.smoothing;
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
  ctx.fillRect(0, 0, layer_config.format.width, layer_config.format.height);
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
    renderObject.image, 0, 0, layer_config.format.width, layer_config.format.height
  );

  // const e = performance.now();
  // console.debug(`> drawElement`, index, parseFloat(((e - s) / 1000).toFixed(2)), `sec`);
};

const layer = generate();

const build = async (edition, callback) => {
  const pid = process.pid;
  // console.debug(`> [build-worker (`, pid, `)]`, edition);
  const elements = edition.layers.map(_ => loadLayerImage(_));

  return Promise.all(elements)
  .then((renders) => {
    const attrs = renders.map(_ => ({
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
    layer.ctx.clearRect(0, 0, layer_config.format.width, layer_config.format.height);

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

    renders.map(async (render, index) => {
      // if (gif?.export) hashlipsGiffer.add();
      drawElement(
        layer.ctx,
        render,
        index,
      );
    });
    // if (gif?.export) hashlipsGiffer.stop();

    const end = performance.now();

    /*process.nextTick(() => {
      console.debug(
        `>`, `Created edition: #`, edition.index, ` DNA (hash): ${edition.dnaHash}`, 
      );
      callback({ metadata });
    });*/

    return Promise.allSettled([
      writeImage(layer.canvas, edition.index),
      writeMetadata(metadata, edition.index),
    ])
    .then(() => {
      console.debug(
        `>`, `Created edition: #`, edition.index, ` DNA (hash): ${edition.dnaHash}`, 
        `pid:`, pid,
      );
      callback({ metadata, pid, rendering: (end - start) });
    });
  });
};

const is_retryable = (err) => {
  const e = err.toString().toLowerCase();
  const rpc_retryable = [
    'enotfound',
    'econnreset',
    'etimedout',
    'eai_again',
    'blockhash not found',
    'unable to obtain a new blockhash after',
    'node is behind',
  ];
  return rpc_retryable.find(_ => e.includes(_)) ? true : false;
};

const metaplexFile = async (filename) => {
  return fs_promises.readFile(`${buildDir}/images/${filename}`)
  .then(buff => {
    return Promise.resolve(toMetaplexFile(buff, filename));
  });
}

const upload = async (
  edition,
  filename,
  metadata,
  callback,
  attempt = 0,
) => {
  const pid = process.pid;
  console.debug(`> [upload-worker (`, pid, `)]`, edition, filename);
  metaplex.connection = new Connection(
    process.env.SOLANA_RPC, 'confirmed'
  );

  const image_file = await metaplexFile(filename);
  metadata.image = image_file;
  metadata.properties.files[0].uri = image_file;

  return nfts.uploadMetadata(metadata)
  .then(result => {
    console.debug(`Upload result`, {
      id: edition,
      json_uri: result.uri,
      image_uris: result.assetUris,
    });
    return callback({
      id: edition,
      json_uri: result.uri,
      image_uris: result.assetUris,
      metadata: result.metadata,
    });
  })
  .catch(async (err) => {
    if (is_retryable(err)) {
      return upload(edition,
        filename,
        metadata,
        callback,
        ++attempt
      );
    }
    
    if (attempt > 2) {
      console.error(`> [nfts.uploadMetadata error]`, err);
      return callback(null, {
        message: err.message,
      });
    }

    console.debug(`> [nfts.uploadMetadata] re-attempt(`, attempt, `)`, filename);
    return upload(edition, filename, metadata, callback, ++attempt);
  });
};

console.debug(`> Worker module initialized..`);
module.exports = { build, upload };
