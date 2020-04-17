import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { HybridDetails } from '../HybridDetails';

import renderer from 'react-test-renderer';

describe('HybridDetails', () => {
  it('renders correctly', () => {
    const tags = [
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
    ];
    const grids = [
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
    ];
    const hybrid = {
      id: 'H1',
      name: 'Spaghetti/Cataclysme',
      url: './Images/20200409_174234.jpg',
      tags: [{ id: 'T1', name: 'Sucette' }, { id: 'T2', name: 'Arc-en-ciel' }],
      grid: 'G1',
      user: 'U1',
    };
    const props = {
      hybrid,
      tags,
      grids,
    };
    const tree = renderer
      .create(
        <StaticRouter>
          <HybridDetails {...props} />
        </StaticRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
