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
        lineThemes: [
          { id: 'T1' },
          { id: 'T2' },
          { id: 'T3' },
          { id: 'T4' },
          { id: 'T5' },
          { id: 'T6' },
        ],
        colThemes: [
          { id: 'T7' },
          { id: 'T8' },
          { id: 'T9' },
          { id: 'T10' },
          { id: 'T11' },
          { id: 'T12' },
        ],
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
