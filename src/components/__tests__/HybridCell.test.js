import React from 'react';
import { StaticRouter } from 'react-router-dom';
import { HybridCell } from '../HybridCell';

import renderer from 'react-test-renderer';

describe('HybridCell', () => {
  it('renders correctly', () => {
    const tags = [{ id: 'T1', name: 'T1' }, { id: 'T2', name: 'T2' }];
    const props = {
      edit: false,
      grid: 'G1',
      line: tags[0],
      col: tags[1],
    };
    const props2 = { ...props, edit: true };
    const props3 = {
      ...props,
      hybrid: {
        id: 'H1',
        name: 'Spaghetti/Cataclysme',
        url: './Images/20200409_174234.jpg',
        tags: tags,
        grid: 'G1',
        user: 'U1',
      },
    };
    const props4 = { ...props3, edit: true };
    const tree = renderer
      .create(
        <StaticRouter>
          <HybridCell {...props} />
          <HybridCell {...props2} />
          <HybridCell {...props3} />
          <HybridCell {...props4} />
        </StaticRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
