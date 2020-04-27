import React from 'react';
import { shallow } from 'enzyme';

import { GridsDisplay } from '../GridsDisplay';

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
