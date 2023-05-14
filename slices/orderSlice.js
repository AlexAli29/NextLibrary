
import { createSlice } from "@reduxjs/toolkit";



const initialState = [

];


export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrders: (state, { payload }) => {
      state.splice(0, state.length);
      state.push(...payload);

    },
    deleteFromOrders: (state, { payload }) => {
      const index = state.findIndex(item => item.orderId === payload);
      state.splice(index, 1)
    }
  },

});

export const { actions } = orderSlice;
export const selectOrders = (state) => state.order;

export default orderSlice.reducer;
