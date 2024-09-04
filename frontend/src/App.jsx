import React, { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  createRoutesFromElements,
} from "react-router-dom";
 const Root = lazy(()=>import("./layout/Root")) ;
 const Error = lazy(() => import("./components/Error")); 
 const Home = lazy(() => import("./pages/Home"));
 const Login = lazy(() => import("./pages/Login")); 


function App() {
const router = createBrowserRouter(
    createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<Error />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />

    </Route>
  )
)
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
