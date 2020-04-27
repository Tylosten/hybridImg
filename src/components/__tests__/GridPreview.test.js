import React from 'react';
import { StaticRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import { GridPreview } from '../GridPreview';

describe('GridPreview', () => {
  it('renders correctly', () => {
    const props = {
      grid: {
        id: 'G1',
        user: 'U1',
        name: 'La grille de Mag',
        lineThemes: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
        colThemes: ['T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
      },
      user: { id: 'u1', name: 'Mag' },
      users: [{ id: 'u1', name: 'Mag' }, { id: 'u2', name: 'Matt' }],
    };
    const tree = renderer
      .create(
        <StaticRouter>
          <GridPreview {...props} />
        </StaticRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
