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
  themes: [
    { id: 'T1', name: 'Sucette' },
    { id: 'T2', name: 'arc-en-ciel' },
    { id: 'T3', name: 'Pingouin' },
    { id: 'T4', name: 'Mammouth' },
    { id: 'T5', name: 'Espace' },
    { id: 'T6', name: 'Spaghetti' },
    { id: 'T7', name: 'Papier toilette' },
    { id: 'T8', name: 'Cataclysme' },
    { id: 'T9', name: 'Cookie' },
    { id: 'T10', name: 'Chaussette' },
    { id: 'T11', name: 'Abeille' },
    { id: 'T12', name: 'Rococo' },
  ],
  grids: [
    {
      id: 'G1',
      user: 'U1',
      lineThemes: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
      colThemes: ['T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    },
  ],
  hybrids: [
    {
      id: 'H1',
      url: './Images/20200409_174234.jpg',
      tags: ['T6', 'T8'],
      grid: 'G1',
      author: 'U1',
    },
    {
      id: 'H2',
      url: './Images/20200411_112906.jpg',
      tags: ['T11', 'T1'],
      grid: 'G1',
      author: 'U1',
    },
  ],
};

export default defaultState;
