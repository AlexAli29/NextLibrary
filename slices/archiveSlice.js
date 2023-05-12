
import { createSlice } from "@reduxjs/toolkit";



const initialState = [

];


export const archiveSlice = createSlice({
  name: 'archive',
  initialState,
  reducers: {
    setArchive: (state, { payload }) => {
      state.splice(0, state.length);
      state.push(...payload);

    },
    deleteFromArchive: (state, { payload }) => {
      const index = state.findIndex(item => item.bookId === payload);
      state.splice(index, 1)
    }
  },

});

export const { actions } = archiveSlice;
export const selectArchive = (state) => state.archive;

export default archiveSlice.reducer;
