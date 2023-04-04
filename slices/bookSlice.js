import { useGetBooksMutation } from "@/services/api/handleReqApiSlice";
import { createSlice } from "@reduxjs/toolkit";



const initialState = [

];


export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {

  },

});

export default bookSlice.reducer;