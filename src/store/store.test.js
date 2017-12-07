import expect from 'expect';
import { createStore } from 'redux';
import initialState from '../reducers/initialState';
import rootReducer from '../reducers';
import * as actions from '../actions/courseActions';

describe('Store', () => {
  it('Should handle creating courses', () => {
    const store = createStore(rootReducer, initialState);
    const course = {
      title: 'Clean Code'
    };

    const action = actions.createCourseSuccess(course);
    store.dispatch(action);

    const actual = store.getState().courses[0];
    const expected = {
      title: 'Clean Code'
    };

    expect(actual).toEqual(expected);
  });
});
