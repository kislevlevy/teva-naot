import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../components/nav/Navbar';

export default function Root() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
        <Outlet />
      </Suspense>
    </>
  );
}
