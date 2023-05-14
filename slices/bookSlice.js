
import { createSlice } from "@reduxjs/toolkit";



const initialState = [

];


export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setBook: (state, { payload }) => {
      state.splice(0, state.length);
      state.push(...payload);

    },
    deleteFromBooks: (state, { payload }) => {
      const index = state.findIndex(item => item.bookId === payload);
      state.splice(index, 1)
    }
  },

});

export const { actions } = bookSlice;
export const selectBooks = (state) => state.book;

export default bookSlice.reducer;
