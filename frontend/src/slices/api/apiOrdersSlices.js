import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiOrders = createApi({
  reducerPath: 'apiOrders',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://teva-naot.onrender.com/api/v1/orders',
    credentials: 'include'
  }),
  tagTypes: ['Orders'],

  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (filter) => filter || '',
      providesTags: ['Orders'],
    }),
    getOrderById: builder.query({
      query: (id) => `/${id}`,
      providesTags: ['Orders'],
    }),

    createOrder: builder.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Orders'],
    }),
    orderSuccess: builder.mutation({
      query: (body) => ({
        url: '/success',
        method: 'POST',
        body,
      }),
    }),
    orderFailure: builder.mutation({
      query: (body) => ({
        url: '/failure',
        method: 'POST',
        body,
      }),
    }),

    editOrderById: builder.mutation({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Orders'],
    }),
    changeOrderStatusById: builder.mutation({
      query: ({ id, body }) => ({
        url: `/${id}/changeStatus`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Orders'],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,

  useCreateOrderMutation,
  useOrderFailureMutation,
  useOrderSuccessMutation,

  useEditOrderByIdMutation,
  useChangeOrderStatusByIdMutation,
} = apiOrders;
