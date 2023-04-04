import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./slices/tokenSlice";
import userSlice from "./slices/userSlice";
import bookSlice from "./slices/bookSlice";
import { apiSlice } from "./services/api/apiSlice";

export const store = configureStore({

  reducer: {

    [apiSlice.reducerPath]: apiSlice.reducer,

    token: tokenSlice,
    user: userSlice,
    book: bookSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});