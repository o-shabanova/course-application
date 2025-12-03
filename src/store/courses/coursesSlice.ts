import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type Course = {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
};

export type CoursesState = Course[];

const initialState: CoursesState = [];

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCourses(_state, action: PayloadAction<Course[]>) {
      return action.payload;
    },
    addCourse(state, action: PayloadAction<Course>) {
      state.push(action.payload);
    },
    deleteCourse(state, action: PayloadAction<string>) {
      return state.filter((course) => course.id !== action.payload);
    },
  },
});

export const { setCourses, addCourse, deleteCourse } = coursesSlice.actions;

export default coursesSlice.reducer;


