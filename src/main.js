const basePath = process.cwd();
const fs = require('fs');
const sha1 = require(`${basePath}/node_modules/sha1`);
const { performance } = require('perf_hooks');
const PQueue = require('p-queue').default;
const {
  Keypair,
  Connection,
  LAMPORTS_PER_SOL,
} = require("@solana/web3.js");
const KEY = process.env.KEY;
const keypair = KEY?.length ? Keypair.fromSecretKey(new Uint8Array(JSON.parse(KEY))) : Keypair.generate();

const workerFarm = require('worker-farm');
const cpus = require('os').cpus().length;
const FARM_OPTS = {
  autoStart: true,
  maxConcurrentWorkers: cpus,
  maxCallsPerWorker: Infinity,
  maxConcurrentCallsPerWorker: 10,
  // maxConcurrentCallsPerWorker: Infinity,
  maxRetries: Infinity,
  workerOptions: {
    detached: true,
  },
  onChild: (child) => {
    console.debug(`> onChild (`, child.pid, `)`, {
      spawnfile: child.spawnfile,
      killed: child.killed,
      connected: child.connected,
      send: `subprocess.send(message[, sendHandle[, options]][, callback])`,
      disconnect: `subprocess.disconnect()`,
    });
  },
};
const worker = workerFarm(FARM_OPTS, require.resolve('./worker'), ['build', 'upload']);

const buildDir = `${basePath}/build`;
const layersDir = `${basePath}/layers`;
const { NETWORK } = require(`${basePath}/constants/network.js`);
const {
  layerConfigurations,
  layer_config,
  storage_config,
  debugLogs,
  network,
  gif,
} = require(`${basePath}/src/config.js`);

const DNA_DELIMITER = `-`;

const rm = (path) => {
  if (fs.existsSync(path)) {
    fs.rmSync(path);
  }
};

const buildSetup = () => {
  if (fs.existsSync(buildDir)) fs.rmdirSync(buildDir, { recursive: true });
  fs.mkdirSync(buildDir);
  fs.mkdirSync(`${buildDir}/json`);
  fs.mkdirSync(`${buildDir}/images`);
  if (gif?.export) fs.mkdirSync(`${buildDir}/gifs`);

  // pre-process layers to clean up & normalize filenames
  rm(`${layersDir}/.DS_Store`);
  const layers = fs.readdirSync(layersDir, { encoding: 'utf8' });
  console.debug(`[pre-process] layers`, layers.length, layers);
  layers.forEach(layer => {
    rm(`${layersDir}/${layer}/.DS_Store`);
    const items = fs.readdirSync(`${layersDir}/${layer}`, { encoding: 'utf8' });
    // console.debug(`[pre-process] items`, layer, items.length, items);
    items.forEach((item, idx) => {
      // console.debug(`[pre-process]`, layer, idx, item);

      const cleaned = item
        .split('.png')[0]
        .trim()
        .replace(/[\{\}\-\_\[\]\+]/ig, '')
        .replace(/\s{2,}/g, ' ')
        .toLowerCase()
        .split(' ')
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
        .join(' ')
        .concat('.png');
      
      if (cleaned !== item) {
        fs.renameSync(`${layersDir}/${layer}/${item}`, `${layersDir}/${layer}/${cleaned}`);
      }
    });
  });
};

const getRarityWeight = (_str) => {
  // todo: should find last index of `.` char and slice to end..
  const nameWithoutExtension = _str.slice(0, -4);
  let nameWithoutWeight = Number(
    nameWithoutExtension.split(layer_config.rarity_delimiter).pop()
  );
  if (isNaN(nameWithoutWeight)) {
    nameWithoutWeight = 1;
  }
  return nameWithoutWeight;
};

const cleanName = (_str) => {
  const nameWithoutExtension = _str.slice(0, -4);
  const nameWithoutWeight = nameWithoutExtension.split(layer_config.rarity_delimiter).shift();
  return nameWithoutWeight;
};

