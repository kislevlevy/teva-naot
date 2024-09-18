import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiProducts = createApi({
  reducerPath: 'apiProducts',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['Products'],

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (filter) => '/products' + (filter ? filter : ''),
      providesTags: ['Products'],
    }),
    getProduct: builder.query({
      query: (productId) => `/products/${productId}`,
      providesTags: ['Products'],
    }),

    addNewProduct: builder.mutation({
      query: (newProduct) => ({
        url: '/products',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['Products'],
    }),

    editProduct: builder.mutation({
      query: (product) => ({
        url: `/products/${product.id}`,
        method: 'PATCH',
        body: product,
      }),
    }),

    editProductStock: builder.mutation({
      query: (product) => ({
        url: `/products/${product.id}/stock`,
        method: 'PATCH',
        body: product,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: `/products/${id}`,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useAddNewProductMutation,
  useEditProductMutation,
  useEditProductStockMutation,
  useDeleteProductMutation,
} = apiProducts;
