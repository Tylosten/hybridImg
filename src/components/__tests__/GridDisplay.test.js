import React from 'react';
import { shallow } from 'enzyme';

import { GridDisplay } from '../GridDisplay';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useLocation: () => ({
    search: '',
  }),
  useHistory: () => ({
    push: () => {},
  }),
}));

describe('GridDisplay', () => {
  it('renders correctly', () => {
    const props = {
      grid: {
        id: 'G1',
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
      users: [{ id: 'u1', name: 'Mag' }, { id: 'u2', name: 'Matt' }],
      edit: true,
    };
    const wrapper = shallow(<GridDisplay {...props} />);

    expect(wrapper).toMatchSnapshot();
  });
});
