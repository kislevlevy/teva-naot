import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiStats = createApi({
  reducerPath: 'apiStats',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/stats' }),

  endpoints: (builder) => ({
    getProfits: builder.query({
      query: () => '/profits',
    }),
    getOrdersLeft: builder.query({
      query: () => '/ordersLeft',
    }),
  }),
});

export const { useGetOrdersLeftQuery, useGetProfitsQuery } = apiStats;
