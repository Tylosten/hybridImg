import React from 'react';
import { shallow } from 'enzyme';

import { GridDisplay } from '../GridDisplay';

describe('GridDisplay', () => {
  it('renders correctly', () => {
    const props = {
      grid: {
        id: 'G1',
        name: 'La grille de Mag',
        lineThemes: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
        colThemes: ['T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
      },
      users: [{ id: 'u1', name: 'Mag' }, { id: 'u2', name: 'Matt' }],
      edit: true,
    };
    const wrapper = shallow(<GridDisplay {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
