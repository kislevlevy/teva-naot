import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Tabs } from 'flowbite-react';

import ProductDashboard from '../components/dashboard/ProductDashboard';
import ShipmentDashboard from '../components/dashboard/ShipmentDashboard';
import CsDashboard from '../components/dashboard/CsDashboard';
import { useGetMeQuery } from '../slices/api/apiUsersSlices';

export default function Dashboard() {
  const navigate = useNavigate();

  const { data, isLoading } = useGetMeQuery();
  const currentUser = useSelector((state) => state.userState.user);
  const [isAdmin, setIsAdmin] = useState(false);

  const isAllowed = (permission) =>
    isAdmin || currentUser.permissions.includes(permission);

  useEffect(() => {
    if (!isLoading && !data) navigate('/');

    switch (currentUser?.role) {
      case 'client':
        navigate('/');
        break;
      case 'employee':
        currentUser.permissions.length < 1 && navigate('/');
        break;
      case 'admin':
        setIsAdmin(true);
        break;
    }
  }, [currentUser, isLoading]);

  if (currentUser?.role)
    return (
      <Tabs
        dir="rtl"
        variant="underline"
        theme={{
          tablist: {
            tabitem: {
              base: 'flex items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500',
              variant: {
                underline: {
                  active: {
                    on: 'active rounded-t-lg border-b-2 border-emerald-600 text-emerald-600 dark:border-emerald-500 dark:text-emerald-500',
                    off: 'border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300',
                  },
                },
              },
            },
          },
        }}
      >
        <Tabs.Item
          disabled={!isAllowed('product')}
          active={isAllowed('product')}
          title={'ניהול מוצרים'}
          className="text-emerald-100"
        >
          <ProductDashboard />
        </Tabs.Item>

        <Tabs.Item
          disabled={!isAllowed('shipping')}
          active={isAllowed('shipping')}
          title={'ניהול שילוח'}
          className="text-emerald-100"
        >
          <ShipmentDashboard />
        </Tabs.Item>

        <Tabs.Item
          disabled={!isAllowed('cs')}
          active={isAllowed('cs')}
          title={'שירות לקוחות'}
          className="text-emerald-100"
        >
          <CsDashboard />
        </Tabs.Item>
      </Tabs>
    );
}
