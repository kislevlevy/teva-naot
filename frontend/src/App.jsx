// Imports:
import React, { lazy } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate,
} from 'react-router-dom';

import { MantineProvider } from '@mantine/core';
import './App.css';
import '@mantine/core/styles.css';
import { Provider } from 'react-redux';
import store from './slices/store';
import Root from './layout/Root';
import Error from './pages/Error';
import Signup from './pages/Signup';
import Checkout from './pages/Checkout';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import OrderSuccess from './pages/OrderSuccess';
import OrderFailure from './pages/OrderFailure';

// Lazy imports:
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const SingleProduct = lazy(() => import('./pages/Product'));
const Info = lazy(() => import('./pages/Info'));
const StoreLocator = lazy(() => import('./pages/StoreLocator'));

// Component:
export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<Error />}>
        <Route index element={<Home />} />
        <Route path="signup" element={<Signup />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="order-success" element={<OrderSuccess />} />
        <Route path="order-failure" element={<OrderFailure />} />
        <Route path="profile" element={<Profile />} />
        <Route path="products">
          <Route index element={<Shop />} />
          <Route path="product/:slug" element={<SingleProduct />} />
          <Route path="category/:slug" element={<Shop />} />
        </Route>
        <Route path="policy">
          <Route index element={<Navigate to="משלוחים" />} />
          <Route path=":slug" element={<Info />} />
        </Route>
        <Route path="company">
          <Route index element={<Navigate to="אודות" />} />
          <Route path="סניפים" element={<StoreLocator />} />
          <Route path=":slug" element={<Info />} />
        </Route>
      </Route>,
    ),
  );

  return (
    <MantineProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </MantineProvider>
  );
}
