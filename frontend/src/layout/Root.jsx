import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Navbar from './nav/Navbar';
import Footer from './footer/FooterMainComp';
export default function Root() {
  return (
    <>
      <Navbar/>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="root-elememt">
          <Outlet />
        </div>
      </Suspense>
      <Footer/>
    </>
  );
}
