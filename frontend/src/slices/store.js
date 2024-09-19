import { configureStore } from '@reduxjs/toolkit';
import { apiProducts } from './api/apiProductsSlices';
import { apiReviews } from './api/apiReviewsSlices';
import { apiOrders } from './api/apiOrdersSlices';
import { apiUsers } from './api/apiUsersSlices';
import userSliceReducer from './comp.Slices/usersSlice';

const store = configureStore({
  reducer: {
    usersSlice: userSliceReducer,
    [apiProducts.reducerPath]: apiProducts.reducer,

    [apiReviews.reducerPath]: apiReviews.reducer,
    [apiOrders.reducerPath]: apiOrders.reducer,
    [apiUsers.reducerPath]: apiUsers.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiProducts.middleware)
      .concat(apiReviews.middleware)
      .concat(apiOrders.middleware)
      .concat(apiUsers.middleware),
  devTools: true,
});
export default store;
