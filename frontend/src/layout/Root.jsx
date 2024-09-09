import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

export default function Root() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="root-elememt">
        <Outlet />
      </div>
    </Suspense>
  );
}
