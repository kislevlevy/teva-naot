import React, { lazy } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Root = lazy(() => import('./layout/Root'));
const Error = lazy(() => import('./pages/Error'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));

export default function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<Error />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
      </Route>,
    ),
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
