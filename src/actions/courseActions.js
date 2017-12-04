import * as types from './actionTypes';
import CourseApi from '../api/mockCourseApi';

export const loadCoursesSuccess = (courses) => {
  return {
    type: types.LOAD_COURSES_SUCCESS,
    courses
  };
};

export const loadCourses = () => {
  return (dispatch => {
    return CourseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      throw(error);
    });
  });
};
