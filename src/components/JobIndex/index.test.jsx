import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';

import store from '../../store';
import JobIndex from '.';

describe('<JobIndex />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Provider store={store}><JobIndex /></Provider>);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('displays the page name', () => {
    expect(wrapper).toIncludeText('My Favorite Job Offers');
  });
});
