const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

// General metadata for Ethereum
const network = NETWORK.sol;
const namePrefix = 'BB';
const description = 'BB Pods are the beginning of the BB story.';
const baseUri = 'ipfs://<NewUriToReplace>';
const solanaMetadata = {
  symbol: 'BB',
  seller_fee_basis_points: 999, // Define how much % you want from secondary market sales 1000 = 10%
  external_url: 'https://www.bb.social',
  creators: [
    {
      address: '2UV6yqyEkgEfeptupzWq84sx5B9sZXeMYgHnJpFVNCgE',
      share: 100,
    },
  ],
};


// if network is solana, then the collection starts from 0 automatically
const layerConfigurations = [
  /**
   * Red No EYEWEAR, No HAT
   */
  {
    growEditionSizeTo: 25,
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
      {
        name: "Mouths Red",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "Eyes Red Eyelid Bottom",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      {
        name: "Brows Red",
        options: {
          displayName: "Brows",
        }
      },
      // EYEWEAR
      {
        name: "Clothes Red",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "Hats Red",
      //   options: {
      //     displayName: "Hats",
      //   }
      // },
    ],
  },
  {
    growEditionSizeTo: 50,
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
      {
        name: "Mouths Red",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "Eyes Red No Eyelid Bottom",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      {
        name: "Brows Red",
        options: {
          displayName: "Brows",
        }
      },
      // EYEWEAR
      {
        name: "Clothes Red",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "Hats Red",
      //   options: {
      //     displayName: "Hats",
      //   }
      // },
    ],
  },
  {
    growEditionSizeTo: 75,
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
      {
        name: "Mouths Red",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "Eyes Red Almost Closed",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      {
        name: "Brows Red",
        options: {
          displayName: "Brows",
        }
      },
      // EYEWEAR
      {
        name: "Clothes Red",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "Hats Red",
      //   options: {
      //     displayName: "Hats",
      //   }
      // },
    ],
  },
  {
    growEditionSizeTo: 100,
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
      {
        name: "Mouths Red",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "Eyes Red No Eyelid Bottom",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      {
        name: "Brows Red",
        options: {
          displayName: "Brows",
        }
      },
      // EYEWEAR
      {
        name: "Clothes Red",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "Hats Red",
      //   options: {
      //     displayName: "Hats",
      //   }
      // },
    ],
  },

  /**
   * Red w EYEWEAR, No HAT
   */
  {
    growEditionSizeTo: 125,
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
      {
        name: "Mouths Red",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "Eyes Red Eyelid Bottom",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      {
        name: "Brows Red",
        options: {
          displayName: "Brows",
        }
      },
      // EYEWEAR
      {
        name: "Eyewear Red",
        options: {
          displayName: "Eyewear",
        }
      },
      {
        name: "Clothes Red",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "Hats Red",
      //   options: {
      //     displayName: "Hats",
      //   }
      // },
    ],
  },
  {
    growEditionSizeTo: 150,
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
      {
        name: "Mouths Red",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "Eyes Red No Eyelid Bottom",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      {
        name: "Brows Red",
        options: {
          displayName: "Brows",
        }
      },
      // EYEWEAR
      {
        name: "Eyewear Red",
        options: {
          displayName: "Eyewear",
        }
      },
      {
        name: "Clothes Red",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "Hats Red",
      //   options: {
      //     displayName: "Hats",
      //   }
      // },
    ],
  },
  {
    growEditionSizeTo: 175,
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
      {
        name: "Mouths Red",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "Eyes Red Almost Closed",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      {
        name: "Brows Red",
        options: {
          displayName: "Brows",
        }
      },
      // EYEWEAR
      {
        name: "Eyewear Red",
        options: {
          displayName: "Eyewear",
        }
      },
      {
        name: "Clothes Red",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "Hats Red",
      //   options: {
      //     displayName: "Hats",
      //   }
      // },
    ],
  },
  {
    growEditionSizeTo: 200,
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
      {
        name: "Mouths Red",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "Eyes Red No Eyelid Bottom",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      {
        name: "Brows Red",
        options: {
          displayName: "Brows",
        }
      },
      // EYEWEAR
      {
        name: "Eyewear Red",
        options: {
          displayName: "Eyewear",
        }
      },
      {
        name: "Clothes Red",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "Hats Red",
      //   options: {
      //     displayName: "Hats",
      //   }
      // },
    ],
  },

  /**
   * Red No EYEWEAR, w HAT
   */
  {
    growEditionSizeTo: 225,
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
      {
        name: "Mouths Red",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "Eyes Red Eyelid Bottom",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      {
        name: "Brows Red",
        options: {
          displayName: "Brows",
        }
      },
      // EYEWEAR
      // {
      //   name: "Eyewear Red",
      //   options: {
      //     displayName: "Eyewear",
      //   }
      // },
      {
        name: "Clothes Red",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      {
        name: "Hats Red",
        options: {
          displayName: "Hats",
        }
      },
    ],
  },
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
      {
        name: "Mouths Red",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "Eyes Red No Eyelid Bottom",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      {
        name: "Brows Red",
        options: {
          displayName: "Brows",
        }
      },
      // EYEWEAR
      // {
      //   name: "Eyewear Red",
      //   options: {
      //     displayName: "Eyewear",
      //   }
      // },
      {
        name: "Clothes Red",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      {
        name: "Hats Red",
        options: {
          displayName: "Hats",
        }
      },
    ],
  },
  {
    growEditionSizeTo: 275,
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
      {
        name: "Mouths Red",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "Eyes Red Almost Closed",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      {
        name: "Brows Red",
        options: {
          displayName: "Brows",
        }
      },
      // EYEWEAR
      // {
      //   name: "Eyewear Red",
      //   options: {
      //     displayName: "Eyewear",
      //   }
      // },
      {
        name: "Clothes Red",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      {
        name: "Hats Red",
        options: {
          displayName: "Hats",
        }
      },
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
      {
        name: "Mouths Red",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "Eyes Red No Eyelid Bottom",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      {
        name: "Brows Red",
        options: {
          displayName: "Brows",
        }
      },
      // EYEWEAR
      // {
      //   name: "Eyewear Red",
      //   options: {
      //     displayName: "Eyewear",
      //   }
      // },
      {
        name: "Clothes Red",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      {
        name: "Hats Red",
        options: {
          displayName: "Hats",
        }
      },
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

const text = {/*
  only: false,
  color: "#ffffff",
  size: 20,
  xGap: 40,
  yGap: 40,
  align: "left",
  baseline: "top",
  weight: "regular",
  family: "Courier",
  spacer: " => ",
*/};

const pixelFormat = {
  ratio: 2 / 128,
};

const background = {/*
  generate: false,
  brightness: "70%",
  static: true,
  default: "#0a0a0a",
*/};

const extraMetadata = {
};

const rarityDelimiter = "#";

// Torrance is Tolerance..?
const uniqueDnaTorrance = 10000;

const preview = {/*
  thumbPerRow: 3,
  thumbWidth: 250,
  imageRatio: format.height / format.width,
  imageName: `preview.png`,
*/};

const preview_gif = {/*
  numberOfImages: 20,
  order: `ASC`, // ASC, DESC, MIXED
  repeat: 0,
  quality: 100,
  delay: 500,
  imageName: `preview.gif`,
*/};


module.exports = {
  format,
  baseUri,
  description,
  background,
  uniqueDnaTorrance,
  layerConfigurations,
  rarityDelimiter,
  shuffleLayerConfigurations,
  debugLogs,
  extraMetadata,
  pixelFormat,
  text,
  namePrefix,
  network,
  solanaMetadata,
  // preview,
  // preview_gif,
  gif,
};
