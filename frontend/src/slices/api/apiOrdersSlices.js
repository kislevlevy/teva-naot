import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiOrders = createApi({
  reducerPath: 'apiOrders',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/orders' }),
  tagTypes: ['orders'],

  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => '/',
      providesTags: ['orders'],
    }),

    getOrderById: builder.query({
      query: (id) => `/${id}`,
    }),

    createOrder: builder.mutation({
      query: (body) => ({
        url: '/',
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
    }),

    changeOrderStatusById: builder.mutation({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body,
      }),
    }),
  }),
});

export const {
  useGetOrdersMutation,
  useGetOrderByIdMutation,
  useCreateOrderMutation,
  useEditOrderByIdMutation,
  useChangeOrderStatusByIdMutation,
} = apiOrders;
