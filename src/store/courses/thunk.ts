import { createCourse, CreateCoursePayload, deleteCourseById, getCourses } from '../../services';
import { addCourse, deleteCourse, setCourses, Course } from './coursesSlice';
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

export const createCourseThunk = (payload: CreateCoursePayload) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().user.token || localStorage.getItem('token') || '';

    try {
      const course = await createCourse<Course>(payload, token);
      dispatch(addCourse(course));
      return true;
    } catch (error) {
      console.error('Failed to create course:', error);
      return false;
    }
  };
};
