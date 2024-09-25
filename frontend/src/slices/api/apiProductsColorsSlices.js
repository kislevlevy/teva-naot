import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiProductsColor = createApi({
  reducerPath: 'apiProductColors',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/products/colors' }),

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