const getElements = (path) => {
  return fs
    .readdirSync(path)
    .filter(item => !/(^|\/)\.[^\/\.]/g.test(item))
    .map((i, index) => {
      if (i.includes(`-`)) {
        throw new Error(`layer name can not contain dashes, please fix: ${i}`);
      }
      else if (i.includes(`+`)) {
        throw new Error(`layer name can not contain plus, please fix: ${i}`);
      }
      else if (i.includes(`_`)) {
        throw new Error(`layer name can not contain underscore, please fix: ${i}`);
      }
      else if (i.includes(`(`) || i.includes(`)`)) {
        throw new Error(`layer name can not contain paranthesis, please fix: ${i}`);
      }
      else if (i.includes(`[`) || i.includes(`]`)) {
        throw new Error(`layer name can not contain square-brace, please fix: ${i}`);
      }
      else if (i.includes(`{`) || i.includes(`}`)) {
        throw new Error(`layer name can not contain curly-brace, please fix: ${i}`);
      }
      return {
        id: index,
        name: cleanName(i),
        filename: i,
        path: `${path}${i}`,
        weight: getRarityWeight(i),
      };
    });
};

const layersSetup = (layersOrder) => {
  const layers = layersOrder.map((layerObj, index) => ({
    id: index,
    elements: getElements(`${layersDir}/${layerObj.name}/`),
    name:
      layerObj.options?.["displayName"] != undefined
        ? layerObj.options?.["displayName"]
        : layerObj.name,
    blend:
      layerObj.options?.["blend"] != undefined
        ? layerObj.options?.["blend"]
        : "source-over",
    opacity:
      layerObj.options?.["opacity"] != undefined
        ? layerObj.options?.["opacity"]
        : 1,
    bypassDNA:
      layerObj.options?.["bypassDNA"] !== undefined
        ? layerObj.options?.["bypassDNA"]
        : false,
  }));
  return layers;
};

const constructLayerToDna = (_dna = "", _layers = []) => {
  return _layers.map((layer, idx) => {
    const element = layer.elements.find(
      e => e.id == cleanDna(_dna.split(DNA_DELIMITER)[idx])
    );
    return {
      name: layer.name,
      blend: layer.blend,
      opacity: layer.opacity,
      element,
    };
  });
};

/**
 * In some cases a DNA string may contain optional query parameters for options
 * such as bypassing the DNA isUnique check, this function filters out those
 * items without modifying the stored DNA.
 *
 * @param {String} _dna New DNA string
 * @returns new DNA string with any items that should be filtered, removed.
 */
const filterDNAOptions = (_dna) => {
  const dnaItems = _dna.split(DNA_DELIMITER);
  const filteredDNA = dnaItems.filter((element) => {
    const query = /(\?.*$)/;
    const querystring = query.exec(element);
    if (!querystring) {
      return true;
    }
    const options = querystring[1].split("&").reduce((r, setting) => {
      const keyPairs = setting.split("=");
      return { ...r, [keyPairs[0]]: keyPairs[1] };
    }, []);

    return options.bypassDNA;
  });

  return filteredDNA.join(DNA_DELIMITER);
};

/**
 * Cleaning function for DNA strings. When DNA strings include an option, it
 * is added to the filename with a ?setting=value query string. It needs to be
 * removed to properly access the file name before Drawing.
 *
 * @param {String} _dna The entire newDNA string
 * @returns Cleaned DNA string without querystring parameters.
 */
const removeQueryStrings = (_dna) => {
  const query = /(\?.*$)/;
  return _dna.replace(query, "");
};

const isDnaUnique = (_dnas, _dna) => {
  const _filtered_dna = filterDNAOptions(_dna);
  return !_dnas.has(_filtered_dna);
};

const createDna = (_layers, _dnas, attempt = 0) => {
  const random_nums = [];

  _layers.forEach(layer => {
    
    let totalWeight = 0;
    layer.elements.forEach(_ => {
      totalWeight += _.weight;
    });

    // number between 0 - totalWeight
    let random = Math.floor(Math.random() * totalWeight);
    for (let i = 0, t = layer.elements.length; i < t; i++) {
      // subtract the current weight from the random weight
      // until we reach a sub zero value.
      random -= layer.elements[i].weight;
      if (random < 0) {
        return random_nums.push(
          `${layer.elements[i].id}:${layer.elements[i].filename}${
            layer.bypassDNA ? '?bypassDNA=true' : ''
          }`
        );
      }
    }
  });

  const dna = random_nums.join(DNA_DELIMITER);

  // recursively call until DNA is unique in set..
  if (!isDnaUnique(_dnas, dna)) {
    if (attempt > 500) {
      console.error(`[error]`, `max attempts reached generating a unique dna..`, `increase the number of trait layers..`);
      process.exit(1);
    }
    return createDna(_layers, _dnas, ++attempt);
  } else {
    return dna;
  }
};

