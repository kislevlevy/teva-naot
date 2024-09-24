import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiUsers = createApi({
  reducerPath: 'apiUsers',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/users' }),

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: (query) => query || '',
    }),
    getUserById: builder.query({
      query: (id) => `/${id}`,
    }),
    editUserById: builder.mutation({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body,
      }),
    }),

    loginUser: builder.mutation({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
    logoutUser: builder.query({
      query: () => `/logout`,
    }),
    signupUser: builder.mutation({
      query: (body) => ({
        url: '/signup',
        method: 'POST',
        body,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: '/forgotPassword',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ token, body }) => ({
        url: `/resetPassword/${token}`,
        method: 'PATCH',
        body,
      }),
    }),

    getMe: builder.query({
      query: () => '/getMe',
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: '/changePassword',
        method: 'PATCH',
        body,
      }),
    }),
    updateMe: builder.mutation({
      query: (body) => ({
        url: '/updateMe',
        method: 'PATCH',
        body,
      }),
    }),
    disableMe: builder.mutation({
      query: () => ({
        url: '/disableMe',
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useEditUserByIdMutation,

  useLoginUserMutation,
  useLazyLogoutUserQuery,
  useSignupUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,

  useGetMeQuery,
  useChangePasswordMutation,
  useUpdateMeMutation,
  useDisableMeMutation,
} = apiUsers;
