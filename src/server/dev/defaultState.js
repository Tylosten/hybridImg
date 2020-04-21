const defaultState = {
  users: [
    {
      id: 'd57b259a-3ac0-4b7a-acae-b065b79f342f',
      name: 'Mag',
      hash:
        '4ef5304ff8d849daa3a8b60de9310ceb66aa05c4ff78cae27c0d14b2cf20de08f0dce548a5de0e8afcf8b9302504dc2e808c55bd5c4c4c337ef9a3abb8ccb5bf',
      salt: '7823237f4c9a7248802d5ba175fcff53cbb7921c57bdc14d473a9aaa84287a18',
    },
    {
      id: '502a2b88-d099-4a22-841a-b0128ed4b114',
      name: 'Matt',
      hash:
        'b2905b3dfc772f197e83ddce38177f1090abc0592ce2c2f6d7bf35f7c007d7e76e9b5a915a02821979cad2820425b5ae491eb941f917c59f8bea4c027dc542e2',
      salt: '0bc3af2f5bc776d24f3dffb8300b08439c266c3a3b6ea46d70dbf1f9ba20dc82',
    },
  ],
  tags: [
    { id: 'ae3dc87e-aaf9-45ec-b11b-10bc94984f58', name: 'Sucette' },
    { id: '94e01cf2-fc1b-4d36-8126-735cc9b37945', name: 'Arc-en-ciel' },
    { id: 'df3b6902-36d0-4ef1-9c76-da2c3c060761', name: 'Pingouin' },
    { id: '1f187129-b17c-4ad5-8311-27c62c4627d9', name: 'Mammouth' },
    { id: '0c762724-0754-49a5-b9c7-06de9d368df5', name: 'Espace' },
    { id: 'e29be463-cdb4-4264-b5e8-f359ab14a044', name: 'Spaghetti' },
    { id: '9bfedaa6-d713-436f-8ab5-6c716fd454c2', name: 'Papier toilette' },
    { id: '48f9dd67-4f02-4842-8ee5-2750ad6ee649', name: 'Cataclysme' },
    { id: '91fed019-2f89-4323-970d-a8a2e5b830e6', name: 'Cookie' },
    { id: 'f3c06b4f-b9b4-4fda-924e-39b55304cb9b', name: 'Chaussette' },
    { id: '8ca81a5d-16e8-4092-8180-8380189b4761', name: 'Abeille' },
    { id: '67e257ac-f0fd-477c-8f48-0d1b8c96f69f', name: 'Rococo' },
  ],
  grids: [
    {
      id: '8af22e4d-1588-49e1-80d0-fde37b714c93',
      user: 'd57b259a-3ac0-4b7a-acae-b065b79f342f',
      name: 'La grille de Mag',
      lineThemes: [
        'ae3dc87e-aaf9-45ec-b11b-10bc94984f58',
        '94e01cf2-fc1b-4d36-8126-735cc9b37945',
        'df3b6902-36d0-4ef1-9c76-da2c3c060761',
        '1f187129-b17c-4ad5-8311-27c62c4627d9',
        '0c762724-0754-49a5-b9c7-06de9d368df5',
        'e29be463-cdb4-4264-b5e8-f359ab14a044',
      ],
      colThemes: [
        '9bfedaa6-d713-436f-8ab5-6c716fd454c2',
        '48f9dd67-4f02-4842-8ee5-2750ad6ee649',
        '91fed019-2f89-4323-970d-a8a2e5b830e6',
        'f3c06b4f-b9b4-4fda-924e-39b55304cb9b',
        '8ca81a5d-16e8-4092-8180-8380189b4761',
        '67e257ac-f0fd-477c-8f48-0d1b8c96f69f',
      ],
    },
    {
      id: '2819c11e-650a-436f-b2d2-2eff3be3cef4',
      user: '502a2b88-d099-4a22-841a-b0128ed4b114',
      name: 'La grille de Matt',
      lineThemes: [
        'ae3dc87e-aaf9-45ec-b11b-10bc94984f58',
        '94e01cf2-fc1b-4d36-8126-735cc9b37945',
        'df3b6902-36d0-4ef1-9c76-da2c3c060761',
        '1f187129-b17c-4ad5-8311-27c62c4627d9',
        '0c762724-0754-49a5-b9c7-06de9d368df5',
        'e29be463-cdb4-4264-b5e8-f359ab14a044',
      ],
      colThemes: [
        '9bfedaa6-d713-436f-8ab5-6c716fd454c2',
        '48f9dd67-4f02-4842-8ee5-2750ad6ee649',
        '91fed019-2f89-4323-970d-a8a2e5b830e6',
        'f3c06b4f-b9b4-4fda-924e-39b55304cb9b',
        '8ca81a5d-16e8-4092-8180-8380189b4761',
        '67e257ac-f0fd-477c-8f48-0d1b8c96f69f',
      ],
    },
  ],
  hybrids: [
    {
      id: 'f33f77a9-0c4f-4d6e-bb68-f0167eb8964c',
      name: 'Spaghetti/Cataclysme',
      url: './Images/20200409_174234.jpg',
      tags: [
        'e29be463-cdb4-4264-b5e8-f359ab14a044',
        'ae3dc87e-aaf9-45ec-b11b-10bc94984f58',
      ],
      grid: '8af22e4d-1588-49e1-80d0-fde37b714c93',
      user: 'd57b259a-3ac0-4b7a-acae-b065b79f342f',
    },
    {
      id: 'ab38b6e1-8da5-4a14-9538-a53ea2a0b39c',
      name: 'Sucette/Abeille',
      url: './Images/20200411_112906.jpg',
      tags: [
        'e29be463-cdb4-4264-b5e8-f359ab14a044',
        '8ca81a5d-16e8-4092-8180-8380189b4761',
      ],
      grid: '8af22e4d-1588-49e1-80d0-fde37b714c93',
      user: 'd57b259a-3ac0-4b7a-acae-b065b79f342f',
    },
    {
      id: '4c4bf18d-370a-4bd1-9678-6beeba5c9ba4',
      name: 'Spaghetti/Cataclysme',
      url: './Images/20200409_174234.jpg',
      tags: [
        'e29be463-cdb4-4264-b5e8-f359ab14a044',
        'ae3dc87e-aaf9-45ec-b11b-10bc94984f58',
      ],
      grid: '2819c11e-650a-436f-b2d2-2eff3be3cef4',
      user: '502a2b88-d099-4a22-841a-b0128ed4b114',
    },
    {
      id: 'e6158a33-7868-48c3-8dcd-17f5efb80e15',
      name: 'Sucette/Abeille',
      url: './Images/20200411_112906.jpg',
      tags: [
        'e29be463-cdb4-4264-b5e8-f359ab14a044',
        '8ca81a5d-16e8-4092-8180-8380189b4761',
      ],
      grid: '2819c11e-650a-436f-b2d2-2eff3be3cef4',
      user: '502a2b88-d099-4a22-841a-b0128ed4b114',
    },
  ],
};
export default defaultState;
