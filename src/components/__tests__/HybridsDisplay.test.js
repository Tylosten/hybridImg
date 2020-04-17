import React from 'react';
import { shallow } from 'enzyme';
import { HybridsDisplay } from '../HybridsDisplay';

describe('HybridsDisplay', () => {
  it('renders correctly', () => {
    const props = {
      hybrids: [{ id: 'H1' }, { id: 'H2' }],
    };
    const wrapper = shallow(<HybridsDisplay {...props} />);
    expect(wrapper.children().length).toBe(2);
    expect(wrapper).toMatchSnapshot();
  });
});
