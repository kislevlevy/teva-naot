import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../utils/config';

export const apiProductsColor = createApi({
  reducerPath: 'apiProductColors',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL + '/products/colors',
    credentials: 'include',
  }),

  endpoints: (builder) => ({
    getProductColorById: builder.query({
      query: (id) => `/${id}`,
    }),

    createProductColor: builder.mutation({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
    }),

    editProductColorById: builder.mutation({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body,
      }),
    }),

    deleteProductColorById: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: `/${id}`,
      }),
    }),
  }),
});

export const {
  useGetProductColorByIdQuery,
  useCreateProductColorMutation,
  useEditProductColorByIdMutation,
  useDeleteProductColorByIdMutation,
} = apiProductsColor;
