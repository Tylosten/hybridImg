import React from 'react';
import { shallow } from 'enzyme';
import { HybridsDisplay } from '../HybridsDisplay';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-hook parts
  useLocation: () => ({
    search: '',
  }),
}));

describe('HybridsDisplay', () => {
  it('renders correctly', () => {
    const props = {
      hybrids: [{ id: 'H1' }, { id: 'H2' }],
    };
    const wrapper = shallow(<HybridsDisplay {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
