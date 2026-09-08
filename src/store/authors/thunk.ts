import { createAuthor, getAuthors } from '../../services';
import { addAuthor, setAuthors, Author } from './authorsSlice';
import type { AppDispatch, RootState } from '..';

export const loadAuthors = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const authors = await getAuthors<Author>();
      dispatch(setAuthors(authors));
    } catch (error) {
      console.error('Failed to fetch authors:', error);
    }
  };
};

export const createAuthorThunk = (name: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().user.token || localStorage.getItem('token') || '';

    try {
      const author = await createAuthor<Author>({ name }, token);
      dispatch(addAuthor(author));
      return true;
    } catch (error) {
      console.error('Failed to create author:', error);
      return false;
    }
  };
};
