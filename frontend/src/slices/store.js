import { configureStore } from '@reduxjs/toolkit';
import { apiProducts } from './api/apiProductsSlices';
import { apiReviews } from './api/apiReviewsSlices';
import { apiOrders } from './api/apiOrdersSlices';
import { apiUsers } from './api/apiUsersSlices';
import userStateReducer from './state/userState';
import { apiProductsColor } from './api/apiProductsColorsSlices';
import { apiStats } from './api/apiStatsSlices';

const store = configureStore({
  reducer: {
    userState: userStateReducer,
    [apiProducts.reducerPath]: apiProducts.reducer,
    [apiProductsColor.reducerPath]: apiProductsColor.reducer,
    [apiReviews.reducerPath]: apiReviews.reducer,
    [apiOrders.reducerPath]: apiOrders.reducer,
    [apiUsers.reducerPath]: apiUsers.reducer,
    [apiStats.reducerPath]: apiStats.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiProducts.middleware)
      .concat(apiProductsColor.middleware)
      .concat(apiReviews.middleware)
      .concat(apiOrders.middleware)
      .concat(apiUsers.middleware)
      .concat(apiStats.middleware),
  devTools: true,
});
export default store;
