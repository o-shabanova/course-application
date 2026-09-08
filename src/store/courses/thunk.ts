import { deleteCourseById, getCourses } from '../../services';
import { deleteCourse, setCourses, Course } from './coursesSlice';
import type { AppDispatch, RootState } from '..';

export const loadCourses = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const courses = await getCourses<Course>();
      dispatch(setCourses(courses));
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };
};

export const removeCourse = (id: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().user.token || localStorage.getItem('token') || '';

    try {
      await deleteCourseById(id, token);
      dispatch(deleteCourse(id));
    } catch (error) {
      console.error('Failed to delete course:', error);
    }
  };
};
