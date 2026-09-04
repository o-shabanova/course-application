import { getAuthors } from '../../services';
import { setAuthors, Author } from './authorsSlice';
import type { AppDispatch } from '..';

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
