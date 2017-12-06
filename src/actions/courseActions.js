import * as types from './actionTypes';
import CourseApi from '../api/mockCourseApi';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';

export const loadCoursesSuccess = (courses) => {
  return {
    type: types.LOAD_COURSES_SUCCESS,
    courses
  };
};

export const createCourseSuccess = (course) => {
  return {
    type: types.CREATE_COURSE_SUCCESS,
    course
  };
};

export const updateCourseSuccess = (course) => {
  return {
    type: types.UPDATE_COURSE_SUCCESS,
    course
  };
};

export const loadCourses = () => {
  return (dispatch => {
    dispatch(beginAjaxCall());
    return CourseApi.getAllCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  });
};

export const saveCourse = (course) => {
  return (dispatch => {
    dispatch(beginAjaxCall());
    return CourseApi.saveCourse(course).then(course => {
      course.id ? dispatch(updateCourseSuccess(course)) :
        dispatch(createCourseSuccess(course));
    }).catch(error => {
      dispatch(ajaxCallError());
      throw(error);
    });
  });
};
