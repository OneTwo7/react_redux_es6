import { CREATE_COURSE } from './actionTypes';

export const createCourse = (course) => {
  return {
    type: CREATE_COURSE,
    course
  };
};
