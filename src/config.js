const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

const network = NETWORK.sol;

// General metadata for Ethereum
const namePrefix = "BBs";
const description = "BB Pods are the beginning of the BB story.";
const baseUri = "ipfs://NewUriToReplace";

const solanaMetadata = {
  symbol: "BB",
  seller_fee_basis_points: 999, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: "https://www.bb.social",
  creators: [
    {
      address: "2UV6yqyEkgEfeptupzWq84sx5B9sZXeMYgHnJpFVNCgE",
      share: 100,
    },
  ],
};

// If you have selected Solana then the collection starts from 0 automatically
const layerConfigurations = [
  /**
   * Yellow
   */
  {
    growEditionSizeTo: 50,
    layersOrder: [
      {
        name: "Background Yellow",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "Skin Yellow",
        options: {
          displayName: "Skin",
        }
      },
      { name: "Mouth" },
      { name: "Eyes" },
      { name: "Brows" },
      // { name: "Eyewear" },
      // { name: "Hat" },
      { name: "Clothes" },
    ],
  },
  {
    growEditionSizeTo: 100,
    layersOrder: [
      {
        name: "Background Yellow",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "Skin Yellow",
        options: {
          displayName: "Skin",
        }
      },
      { name: "Mouth" },
      { name: "Eyes" },
      { name: "Brows" },
      { name: "Eyewear" },
      // { name: "Hat" },
      { name: "Clothes" },
    ],
  },
  {
    growEditionSizeTo: 150,
    layersOrder: [
      {
        name: "Background Yellow",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "Skin Yellow",
        options: {
          displayName: "Skin",
        }
      },
      { name: "Mouth" },
      { name: "Eyes" },
      { name: "Brows" },
      { name: "Eyewear" },
      { name: "Hat" },
      { name: "Clothes" },
    ],
  },
  {
    growEditionSizeTo: 200,
    layersOrder: [
      {
        name: "Background Yellow",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "Skin Yellow",
        options: {
          displayName: "Skin",
        }
      },
      { name: "Mouth" },
      { name: "Eyes" },
      { name: "Brows" },
      // { name: "Eyewear" },
      { name: "Hat" },
      { name: "Clothes" },
    ],
  },

  /**
   * Red
   */
  {
    growEditionSizeTo: 250,
    layersOrder: [
      {
        name: "Background Red",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "Skin Red",
        options: {
          displayName: "Skin",
        }
      },
      { name: "Mouth" },
      { name: "Eyes" },
      { name: "Brows" },
      // { name: "Eyewear" },
      // { name: "Hat" },
      { name: "Clothes" },
    ],
  },
  {
    growEditionSizeTo: 300,
    layersOrder: [
      {
        name: "Background Red",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "Skin Red",
        options: {
          displayName: "Skin",
        }
      },
      { name: "Mouth" },
      { name: "Eyes" },
      { name: "Brows" },
      { name: "Eyewear" },
      // { name: "Hat" },
      { name: "Clothes" },
    ],
  },
  {
    growEditionSizeTo: 350,
    layersOrder: [
      {
        name: "Background Red",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "Skin Red",
        options: {
          displayName: "Skin",
        }
      },
      { name: "Mouth" },
      { name: "Eyes" },
      { name: "Brows" },
      { name: "Eyewear" },
      { name: "Hat" },
      { name: "Clothes" },
    ],
  },
  {
    growEditionSizeTo: 400,
    layersOrder: [
      {
        name: "Background Red",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "Skin Red",
        options: {
          displayName: "Skin",
        }
      },
      { name: "Mouth" },
      { name: "Eyes" },
      { name: "Brows" },
      // { name: "Eyewear" },
      { name: "Hat" },
      { name: "Clothes" },
    ],
  },

  /**
   * Blue
   */
  {
    growEditionSizeTo: 450,
    layersOrder: [
      {
        name: "Background Blue",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "Skin Blue",
        options: {
          displayName: "Skin",
        }
      },
      { name: "Mouth" },
      { name: "Eyes" },
      { name: "Brows" },
      // { name: "Eyewear" },
      // { name: "Hat" },
      { name: "Clothes" },
    ],
  },
  {
    growEditionSizeTo: 500,
    layersOrder: [
      {
        name: "Background Blue",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "Skin Blue",
        options: {
          displayName: "Skin",
        }
      },
      { name: "Mouth" },
      { name: "Eyes" },
      { name: "Brows" },
      { name: "Eyewear" },
      // { name: "Hat" },
      { name: "Clothes" },
    ],
  },
  {
    growEditionSizeTo: 550,
    layersOrder: [
      {
        name: "Background Blue",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "Skin Blue",
        options: {
          displayName: "Skin",
        }
      },
      { name: "Mouth" },
      { name: "Eyes" },
      { name: "Brows" },
      { name: "Eyewear" },
      { name: "Hat" },
      { name: "Clothes" },
    ],
  },
  {
    growEditionSizeTo: 600,
    layersOrder: [
      {
        name: "Background Blue",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "Skin Blue",
        options: {
          displayName: "Skin",
        }
      },
      { name: "Mouth" },
      { name: "Eyes" },
      { name: "Brows" },
      // { name: "Eyewear" },
      { name: "Hat" },
      { name: "Clothes" },
    ],
  },

  /**
   * Green
   */
  {
    growEditionSizeTo: 650,
    layersOrder: [
      {
        name: "Background Green",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "Skin Green",
        options: {
          displayName: "Skin",
        }
      },
      { name: "Mouth" },
      { name: "Eyes" },
      { name: "Brows" },
      // { name: "Eyewear" },
      // { name: "Hat" },
      { name: "Clothes" },
    ],
  },
  {
    growEditionSizeTo: 700,
    layersOrder: [
      {
        name: "Background Green",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "Skin Green",
        options: {
          displayName: "Skin",
        }
      },
      { name: "Mouth" },
      { name: "Eyes" },
      { name: "Brows" },
      { name: "Eyewear" },
      // { name: "Hat" },
      { name: "Clothes" },
    ],
  },
  {
    growEditionSizeTo: 750,
    layersOrder: [
      {
        name: "Background Green",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "Skin Green",
        options: {
          displayName: "Skin",
        }
      },
      { name: "Mouth" },
      { name: "Eyes" },
      { name: "Brows" },
      { name: "Eyewear" },
      { name: "Hat" },
      { name: "Clothes" },
    ],
  },
  {
    growEditionSizeTo: 800,
    layersOrder: [
      {
        name: "Background Green",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "Skin Green",
        options: {
          displayName: "Skin",
        }
      },
      { name: "Mouth" },
      { name: "Eyes" },
      { name: "Brows" },
      // { name: "Eyewear" },
      { name: "Hat" },
      { name: "Clothes" },
    ],
  },
];

const debugLogs = true;

// TODO: not quite sure what this does..
const shuffleLayerConfigurations = false;

const format = {
  // TODO: how large of format do we want to generate artwork for?
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

const extraMetadata = {

};
const rarityDelimiter = "#";

// Torrance is Tolerance..?
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
  // preview,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  gif,
  // preview_gif,
};
