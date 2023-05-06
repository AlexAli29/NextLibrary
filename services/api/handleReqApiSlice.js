import { apiSlice } from "./apiSlice";

export const reqHandler = apiSlice.injectEndpoints({
  endpoints: (build) => ({

    getBooks: build.mutation({
      query: () => ({
        url: "api/books/getbooks",
        method: "GET",
      }),
    }),

    addBook: build.mutation({
      query: (credentials) => ({
        url: "api/auth/admin/book",
        method: "POST",
        body: credentials,
      }),
    }),

    editBook: build.mutation({
      query: (credentials) => ({
        url: "api/auth/admin/book",
        method: "PATCH",
        body: credentials,
      }),
    }),

    addBookImage: build.mutation({
      query: (credentials) => ({
        url: "api/auth/admin/addbookimage",
        method: "POST",
        body: credentials,
      }),
    }),

    login: build.mutation({
      query: (credentials) => ({
        url: "api/auth/login",
        method: "POST",
        body: credentials,
        // responseHandler: (response) => response.text(),
      }),
    }),

    register: build.mutation({
      query: (credentials) => ({
        url: "api/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),

    getUser: build.mutation({
      query: (credentials) => ({
        url: "api/users/getuser",
        method: "POST",
        body: credentials,
      }),
    }),

    refresh: build.mutation({
      query: () => ({
        url: "api/auth/refresh",
        method: "GET",

      }),
    }),

    logout: build.mutation({
      query: () => ({
        url: "api/auth/logout",
        method: "GET",

      }),
    }),


    getCategories: build.mutation({
      query: () => ({
        url: "api/categories/getcategories",
        method: "GET",
      }),
    }),

  }),
});

export const {

  useLoginMutation,
  useRegisterMutation,
  useGetBooksMutation,
  useGetUserMutation,
  useRefreshMutation,
  useLogoutMutation,
  useGetCategoriesMutation,
  useAddBookImageMutation,
  useAddBookMutation,
  useEditBookMutation,

} = reqHandler;
