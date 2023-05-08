import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {
    setToken: (state, action) => {

      state.accessToken = action.payload;
    },

    logOut: (state, action) => {
      state.accessToken = "";
    },
  },
});

export const { actions } = tokenSlice;
export const { logOut, setToken } = tokenSlice.actions;
export const selectAccessToken = (state) => state.token.accessToken;

export default tokenSlice.reducer;
