const defaultState = {
  users: [
    {
      id: '667d4706-2371-4af8-b132-748a5911625e',
      name: 'Mag',
      hash:
        '6afaad370c765d7916e19251f9793f83f0f05b484762274dc2f0f44b77c6d460ea0f7078b188add8c11ce64755951d0109d721f1a6d522377729e57200fd8848',
      salt: 'e61707d1bf21dd491a583f285461bbfe9475805454c88975d2220cc792e6e60a',
    },
    {
      id: '7d7accf5-b370-43b1-871c-677c7826d752',
      name: 'Matt',
      hash:
        'e784c02fa4cf7e19a7d85dcddcd83c46f111d6e51f979c5f60d2a9ca23985ec5286834756b5d311e3c147c9432a308d8b802e0344a6993df8b2c11b815bca343',
      salt: 'fbfa5a85791dc563c33f8af8a68c4c0275efa5787d9da97436495e03e6712fb8',
    },
  ],
  tags: [
    { id: 'fb5de8a7-fbae-49ba-ba30-13690efab270', name: 'Sucette' },
    { id: '34b30732-fb30-4749-85f1-3df848594f1a', name: 'Arc-en-ciel' },
    { id: '71f6562e-ed10-4763-a9a1-919b0ae3866d', name: 'Pingouin' },
    { id: '95e7ce19-f1cc-4458-beb4-42c30ffa7f92', name: 'Mammouth' },
    { id: '988aff4f-c26f-455e-abaa-42210f0ea379', name: 'Espace' },
    { id: 'a6c885a8-23aa-4197-ba14-be81b6e5ea12', name: 'Spaghetti' },
    { id: 'dc17ee01-667f-43ec-935f-68d2640354d5', name: 'Papier toilette' },
    { id: '81872cf8-8e7d-4582-90d6-7796a9557af5', name: 'Cataclysme' },
    { id: 'c9820d65-91ef-4105-bd42-09a2bb5be2ee', name: 'Cookie' },
    { id: 'b576b941-d297-4c0d-98bb-25c6a09621ec', name: 'Chaussette' },
    { id: 'a0cde182-d09e-461a-a577-d21d540615f4', name: 'Abeille' },
    { id: '0b4f73a2-691d-4b9d-91f8-469dd9fe34ee', name: 'Rococo' },
  ],
  templates: [
    {
      id: '9f6ac09a-5e08-4390-bde6-a316d5ef2d7b',
      name: 'Let\'s Rococo',
      user: '667d4706-2371-4af8-b132-748a5911625e',
      lineThemes: [
        'fb5de8a7-fbae-49ba-ba30-13690efab270',
        '34b30732-fb30-4749-85f1-3df848594f1a',
        '71f6562e-ed10-4763-a9a1-919b0ae3866d',
        '95e7ce19-f1cc-4458-beb4-42c30ffa7f92',
        '988aff4f-c26f-455e-abaa-42210f0ea379',
        'a6c885a8-23aa-4197-ba14-be81b6e5ea12',
      ],
      colThemes: [
        'dc17ee01-667f-43ec-935f-68d2640354d5',
        '81872cf8-8e7d-4582-90d6-7796a9557af5',
        'c9820d65-91ef-4105-bd42-09a2bb5be2ee',
        'b576b941-d297-4c0d-98bb-25c6a09621ec',
        'a0cde182-d09e-461a-a577-d21d540615f4',
        '0b4f73a2-691d-4b9d-91f8-469dd9fe34ee',
      ],
    },
  ],
  grids: [
    {
      id: '31695352-254e-4db8-abf0-2dd425366f88',
      user: '667d4706-2371-4af8-b132-748a5911625e',
      name: 'La grille de Mag',
      template: '9f6ac09a-5e08-4390-bde6-a316d5ef2d7b',
    },
    {
      id: '1daea9d3-6d2f-4efc-b2c9-99c78415b3a3',
      user: '7d7accf5-b370-43b1-871c-677c7826d752',
      name: 'La grille de Matt',
      template: '9f6ac09a-5e08-4390-bde6-a316d5ef2d7b',
    },
  ],
};
export default defaultState;
