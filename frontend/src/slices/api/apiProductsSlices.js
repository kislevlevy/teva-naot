import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiProducts = createApi({
  reducerPath: 'apiProducts',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/products' }),
  tagTypes: ['Products'],

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (filter) => `${filter || ''}`,
      providesTags: ['Products'],
    }),
    getPopularProducts:builder.query({
    query:()=>'/foru',
    providesTags: ['Products'],
    }),
    getProductById: builder.query({
      query: (id) => `${id}`,
      providesTags: ['Products'],
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Products'],
    }),

    editProductById: builder.mutation({
      query: ({ id, body }) => ({
        url: `${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Products'],
    }),

    editProductStockById: builder.mutation({
      query: ({ id, body }) => ({
        url: `${id}/stock`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Products'],
    }),

    deleteProductById: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: `${id}`,
      }),
      invalidatesTags: ['Products'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetPopularProductsQuery,
  useLazyGetProductsQuery,
  useGetProductByIdQuery,
  useLazyGetProductByIdQuery,

  useCreateProductMutation,
  useEditProductByIdMutation,
  useEditProductStockByIdMutation,
  useDeleteProductByIdMutation,
} = apiProducts;
