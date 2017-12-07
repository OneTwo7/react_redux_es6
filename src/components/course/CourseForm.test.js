import React from 'react';
import expect from 'expect';
import { mount, shallow } from 'enzyme';
import CourseForm from './CourseForm';

const setup = (loading) => {
  let props = {
    course: {},
    loading: loading,
    errors: {},
    onChange: () => {},
    onSave: () => {}
  };

  return shallow(<CourseForm {...props} />);
};

describe('CourseForm via React Test Utils', () => {
  it('renders form and h1', () => {
    const wrapper = setup(false);
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h1').text()).toEqual('Manage Course');
  });

  it('save button is labeled "Save" when not saving', () => {
    const wrapper = setup(false);
    expect(wrapper.find('input').props().value).toBe('Save');
  });

  it('save button is labeled "Saving..." when saving', () => {
    const wrapper = setup(true);
    expect(wrapper.find('input').props().value).toBe('Saving...');
  });
});
