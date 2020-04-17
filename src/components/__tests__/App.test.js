import React from 'react';
import { StaticRouter } from 'react-router-dom';

import { App } from '../App';

import renderer from 'react-test-renderer';

describe('App', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <StaticRouter>
          <App initialData={{ appName: 'TEST' }} />
        </StaticRouter>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