const cleanDna = (_str) => {
  const withoutOptions = removeQueryStrings(_str);
  const dna = Number(withoutOptions.split(":").shift());
  return dna;
};

const writeMetadata = (_data) => {
  fs.writeFileSync(`${buildDir}/metadata.json`, JSON.stringify(_data, null, 2));
};

const writeUploads = (_data) => {
  fs.writeFileSync(`${buildDir}/asset-uploads.json`, JSON.stringify(_data, null, 2));
};

const writeFailedUploads = (_data) => {
  fs.writeFileSync(`${buildDir}/asset-uploads-failed.json`, JSON.stringify(_data, null, 2));
};

const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const generateIndexes = () => {
  const abstractedIndexes = [];
  for (
    let i = network == NETWORK.sol ? 0 : 1;
    i <= layerConfigurations[layerConfigurations.length - 1].growEditionSizeTo;
    i++
  ) {
    abstractedIndexes.push(i);
  }
  if (layer_config.shuffle) {
    return shuffle(abstractedIndexes);
  }
  else {
    return abstractedIndexes;
  }
};

const measure = (start, end, total, index, measures) => {
  const res = {
    sum: 0,
    avg: 0,
    runtime: (end - start),
    current: index,
    remaining: (total - index) > 0 ? (total - index) : 1,
    remainingTime: 0,
  };
  res.sum += res.runtime;
  measures.forEach(_ => res.sum += _.runtime);
  res.avg = res.sum / (measures.length + 1);
  res.remainingTime = (res.remaining * res.avg) / FARM_OPTS.maxConcurrentWorkers;
  return res;
};

const is_retryable = (err) => {
  const e = err.toString().toLowerCase();
  const rpc_retryable = [
    'ENOTFOUND',
    'ECONNRESET',
    'blockhash not found',
    'unable to obtain a new blockhash after',
    'node behind',
  ];
  return rpc_retryable.find(_ => e.includes(_));
};

const getBalance = async (address) => {
  const cxn = new Connection(
    process.env.SOLANA_RPC
  );
  return cxn.getBalance(address)
  .catch(err => {
    if (is_retryable(err))
      return getBalance(address);
    else
      return Promise.resolve(0);
  });
};

