const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.sol;

// General metadata for Ethereum
const namePrefix = "BB's";
const description = "BB's NFTs";
const baseUri = "ipfs://NewUriToReplace";

const solanaMetadata = {
  symbol: "BB",
  seller_fee_basis_points: 1000, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.twitter.com/bbs_nft",
  creators: [
    {
      address: "7fXNuer5sbZtaTEPhtJ5g5gNtuyRoKkvxdjEjEnPN4mC",
      share: 100,
    },
  ],
};

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  {
    growEditionSizeTo: 75,
    layersOrder: [
      { name: "Backgrounds" },
      { name: "Base" },
      { name: "Mouths" },
      { name: "Eyes" },
      { name: "Brows" },
      // { name: "Eyewear" },
      { name: "Hair" },
      // { name: "Hats" },
      { name: "Clothes" },
      { name: "Neck" },
    ],
  },
  {
    growEditionSizeTo: 150,
    layersOrder: [
      { name: "Backgrounds" },
      { name: "Base" },
      { name: "Mouths" },
      { name: "Eyes" },
      { name: "Brows" },
      // { name: "Eyewear" },
      // { name: "Hair" },
      { name: "Hats" },
      { name: "Clothes" },
      { name: "Neck" },
    ],
  },
  {
    growEditionSizeTo: 225,
    layersOrder: [
      { name: "Backgrounds" },
      { name: "Base" },
      { name: "Mouths" },
      { name: "Eyes" },
      { name: "Brows" },
      { name: "Eyewear" },
      // { name: "Hair" },
      { name: "Hats" },
      { name: "Clothes" },
      { name: "Neck" },
    ],
  },
  {
    growEditionSizeTo: 300,
    layersOrder: [
      { name: "Backgrounds" },
      { name: "Base" },
      { name: "Mouths" },
      { name: "Eyes" },
      { name: "Brows" },
      { name: "Eyewear" },
      { name: "Hair" },
      // { name: "Hats" },
      { name: "Clothes" },
      { name: "Neck" },
    ],
  },
  /*{
    growEditionSizeTo: 50,
    layersOrder: [
      { name: "Background" },
      { name: "Base" },
      { name: "Hat" },
      { name: "Hat-Logo" },
      { name: "Shirt" },
    ],
  },
  {
    growEditionSizeTo: 75,
    layersOrder: [
      { name: "Background" },
      { name: "Base" },
      { name: "Hat" },
      { name: "Hat-Logo" },
      { name: "Hoodie" },
    ],
  },
  {
    growEditionSizeTo: 100,
    layersOrder: [
      { name: "Background" },
      { name: "Base" },
      { name: "Hat" },
      { name: "Hoodie" },
    ],
  },
  {
    growEditionSizeTo: 125,
    layersOrder: [
      { name: "Background" },
      { name: "Base" },
      { name: "Hat" },
      { name: "Shirt" },
    ],
  },*/
];

const shuffleLayerConfigurations = false;
const debugLogs = true;

const format = {
  width: 1024,
  height: 1024,
  smoothing: true,
};

const gif = {
  export: false,
  repeat: 0,
  quality: 100,
  delay: 500,
};

const text = {
  // only: false,
  // color: "#ffffff",
  // size: 20,
  // xGap: 40,
  // yGap: 40,
  // align: "left",
  // baseline: "top",
  // weight: "regular",
  // family: "Courier",
  // spacer: " => ",
};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {
  generate: true,
  brightness: "70%",
  static: true,
  default: "#0a0a0a",
};

const extraMetadata = {};

const rarityDelimiter = "#";

const uniqueDnaTorrance = 10000;

const preview = {
  thumbPerRow: 3,
  thumbWidth: 250,
  imageRatio: format.height / format.width,
  imageName: "preview.png",
};

const preview_gif = {
  numberOfImages: 20,
  order: "ASC", // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: "preview.gif",
};

module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  preview_gif,
};
