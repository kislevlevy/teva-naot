import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiProductsGroup = createApi({
  reducerPath: 'apiProductsGroup',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['ProductsGroup'],

  endpoints: (builder) => ({
    getProductsGroup: builder.query({
      query: () => '/products',
      providesTags: ['ProductsGroup'],
    }),
    getProductsGroupByFilter: builder.query({
      query: (filter) => `/products/group${filter}`,
      providesTags: ['ProductsGroup'],
    }),

    getProductGroup: builder.query({
      query: (productId) => `/products/group/${productId}`,
    }),

    addNewProductGroup: builder.mutation({
      query: (newProductGroup) => ({
        url: '/products/group',
        method: 'POST',
        body: newProductGroup,
      }),
      invalidatesTags: ['ProductsGroup'],
    }),

    editProductGroup: builder.mutation({
      query: (productGroup) => ({
        url: `/products/group/${productGroup.id}`,
        method: 'PATCH',
        body: productGroup,
      }),
    }),

    deleteProductGroup: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: `/products/group/${id}`,
      }),
    }),
  }),
});

export const {
  useGetProductsGroupQuery,
  useGetProductsGroupByFilterQuery,
  useGetProductGroupQuery,
  useAddNewProductGroupMutation,
  useEditProductGroupMutation,
  useDeleteProductGroupMutation,
} = apiProductsGroup;