const build = async () => {
  const start_ts = performance.now();
  const layerConfigTotal = layerConfigurations.length;
  let layerConfigIndex = 0;
  let editionCount = 1;
  let failedCount = 0;

  const abstractedIndexes = generateIndexes();
  const total = abstractedIndexes.length;
  console.debug(`> Creating`, total, `Editions:`, abstractedIndexes, `Workers:`, FARM_OPTS.maxConcurrentWorkers);

  const render_queue = new PQueue({
    concurrency: (FARM_OPTS.maxConcurrentWorkers * 1) * 1,
    autoStart: true,
  });
  const upload_queue = new PQueue({
    concurrency: (FARM_OPTS.maxConcurrentWorkers * FARM_OPTS.maxConcurrentCallsPerWorker) * 2,
    autoStart: true,
  });

  const measures = [];
  const metadatas = [];
  const dnas = new Set();

  while (layerConfigIndex < layerConfigTotal) {
    const layerConfig = layerConfigurations[layerConfigIndex];
    const layers = layersSetup(layerConfig.layersOrder);

    const editions = [];
    while (editionCount <= layerConfig.growEditionSizeTo) {
      const dna = createDna(layers, dnas, 0);
      dnas.add(filterDNAOptions(dna));
      
      editions.push({
        edition: editionCount,
        index: abstractedIndexes.shift(),
        dna,
        dnaHash: sha1(dna),
        layers: constructLayerToDna(dna, layers),
      });
      editionCount++;
    }

    // dispatch build jobs to worker threads..
    editions.map(edition => {
      return render_queue.add(async () => {
        return new Promise(resolve => {
          const start = performance.now();

          const onBuild = (result, err) => {
            const end = performance.now();
            const measurement = measure(
              start, end, total, edition.index, measures
            );
            measures.push(measurement);

            if (err) {
              failedCount++;
              console.error(`> [onBuild error]`, `#`, failedCount, `err:`, err);
              if (failedCount >= layer_config.unique_dna_torrance) {
                console.warn(
                  `> You need more layers or elements to grow your edition to`, layerConfig.growEditionSizeTo, `artworks!`
                );
                process.exit(1);
              }
            }
            else {
              // console.debug(`> [onbuild] result`, result);
              console.debug(
                `> runtime (`, measurement.current, `):`, result.pid, `\n`, 
                `   - rendering:`, parseFloat((result.rendering / 1000).toFixed(2)), `sec`, `\n`,
                `   - current:`, parseFloat((measurement.runtime / 1000).toFixed(2)), `sec`, `\n`,
                `   - average:`, parseFloat((measurement.avg / 1000).toFixed(2)), `sec`, `\n`,
                `   - estmted:`, parseFloat((measurement.remainingTime / 1000 / 60).toFixed(2)), `min`, `\n`,
                `- completed:`, measures.length, `editions`, `\n`,
                `- remaining:`, measurement.remaining, `editions`, `\n`,
              );
              metadatas.push(result.metadata);
            }
            process.nextTick(resolve);
          };

          console.debug(
            `> dispatching build`, edition.index, `to worker`, `pending:`, render_queue.pending,
          );
          worker.build(edition, onBuild.bind(null));

        });
      });
    });

    await render_queue.onIdle();
    layerConfigIndex++;
    console.debug(`>`, abstractedIndexes.length, `Editions left to create:`, abstractedIndexes);
  }

  if (metadatas.length) {
    console.debug(``);
    console.debug(`> Writing metadatas.json..`);
    writeMetadata(metadatas);
  }

  const end_ts = performance.now();
  console.debug(
    `>`, `Build of`, metadatas.length, ` nfts complete..`,
    `\n>`, parseFloat(((end_ts - start_ts) / 1000 / 60).toFixed(2)), `min\n`,
  );

  if (storage_config.upload && metadatas.length) {
    console.debug(``);
    console.debug(`> Syncing image/json assets with arweave..`);
    const start_ts = performance.now();
    const uploads = [];
    const failed_uploads = [];

    // pre-balance checks..
    const balance_pre = await getBalance(keypair.publicKey);
  
    metadatas.map(metadata => {
      return upload_queue.add(async () => {
        return new Promise(resolve => {
  
          const onUpload = (result, err) => {
            if (err) {
              console.error(`> [error]`, err);
              failed_uploads.push(metadata);
            } else {
              uploads.push(result);
              // writeUploads(uploads).then(resolve);
            }
            process.nextTick(resolve);
          };
  
          console.debug(
            `> dispatching upload`, metadata.name, `to worker`, `pending:`, upload_queue.pending
          );
          const edition = metadata.edition;
          delete metadata.edition;
          worker.upload(edition, metadata.image, metadata, onUpload.bind(null));
  
        });
      });
    });
    
    await upload_queue.onIdle();
  
    if (uploads.length) {
      console.debug(``);
      console.debug(`> Writing`, uploads.length, `results to asset-uploads.json..`);
      writeUploads(uploads);
    }
    if (failed_uploads.length) {
      console.debug(`> Writing`, failed_uploads.length, `to asset-uploads-failed.json..`);
      writeFailedUploads(failed_uploads);
    }

    // post-balance checks..
    const balance_post = await getBalance(keypair.publicKey);

    const end_ts = performance.now();
    console.debug(
      `>`, `Upload of`, metadatas.length, `nfts complete..`,
      `\n>`, parseFloat(((end_ts - start_ts) / 1000 / 60).toFixed(2)), `min\n`,
      `- balance-pre:`, (balance_pre / LAMPORTS_PER_SOL), `SOL\n`,
      `- balance-post:`, (balance_post / LAMPORTS_PER_SOL), `SOL\n`,
      `- cost:`, ((balance_pre - balance_post) / LAMPORTS_PER_SOL), `SOL\n`,
    );
  }

  console.debug(`>`, `Stopping worker-farm..`);
  workerFarm.end(worker, () => {
    process.exit(0);
  });
};

module.exports = {
  build,
  buildSetup,
  getElements,
};
