import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Header from './Header';
import Footer from './footer/FooterMainComp';
export default function Root() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="root-elememt">
          <Outlet />
        </div>
      </Suspense>
      <Footer />
    </>
  );
}
