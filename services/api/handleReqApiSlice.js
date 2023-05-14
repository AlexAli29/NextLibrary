import { apiSlice } from "./apiSlice";

export const reqHandler = apiSlice.injectEndpoints({
  endpoints: (build) => ({

    getBooks: build.mutation({
      query: () => ({
        url: "api/books/getbooks",
        method: "GET",
      }),
    }),

    getOrders: build.mutation({
      query: () => ({
        url: "api/auth/order",
        method: "GET",
      }),
    }),

    getUserBooks: build.mutation({
      query: () => ({
        url: "api/auth/userbooks",
        method: "GET",
      }),
    }),

    addUserBooks: build.mutation({
      query: (credentials) => ({
        url: "api/auth/userbooks",
        method: "POST",
        body: credentials,
      }),
    }),

    deleteUserBooks: build.mutation({
      query: (credentials) => ({
        url: "api/auth/userbooks",
        method: "PATCH",
        body: credentials,
      }),
    }),

    addOrder: build.mutation({
      query: (credentials) => ({
        url: "api/auth/order",
        method: "POST",
        body: credentials,
      }),
    }),

    deleteOrder: build.mutation({
      query: (credentials) => ({
        url: "api/auth/order",
        method: "PATCH",
        body: credentials,
      }),
    }),

    getArchivedBooks: build.mutation({
      query: () => ({
        url: "api/auth/admin/archive",
        method: "GET",
      }),
    }),

    getAllUsers: build.mutation({
      query: () => ({
        url: "api/auth/admin/users",
        method: "GET",
      }),
    }),

    toggleArchive: build.mutation({
      query: (credentials) => ({
        url: "api/auth/admin/archive",
        method: "PATCH",
        body: credentials,
      }),
    }),

    getBooksAdmin: build.mutation({
      query: () => ({
        url: "api/admin/book",
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
  useGetBooksAdminMutation,
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
  useGetArchivedBooksMutation,
  useToggleArchiveMutation,
  useAddOrderMutation,
  useGetOrdersMutation,
  useDeleteOrderMutation,
  useAddUserBooksMutation,
  useDeleteUserBooksMutation,
  useGetUserBooksMutation,
  useGetAllUsersMutation
} = reqHandler;
