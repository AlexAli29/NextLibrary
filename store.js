import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./slices/tokenSlice";
import userSlice from "./slices/userSlice";
import bookSlice from "./slices/bookSlice";
import { apiSlice } from "./services/api/apiSlice";
import archiveSlice from "./slices/archiveSlice";
import orderSlice from "./slices/orderSlice";

export const store = configureStore({

  reducer: {

    [apiSlice.reducerPath]: apiSlice.reducer,
    archive: archiveSlice,
    token: tokenSlice,
    user: userSlice,
    book: bookSlice,
    order: orderSlice
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});