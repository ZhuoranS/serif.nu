import React from 'react';
import { shallow } from 'enzyme';
import { mockStyles } from 'util/testing';
import { UnstyledSidebarView, styles } from './SidebarView';

describe('SidebarView', () => {
  it('renders correctly', () => {
    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledSidebarView
      classes={classes}
    />);

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('changes tabs correctly', () => {
    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledSidebarView
      classes={classes}
    />);
    wrapper.instance().handleChange('onChange', 'browse');

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('changes to cart correctly', () => {
    const classes = mockStyles(styles);
    const wrapper = shallow(<UnstyledSidebarView
      classes={classes}
    />);
    wrapper.instance().handleChange('onChange', 'cart');

    expect(wrapper.get(0)).toMatchSnapshot();
  });
});