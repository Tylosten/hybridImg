import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { HybridDisplay } from '../HybridDisplay';

import renderer from 'react-test-renderer';

describe('HybridDisplay', () => {
  it('renders correctly', () => {
    const props = {
      hybrid: {
        id: 'H1',
        name: 'Spaghetti/Cataclysme',
        url: './Images/20200409_174234.jpg',
        tags: [
          { id: 'T1', name: 'Sucette' },
          { id: 'T2', name: 'Arc-en-ciel' },
        ],
        grid: 'G1',
        user: 'U1',
      },
    };
    const tree = renderer
      .create(
        <StaticRouter>
          <HybridDisplay {...props} />
          <HybridDisplay {...props} hideLabels />
        </StaticRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
