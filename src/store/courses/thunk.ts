import { getCourses } from '../../services';
import { setCourses, Course } from './coursesSlice';
import type { AppDispatch } from '..';

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
