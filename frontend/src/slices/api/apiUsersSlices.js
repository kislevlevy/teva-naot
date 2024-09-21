import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiUsers = createApi({
  reducerPath: 'apiUsers',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/users' }),

  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/',
    }),
    getUserById: builder.query({
      query: (id) => `/${id}`,
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
        url: '/forgotpassword',
        method: 'POST',
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: (user) => ({
        url: `/resetPassword/${user.resettoken}`,
        method: 'PATCH',
        body: user,
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
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,

  useLoginUserMutation,
  useLazyLogoutUserQuery,
  useSignupUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,

  useGetMeQuery,
  useChangePasswordMutation,
  useUpdateMeMutation,
} = apiUsers;
