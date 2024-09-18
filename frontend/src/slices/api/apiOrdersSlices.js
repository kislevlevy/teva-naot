import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiOrders = createApi({
  reducerPath: 'apiOrders',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['orders'],

  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => '/orders',
      providesTags: ['orders'],
    }),

    getOrder: builder.query({
      query: (orderId) => `/Orders/${orderId}`,
    }),

    addNewOrder: builder.mutation({
      query: (newOrder) => ({
        url: '/orders',
        method: 'POST',
        body: newOrder,
      }),
      invalidatesTags: ['orders'],
    }),

    editOrder: builder.mutation({
      query: (order) => ({
        url: `/orders/${order.id}`,
        method: 'PATCH',
        body: order,
      }),
    }),

    changeOrderStatus: builder.mutation({
      query: (order) => ({
        url: `/orders/${order.id}`,
        method: 'PATCH',
        body: order,
      }),
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useAddNewOrderMutation,
  useEditOrderMutation,
  useChangeOrderStatusMutation,
} = apiOrders;
