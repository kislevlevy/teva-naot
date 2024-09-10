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

// Lazy imports:
const Root = lazy(() => import('./layout/Root'));
const Error = lazy(() => import('./pages/Error'));
const Home = lazy(() => import('./pages/Home'));
const Product = lazy(() => import('./pages/ProductPage'));

// Component:
export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<Error />}>
        <Route index element={<Home />} />
        <Route path="product/:slug" element={<Product />} />
      </Route>,
    ),
  );

  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}
