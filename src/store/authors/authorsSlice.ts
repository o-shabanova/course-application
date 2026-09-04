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
      return Array.isArray(action.payload) ? action.payload : [];
    },
    addAuthor(state, action: PayloadAction<Author>) {
      state.push(action.payload);
    },
    deleteAuthor(state, action: PayloadAction<string>) {
      return state.filter(author => author.id !== action.payload);
    },
  },
});

export const { setAuthors, addAuthor, deleteAuthor } = authorsSlice.actions;

export default authorsSlice.reducer;


