import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type Author = {
  id: string;
  name: string;
};

export type AuthorsState = Author[];

const initialState: AuthorsState = [];

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {
    setAuthors(_state, action: PayloadAction<Author[]>) {
      return action.payload;
    },
    addAuthor(state, action: PayloadAction<Author>) {
      state.push(action.payload);
    },
  },
});

export const { setAuthors, addAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;


