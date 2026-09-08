import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { logout } from '../user/userSlice';


export type Course = {
  id: string;
  title: string;
  description: string;
  creationDate: string;
  duration: number;
  authors: string[];
};

export type CoursesState = {
  list: Course[];
  isLoading: boolean;
};

const initialState: CoursesState = {
  list: [],
  isLoading: true,
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCoursesLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setCourses(state, action: PayloadAction<Course[]>) {
      state.list = Array.isArray(action.payload) ? action.payload : [];
      state.isLoading = false;
    },
    addCourse(state, action: PayloadAction<Course>) {
      state.list.push(action.payload);
    },
    updateCourse(state, action: PayloadAction<Course>) {
      const index = state.list.findIndex((course) => course.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteCourse(state, action: PayloadAction<string>) {
      state.list = state.list.filter((course) => course.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});

export const { setCoursesLoading, setCourses, addCourse, updateCourse, deleteCourse } = coursesSlice.actions;

export default coursesSlice.reducer;
