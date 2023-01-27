const basePath = process.cwd();
const { MODE } = require(`${basePath}/constants/blend_mode.js`);
const { NETWORK } = require(`${basePath}/constants/network.js`);

// if network is solana, then collection starts from 0 automatically
const network = NETWORK.sol;

const layerConfigurations_GREEN = [
  /**
   * GREEN Special
   */
  /*{
    growEditionSizeTo: 10,
    layersOrder: [
      {
        name: "GREEN BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "GREEN SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "GREEN MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "GREEN EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "GREEN BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      // {
      //   name: "GREEN EYEWEAR",
      //   options: {
      //     displayName: "Eyewear",
      //   }
      // },
      {
        name: "GREEN SPECIAL CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HAT
      {
        name: "GREEN SPECIAL HAT",
        options: {
          displayName: "Hat",
        }
      },
    ],
  },
  {
    growEditionSizeTo: 20,
    layersOrder: [
      {
        name: "GREEN BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "GREEN SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "GREEN MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "GREEN EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "GREEN BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      {
        name: "GREEN EYEWEAR",
        options: {
          displayName: "Eyewear",
        }
      },
      {
        name: "GREEN CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HAT
      {
        name: "GREEN SPECIAL HAT",
        options: {
          displayName: "Hat",
        }
      },
    ],
  },
  {
    growEditionSizeTo: 30,
    layersOrder: [
      {
        name: "GREEN BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "GREEN SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "GREEN MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "GREEN EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "GREEN BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      {
        name: "GREEN EYEWEAR",
        options: {
          displayName: "Eyewear",
        }
      },
      {
        name: "GREEN SPECIAL CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "GREEN SPECIAL HAT",
      //   options: {
      //     displayName: "Hat",
      //   }
      // },
    ],
  },
  {
    growEditionSizeTo: 50,
    layersOrder: [
      {
        name: "GREEN BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "GREEN SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "GREEN MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "GREEN EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "GREEN BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      {
        name: "GREEN SPECIAL CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "GREEN SPECIAL HAT",
      //   options: {
      //     displayName: "Hat",
      //   }
      // },
    ],
  },
  {
    growEditionSizeTo: 100,
    layersOrder: [
      {
        name: "GREEN BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "GREEN SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "GREEN MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "GREEN EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "GREEN BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      // {
      //   name: "GREEN SPECIAL CLOTHES",
      //   options: {
      //     displayName: "Clothes",
      //   }
      // },
      {
        name: "GREEN CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      {
        name: "GREEN SPECIAL HAT",
        options: {
          displayName: "Hat",
        }
      },
    ],
  },
  {
    growEditionSizeTo: 110,
    layersOrder: [
      {
        name: "GREEN BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "GREEN SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "GREEN MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "GREEN EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "GREEN BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      {
        name: "GREEN CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // {
      //   name: "GREEN SPECIAL NECKWEAR",
      //   options: {
      //     displayName: "Neckwear",
      //   }
      // },
      // HATS
      {
        name: "GREEN SPECIAL HAT",
        options: {
          displayName: "Hat",
        }
      },
    ],
  },*/

  /**
   * GREEN No EYEWEAR, No HAT
   */
  {
    growEditionSizeTo: 750,
    layersOrder: [
      {
        name: "GREEN BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "GREEN SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "GREEN MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "GREEN EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "GREEN BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      {
        name: "GREEN CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "GREEN HAT",
      //   options: {
      //     displayName: "Hat",
      //   }
      // },
    ],
  },

  /**
   * GREEN w EYEWEAR, No HAT
   */
  {
    growEditionSizeTo: 1000,
    layersOrder: [
      {
        name: "GREEN BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "GREEN SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "GREEN MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "GREEN EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "GREEN BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      {
        name: "GREEN EYEWEAR",
        options: {
          displayName: "Eyewear",
        }
      },
      {
        name: "GREEN CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "GREEN HAT",
      //   options: {
      //     displayName: "Hat",
      //   }
      // },
    ],
  },
  {
    growEditionSizeTo: 1350,
    layersOrder: [
      {
        name: "GREEN BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "GREEN SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "GREEN MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "GREEN EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "GREEN BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      {
        name: "GREEN EYEWEAR",
        options: {
          displayName: "Eyewear",
        }
      },
      {
        name: "GREEN CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "GREEN HAT",
      //   options: {
      //     displayName: "Hat",
      //   }
      // },
    ],
  },
  {
    growEditionSizeTo: 1450,
    layersOrder: [
      {
        name: "GREEN BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "GREEN SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "GREEN MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "GREEN EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "GREEN BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      {
        name: "GREEN EYEWEAR",
        options: {
          displayName: "Eyewear",
        }
      },
      {
        name: "GREEN CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "GREEN HAT",
      //   options: {
      //     displayName: "Hat",
      //   }
      // },
    ],
  },
  {
    growEditionSizeTo: 1550,
    layersOrder: [
      {
        name: "GREEN BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "GREEN SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "GREEN MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "GREEN EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "GREEN BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      {
        name: "GREEN EYEWEAR",
        options: {
          displayName: "Eyewear",
        }
      },
      {
        name: "GREEN CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "GREEN HAT",
      //   options: {
      //     displayName: "Hat",
      //   }
      // },
    ],
  },

  /**
   * GREEN No EYEWEAR, w HAT
   */
  {
    growEditionSizeTo: 1650,
    layersOrder: [
      {
        name: "GREEN BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "GREEN SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "GREEN MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "GREEN EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "GREEN BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      // {
      //   name: "GREEN EYEWEAR",
      //   options: {
      //     displayName: "Eyewear",
      //   }
      // },
      {
        name: "GREEN CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      {
        name: "GREEN HAT",
        options: {
          displayName: "Hat",
        }
      },
    ],
  },
  {
    growEditionSizeTo: 1750,
    layersOrder: [
      {
        name: "GREEN BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "GREEN SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "GREEN MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "GREEN EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "GREEN BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      // {
      //   name: "GREEN EYEWEAR",
      //   options: {
      //     displayName: "Eyewear",
      //   }
      // },
      {
        name: "GREEN CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      {
        name: "GREEN HAT",
        options: {
          displayName: "Hat",
        }
      },
    ],
  },
  {
    growEditionSizeTo: 1850,
    layersOrder: [
      {
        name: "GREEN BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "GREEN SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "GREEN MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "GREEN EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "GREEN BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      // {
      //   name: "GREEN EYEWEAR",
      //   options: {
      //     displayName: "Eyewear",
      //   }
      // },
      {
        name: "GREEN CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      {
        name: "GREEN HAT",
        options: {
          displayName: "Hat",
        }
      },
    ],
  },
  {
    growEditionSizeTo: 1950,
    layersOrder: [
      {
        name: "GREEN BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "GREEN SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "GREEN MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "GREEN EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "Brows Red",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      // {
      //   name: "Eyewear Red",
      //   options: {
      //     displayName: "Eyewear",
      //   }
      // },
      {
        name: "GREEN CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      {
        name: "GREEN HAT",
        options: {
          displayName: "Hat",
        }
      },
    ],
  },
];

const layerConfigurations_YELLOW = [
  /**
   * YELLOW No EYEWEAR, No HAT
   */
  {
    growEditionSizeTo: 750,
    layersOrder: [
      {
        name: "YELLOW BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "YELLOW SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "YELLOW MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "YELLOW EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "YELLOW BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      {
        name: "YELLOW CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "YELLOW HAT",
      //   options: {
      //     displayName: "Hat",
      //   }
      // },
    ],
  },

  /**
   * YELLOW w EYEWEAR, No HAT
   */
  {
    growEditionSizeTo: 1000,
    layersOrder: [
      {
        name: "YELLOW BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "YELLOW SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "YELLOW MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "YELLOW EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "YELLOW BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      {
        name: "YELLOW EYEWEAR",
        options: {
          displayName: "Eyewear",
        }
      },
      {
        name: "YELLOW CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "YELLOW HAT",
      //   options: {
      //     displayName: "Hat",
      //   }
      // },
    ],
  },
  {
    growEditionSizeTo: 1350,
    layersOrder: [
      {
        name: "YELLOW BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "YELLOW SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "YELLOW MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "YELLOW EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "YELLOW BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      {
        name: "YELLOW EYEWEAR",
        options: {
          displayName: "Eyewear",
        }
      },
      {
        name: "YELLOW CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "YELLOW HAT",
      //   options: {
      //     displayName: "Hat",
      //   }
      // },
    ],
  },
  {
    growEditionSizeTo: 1450,
    layersOrder: [
      {
        name: "YELLOW BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "YELLOW SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "YELLOW MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "YELLOW EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "YELLOW BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      {
        name: "YELLOW EYEWEAR",
        options: {
          displayName: "Eyewear",
        }
      },
      {
        name: "YELLOW CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "YELLOW HAT",
      //   options: {
      //     displayName: "Hat",
      //   }
      // },
    ],
  },
  {
    growEditionSizeTo: 1550,
    layersOrder: [
      {
        name: "YELLOW BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "YELLOW SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "YELLOW MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "YELLOW EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "YELLOW BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      {
        name: "YELLOW EYEWEAR",
        options: {
          displayName: "Eyewear",
        }
      },
      {
        name: "YELLOW CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "YELLOW HAT",
      //   options: {
      //     displayName: "Hat",
      //   }
      // },
    ],
  },

  /**
   * YELLOW No EYEWEAR, w HAT
   */
  {
    growEditionSizeTo: 1650,
    layersOrder: [
      {
        name: "YELLOW BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "YELLOW SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "YELLOW MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "YELLOW EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "YELLOW BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      // {
      //   name: "YELLOW EYEWEAR",
      //   options: {
      //     displayName: "Eyewear",
      //   }
      // },
      {
        name: "YELLOW CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      {
        name: "YELLOW HAT",
        options: {
          displayName: "Hat",
        }
      },
    ],
  },
  {
    growEditionSizeTo: 1750,
    layersOrder: [
      {
        name: "YELLOW BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "YELLOW SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "YELLOW MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "YELLOW EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "YELLOW BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      // {
      //   name: "YELLOW EYEWEAR",
      //   options: {
      //     displayName: "Eyewear",
      //   }
      // },
      {
        name: "YELLOW CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      {
        name: "YELLOW HAT",
        options: {
          displayName: "Hat",
        }
      },
    ],
  },
  {
    growEditionSizeTo: 1850,
    layersOrder: [
      {
        name: "YELLOW BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "YELLOW SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "YELLOW MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "YELLOW EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "YELLOW BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      // {
      //   name: "YELLOW EYEWEAR",
      //   options: {
      //     displayName: "Eyewear",
      //   }
      // },
      {
        name: "YELLOW CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      {
        name: "YELLOW HAT",
        options: {
          displayName: "Hat",
        }
      },
    ],
  },
  {
    growEditionSizeTo: 1950,
    layersOrder: [
      {
        name: "YELLOW BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "YELLOW SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "YELLOW MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "YELLOW EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "Brows Red",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      // {
      //   name: "Eyewear Red",
      //   options: {
      //     displayName: "Eyewear",
      //   }
      // },
      {
        name: "YELLOW CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      {
        name: "YELLOW HAT",
        options: {
          displayName: "Hat",
        }
      },
    ],
  },
];

const layerConfigurations_BLUE = [
  /**
   * BLUE No EYEWEAR, No HAT
   */
  {
    growEditionSizeTo: 750,
    layersOrder: [
      {
        name: "BLUE BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "BLUE SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "BLUE MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "BLUE EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "BLUE BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      {
        name: "BLUE CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "BLUE HAT",
      //   options: {
      //     displayName: "Hat",
      //   }
      // },
    ],
  },

  /**
   * BLUE w EYEWEAR, No HAT
   */
  {
    growEditionSizeTo: 1000,
    layersOrder: [
      {
        name: "BLUE BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "BLUE SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "BLUE MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "BLUE EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "BLUE BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      {
        name: "BLUE EYEWEAR",
        options: {
          displayName: "Eyewear",
        }
      },
      {
        name: "BLUE CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "BLUE HAT",
      //   options: {
      //     displayName: "Hat",
      //   }
      // },
    ],
  },
  {
    growEditionSizeTo: 1350,
    layersOrder: [
      {
        name: "BLUE BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "BLUE SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "BLUE MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "BLUE EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "BLUE BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      {
        name: "BLUE EYEWEAR",
        options: {
          displayName: "Eyewear",
        }
      },
      {
        name: "BLUE CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "BLUE HAT",
      //   options: {
      //     displayName: "Hat",
      //   }
      // },
    ],
  },
  {
    growEditionSizeTo: 1450,
    layersOrder: [
      {
        name: "BLUE BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "BLUE SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "BLUE MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "BLUE EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "BLUE BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      {
        name: "BLUE EYEWEAR",
        options: {
          displayName: "Eyewear",
        }
      },
      {
        name: "BLUE CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "BLUE HAT",
      //   options: {
      //     displayName: "Hat",
      //   }
      // },
    ],
  },
  {
    growEditionSizeTo: 1550,
    layersOrder: [
      {
        name: "BLUE BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "BLUE SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "BLUE MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "BLUE EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "BLUE BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      {
        name: "BLUE EYEWEAR",
        options: {
          displayName: "Eyewear",
        }
      },
      {
        name: "BLUE CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      // {
      //   name: "BLUE HAT",
      //   options: {
      //     displayName: "Hat",
      //   }
      // },
    ],
  },

  /**
   * BLUE No EYEWEAR, w HAT
   */
  {
    growEditionSizeTo: 1650,
    layersOrder: [
      {
        name: "BLUE BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "BLUE SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "BLUE MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "BLUE EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "BLUE BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      // {
      //   name: "BLUE EYEWEAR",
      //   options: {
      //     displayName: "Eyewear",
      //   }
      // },
      {
        name: "BLUE CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      {
        name: "BLUE HAT",
        options: {
          displayName: "Hat",
        }
      },
    ],
  },
  {
    growEditionSizeTo: 1750,
    layersOrder: [
      {
        name: "BLUE BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "BLUE SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "BLUE MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "BLUE EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "BLUE BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      // {
      //   name: "BLUE EYEWEAR",
      //   options: {
      //     displayName: "Eyewear",
      //   }
      // },
      {
        name: "BLUE CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      {
        name: "BLUE HAT",
        options: {
          displayName: "Hat",
        }
      },
    ],
  },
  {
    growEditionSizeTo: 1850,
    layersOrder: [
      {
        name: "BLUE BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "BLUE SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "BLUE MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "BLUE EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "BLUE BROWS",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      // {
      //   name: "BLUE EYEWEAR",
      //   options: {
      //     displayName: "Eyewear",
      //   }
      // },
      {
        name: "BLUE CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      {
        name: "BLUE HAT",
        options: {
          displayName: "Hat",
        }
      },
    ],
  },
  {
    growEditionSizeTo: 1950,
    layersOrder: [
      {
        name: "BLUE BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "BLUE SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "BLUE MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      // EYES
      {
        name: "BLUE EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      // BROWS
      // {
      //   name: "Brows Red",
      //   options: {
      //     displayName: "Brows",
      //   }
      // },
      // EYEWEAR
      // {
      //   name: "Eyewear Red",
      //   options: {
      //     displayName: "Eyewear",
      //   }
      // },
      {
        name: "BLUE CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      // HATS
      {
        name: "BLUE HAT",
        options: {
          displayName: "Hat",
        }
      },
    ],
  },
];

const layerConfigurations_RED = [
  
  /**
   * RED RUN 1
   */
  {
    growEditionSizeTo: 1237,
    layersOrder: [
      {
        name: "RED BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "RED SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "RED FACE",
        options: {
          displayName: "Face",
        }
      },
      {
        name: "RED EYEWEAR",
        options: {
          displayName: "Eyewear",
        }
      },
      {
        name: "RED CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
      {
        name: "RED HEAD",
        options: {
          displayName: "Head",
        }
      },
    ],
  },

];

const layerConfigurations_BASED = [
  {
    growEditionSizeTo: 1,
    layersOrder: [
      {
        name: "BASED BLUE",
        options: {
          displayName: "Skin",
        }
      },
    ],
  },
  {
    growEditionSizeTo: 2,
    layersOrder: [
      {
        name: "BASED GREEN",
        options: {
          displayName: "Skin",
        }
      },
    ],
  },
  {
    growEditionSizeTo: 3,
    layersOrder: [
      {
        name: "BASED RED",
        options: {
          displayName: "Skin",
        }
      },
    ],
  },
  {
    growEditionSizeTo: 4,
    layersOrder: [
      {
        name: "BASED YELLOW",
        options: {
          displayName: "Skin",
        }
      },
    ],
  },
];

const layerConfigurations_TEST = [
  {
    growEditionSizeTo: 5,
    layersOrder: [
      {
        name: "GREEN BACKGROUND",
        options: {
          displayName: "Background",
        }
      },
      {
        name: "GREEN SKIN",
        options: {
          displayName: "Skin",
        }
      },
      {
        name: "GREEN MOUTH",
        options: {
          displayName: "Mouth",
        }
      },
      {
        name: "GREEN EYES EYELID BOTTOM",
        options: {
          displayName: "Eyes",
        }
      },
      {
        name: "GREEN CLOTHES",
        options: {
          displayName: "Clothes",
        }
      },
    ],
  },
];

const layerConfigurations = layerConfigurations_BASED;
// const layerConfigurations = layerConfigurations_RED;
// const layerConfigurations = layerConfigurations_BLUE;
// const layerConfigurations = layerConfigurations_GREEN;
// const layerConfigurations = layerConfigurations_YELLOW;
// const layerConfigurations = layerConfigurations_TEST;

const layer_config = {
  shuffle: false,
  rarity_delimiter: "#",
  // torrance.. is tolerance..?
  unique_dna_torrance: 10000,
  
  format: {
    // TODO: how large of format do we want to generate artwork for?
    width: 1024,
    height: 1024,
    smoothing: true,
  },

  pixel_format: {
    ratio: 2 / 128,
  },
};

const storage_config = {
  upload: true,
};

const metadata_config = {
  name_prefix: 'BB',
  description: 'BBs',
  base_uri: 'ipfs://<NewUriToReplace>',
  extra_metadata: {
  },
  solana: {
    symbol: 'BB',
    seller_fee_basis_points: 999, // Define how much % you want from secondary market sales 1000 = 10%
    external_url: 'https://www.bb.social',
    collection: { name: 'BBs' },
    creators: [
      {
        address: '2UV6yqyEkgEfeptupzWq84sx5B9sZXeMYgHnJpFVNCgE',
        share: 100,
      },
    ],
  },
};

const debugLogs = true;

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

const background = {/*
  generate: false,
  brightness: "70%",
  static: true,
  default: "#0a0a0a",
*/};

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
  layerConfigurations,
  layer_config,
  storage_config,
  metadata_config,
  debugLogs,
  network,
  background,
  text,
  // preview,
  // preview_gif,
  gif,
};
