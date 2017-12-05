import * as types from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';

export const loadAuthorsSuccess = (authors) => {
  return {
    type: types.LOAD_AUTHORS_SUCCESS,
    authors
  };
};

export const loadAuthors = () => {
  return (dispatch => {
    return AuthorApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(error => {
      throw(error);
    });
  });
};
