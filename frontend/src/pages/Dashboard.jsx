import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs } from 'flowbite-react';
import DataDashboard from '../components/dashboard/DataDashboard';
import ProductDashboard from '../components/dashboard/ProductDashboard';
import ShipmentDashboard from '../components/dashboard/ShipmentDashboard';
import SupplyDashboard from '../components/dashboard/SupplyDashboard';
import CsDashboard from '../components/dashboard/CsDashboard';

export default function Dashboard() {
  const navigate = useNavigate();
  const allowedRoles = ['employee', 'manager', 'admin'];

  const user = {
    role: 'admin',
    permissions: ['product'],
  };

  useEffect(() => {
    if (!allowedRoles.includes(user.role) || user.permissions.length < 1)
      navigate('/');
  }, [user]);

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
      <TabItem title="נתונים" bool={['manager', 'admin'].includes(user.role)}>
        <DataDashboard />
      </TabItem>

      <TabItem
        title="ניהול מוצרים"
        bool={user.role === 'admin' || user.permissions.includes('product')}
      >
        <ProductDashboard />
      </TabItem>

      <TabItem
        title="ניהול שילוח"
        bool={user.role === 'admin' || user.permissions.includes('shipping')}
      >
        <ShipmentDashboard />
      </TabItem>

      <TabItem
        title="ניהול מלאי"
        bool={user.role === 'admin' || user.permissions.includes('supply')}
      >
        <SupplyDashboard />
      </TabItem>

      <TabItem
        title="שירות לקוחות"
        bool={user.role === 'admin' || user.permissions.includes('cs')}
      >
        <CsDashboard />
      </TabItem>
    </Tabs>
  );
}

function TabItem(title, bool, children) {
  return (
    <Tabs.Item
      disabled={!bool}
      active={bool}
      title={title}
      className="text-emerald-100"
    >
      {children}
    </Tabs.Item>
  );
}
