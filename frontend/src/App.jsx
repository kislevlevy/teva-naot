// Imports:
import React, { lazy } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';

import { MantineProvider } from '@mantine/core';
import './App.css';
import '@mantine/core/styles.css';
import { Provider } from 'react-redux';
import store from './slices/store';
import Shop from './components/shop/Shop';

// Lazy imports:
const Root = lazy(() => import('./layout/Root'));
const Error = lazy(() => import('./pages/Error'));
const Home = lazy(() => import('./pages/Home'));
const Product = lazy(() => import('./pages/Product'));

// Component:
export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<Error />}>
        <Route index element={<Home />} />
        <Route path="product/:slug" element={<Product />} />
        <Route path="product" element={<Shop />} />
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
