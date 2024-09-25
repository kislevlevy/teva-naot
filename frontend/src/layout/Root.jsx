import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer } from 'react-toastify';

import Header from './Header';
import Footer from './footer/FooterMainComp';
import RootFallback from './RootFallback';
import BackButton from './BackButton';
import { useGetMeQuery } from '../slices/api/apiUsersSlices';
import { setCurrentUser } from '../slices/state/userState';

export default function Root() {
  const currentUser = useSelector((state) => state.userState.user);
  const { data, isSuccess } = useGetMeQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) dispatch(setCurrentUser({ ...currentUser, ...data.data.doc }));
  }, [isSuccess]);

  return (
    <div className="space-y-3">
      <Header />
      {/* <BackButton/> */}
      <Suspense fallback={<RootFallback />}>
        <div className="root-elememt space-y-5">
          <Outlet />
        </div>
      </Suspense>
      <ToastContainer />
      <Footer />
    </div>
  );
}
