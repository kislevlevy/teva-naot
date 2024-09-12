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
import { StateProvider } from './slices/stateContext';

// Lazy imports:
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./components/shop/Shop'));
const Cart = lazy(() => import('./components/product/ProductList'));
const SingleProduct = lazy(() => import('./pages/Product'));
const Info = lazy(() => import('./pages/Info'));

// Component:
export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<Error />}>
        <Route index element={<Home />} />
        <Route path="products">
          <Route index element={<Shop />} />
          <Route path="product/:slug" element={<SingleProduct />} />
          <Route path="category/:slug" element={<Shop />} />
        </Route>
        <Route path="cart" element={<Cart />} />
        <Route path="policy">
          <Route index element={<Navigate to="משלוחים" />} />
          <Route path=":slug" element={<Info />} />
        </Route>
        <Route path="company">
          <Route index element={<Navigate to="אודות" />} />
          <Route path=":slug" element={<Info />} />
        </Route>
        {/* <Route path="dashbord" element={<Login />} /> */}
      </Route>,
    ),
  );

  return (
    <MantineProvider>
      <StateProvider>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </StateProvider>
    </MantineProvider>
  );
}
