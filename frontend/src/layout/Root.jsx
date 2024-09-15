import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Header from './Header';
import Footer from './footer/FooterMainComp';
import RootFallback from './RootFallback';
import BackButton from './BackButton';

export default function Root() {
  return (
    <>
      <Header />
      <BackButton/>
      <Suspense fallback={<RootFallback />}>
        <div className="root-elememt">
          <Outlet />
        </div>
      </Suspense>
      <Footer />
    </>
  );
}
