import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiOrders = createApi({
  reducerPath: 'apiOrders',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/orders' }),
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
  useEditOrderByIdMutation,
  useChangeOrderStatusByIdMutation,
} = apiOrders;
