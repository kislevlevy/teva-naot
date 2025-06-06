import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../utils/config';

export const apiStats = createApi({
  reducerPath: 'apiStats',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL + '/stats',
    credentials: 'include',
  }),

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
