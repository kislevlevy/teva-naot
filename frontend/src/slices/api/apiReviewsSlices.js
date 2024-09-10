import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiReviews = createApi({
  reducerPath: 'apiReviws',
  baseQuery: fetchBaseQuery({ baseUrl: '/localhost:3000/api/v1' }),
  tagTypes: ['Reviews'],
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => '/Reviews',
      providesTags: ['Reviews'],
    }),
    getReviewsByGroup: builder.query({
      query: (groupId) => `/Reviews/${groupId}`,
    }),
    addNewReview: builder.mutation({
      query: (newReview) => ({
        url: '/Reviews',
        method: 'POST',
        body: newReview,
      }),
      invalidatesTags: ['Reviews'],
    }),
    editReviewsById: builder.mutation({
      query: (Review) => ({
        url: `/Reviews/${Review.id}`,
        method: 'PATCH',
        body: Review,
      }),
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: `/Reviews/${id}`,
      }),
    }),
  }),
});

export const {
useGetReviewsQuery,
useGetReviewsByGroupQuery,
useAddNewReviewMutation,
useEditReviewsByIdMutation,
useDeleteReviewMutation,
} = apiReviews;
