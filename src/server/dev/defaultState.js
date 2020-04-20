import { genPassword } from '../lib/passwordUtils';

const defaultState = {
  users: [
    {
      id: 'U1',
      name: 'Mag',
      ...genPassword('ILoveCat'),
    },
    {
      id: 'U2',
      name: 'Matt',
      ...genPassword('ILoveDog'),
    },
  ],
  tags: [
    { id: 'T1', name: 'Sucette' },
    { id: 'T2', name: 'Arc-en-ciel' },
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
      name: 'La grille de Mag',
      lineThemes: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
      colThemes: ['T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    },
    {
      id: 'G2',
      user: 'U2',
      name: 'La grille de Matt',
      lineThemes: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
      colThemes: ['T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    },
    {
      id: 'G3',
      user: 'U1',
      name: 'La grille de Mag 1',
      lineThemes: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
      colThemes: ['T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    },
    {
      id: 'G4',
      user: 'U2',
      name: 'La grille de Matt',
      lineThemes: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
      colThemes: ['T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    },
    {
      id: 'G5',
      user: 'U1',
      name: 'La grille de Mag 2',
      lineThemes: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
      colThemes: ['T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    },
    {
      id: 'G6',
      user: 'U2',
      name: 'La grille de Matt',
      lineThemes: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
      colThemes: ['T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
    },
  ],
  hybrids: [
    {
      id: 'H1',
      name: 'Spaghetti/Cataclysme',
      url: './Images/20200409_174234.jpg',
      tags: ['T6', 'T8'],
      grid: 'G1',
      user: 'U1',
    },
    {
      id: 'H2',
      name: 'Sucette/Abeille',
      url: './Images/20200411_112906.jpg',
      tags: ['T11', 'T1'],
      grid: 'G1',
      user: 'U1',
    },
  ],
};

export default defaultState;
