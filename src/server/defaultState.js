const defaultState = {
  users: [
    {
      id: 'U1',
      name: 'Mag',
    },
    {
      id: 'U2',
      name: 'Matt',
    },
  ],
  lineThemes: [
    'Sucette',
    'arc-en-ciel',
    'Pingouin',
    'Mammouth',
    'Espace',
    'Spaghetti',
  ],
  colThemes: [
    'Papier toilette',
    'Cataclysme',
    'Cookie',
    'Chaussette',
    'Abeille',
    'Rococo',
  ],
  hybrids: [
    {
      id: 'H1',
      url: './Images/20200409_174234.jpg',
      tags: ['Spaghetti', 'Cataclysme'],
      author: 'U1',
    },
    {
      id: 'H2',
      url: './Images/20200411_112906.jpg',
      tags: ['Abeille', 'Sucette'],
      author: 'U1',
    },
  ],
};

export default defaultState;
