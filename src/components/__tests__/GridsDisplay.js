import React from 'react';
import { shallow } from 'enzyme';

import { GridsDisplay } from '../GridsDisplay';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useLocation: () => ({
    search: '',
  }),
}));

describe('GridsDisplay', () => {
  it('renders correctly', () => {
    const props = {
      grids: [{ id: 'G1' }, { id: 'G2' }],
      users: [{ id: 'u1', name: 'Mag' }, { id: 'u2', name: 'Matt' }],
    };
    const wrapper = shallow(<GridsDisplay {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
