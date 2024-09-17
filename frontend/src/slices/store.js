import { configureStore } from '@reduxjs/toolkit';
import { apiProducts } from './api/apiProductsSlices';
import { apiReviews } from './api/apiReviewsSlices';
import { apiOrders } from './api/apiOrdersSlices';
import { apiUsers } from './api/apiUesrsSlices';
import popularProductsReducer from './comp.Slices/popularProduct';

const store = configureStore({
  reducer: {
    popularProducts: popularProductsReducer,
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
