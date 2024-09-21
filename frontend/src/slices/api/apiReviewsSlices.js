import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiReviews = createApi({
  reducerPath: 'apiReviws',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/reviews' }),

  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
    }),

    editReviewsById: builder.mutation({
      query: ({ id, body }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body,
      }),
    }),

    deleteReviewById: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: `/${id}`,
      }),
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useEditReviewsByIdMutation,
  useDeleteReviewByIdMutation,
} = apiReviews;
