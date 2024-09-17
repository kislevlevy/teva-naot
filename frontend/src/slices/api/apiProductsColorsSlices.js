import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiProductsColor = createApi({
  reducerPath: 'apiProducts',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),

  endpoints: (builder) => ({
    getProductColors: builder.query({
      query: () => '/products/colors',
    }),
    getProductColor: builder.query({
      query: (colorId) => `/products/colors/${colorId}`,
      providesTags: ['Products'],
    }),

    addNewProductColor: builder.mutation({
      query: (newcolor) => ({
        url: '/colors',
        method: 'POST',
        body: newcolor,
      }),
    }),

    editProductColor: builder.mutation({
      query: (color) => ({
        url: `/products/colors/${color.id}`,
        method: 'PATCH',
        body: color,
      }),
    }),

    deleteProductColor: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: `/products/colors/${id}`,
      }),
    }),
  }),
});

export const {
useGetProductColorsQuery,
useGetProductColorQuery,
useAddNewProductColorMutation,
useEditProductColorMutation,
useDeleteProductColorMutation,
} = apiProductsColor;
