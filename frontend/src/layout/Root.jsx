import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import Header from './Header';
import Footer from './footer/FooterMainComp';
import RootFallback from './RootFallback';

export default function Root() {
  return (
    <div className="space-y-3">
      <Header />
      <Suspense fallback={<RootFallback />}>
        <div className="root-elememt">
          <Outlet />
        </div>
      </Suspense>
      <Footer />
    </div>
  );
}
