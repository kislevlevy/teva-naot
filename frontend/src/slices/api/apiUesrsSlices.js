import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiUsers = createApi({
  reducerPath: 'apiUsers',
  baseQuery: fetchBaseQuery({ baseUrl: '/localhost:3000/api/v1' }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => '/Users',
    }),

    getUserById: builder.query({
      query: (userId) => `/users/${userId}`,
    }),

    logoutUserById: builder.query({
      query: (userId) => `/users/logout/${userId}`,
    }),

    loginUser: builder.mutation({
      query: (user) => ({
        url: '/users/login',
        method: 'POST',
        body: user,
      }),
    }),

    signupUser: builder.mutation({
      query: (user) => ({
        url: '/users/signup',
        method: 'POST',
        body: user,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (user) => ({
        url: '/users/forgotpassword',
        method: 'POST',
        body: user,
      }),
    }),

    resetPassword: builder.mutation({
      query: (user) => ({
        url: `/users/resetPassword/${user.resettoken}`,
        method: 'PATCH',
        body: user,
      }),
    }),

    changePassword: builder.mutation({
      query: (user) => ({
        url: '/users/changePassword',
        method: 'PATCH',
        body: user,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useLogoutUserByIdQuery,
  useLoginUserMutation,
  useSignupUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
} = apiUsers;
