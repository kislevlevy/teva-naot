import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'flowbite-react';

import Icon from '@mdi/react';
import {
  mdiAccountLockOutline,
  mdiFormTextboxPassword,
  mdiLogout,
  mdiMapMarkerOutline,
  mdiPencilOutline,
} from '@mdi/js';

import {
  useChangePasswordMutation,
  useDisableMeMutation,
  useLazyLogoutUserQuery,
  useUpdateMeMutation,
} from '../slices/api/apiUsersSlices';
import { useNavigate } from 'react-router-dom';
import ChangePasswordModal from '../components/profile/_PasswordChangeModal';
import EditProfileModal from '../components/profile/_EditProfileModal';
import AdressModal from '../components/profile/_AdressModal';
import { toDateString } from '../utils/helperFunctions';
import OrderModal from '../components/profile/_OrderModal';
import FavoriteProduct from '../components/profile/_FavoriteProduct';
import ConfirmationModal from '../components/helpers/ConfermationModal';

export default function Profile() {
  const navigate = useNavigate();

  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAdressOpen, setIsAdressOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState('');

  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [disableMe] = useDisableMeMutation();

  const [triggerLogout] = useLazyLogoutUserQuery();
  const [updateMe, { isLoading: isUpdating }] = useUpdateMeMutation();
  const [changePassword, { isLoading: IsPassChange }] = useChangePasswordMutation();
  const currentUser = useSelector((state) => state.userState.user);

  const handleDisableAccount = () => {
    setIsConfirmed(false);
    setIsConfirmOpen(false);
    disableMe();
  };

  useEffect(() => {
    if ((!isUpdating || !IsPassChange) && (!currentUser || !currentUser._id))
      navigate('/');

    if (isConfirmed) handleDisableAccount();
  }, [currentUser, isUpdating, IsPassChange, isConfirmed]);

  return (
    <div className="container mx-auto p-6">
      <ChangePasswordModal
        {...{ changePassword, isChangePasswordOpen, setIsChangePasswordOpen }}
      />
      <EditProfileModal {...{ updateMe, isEditProfileOpen, setIsEditProfileOpen }} />
      <AdressModal {...{ updateMe, isAdressOpen, setIsAdressOpen }} />
      {isOrderOpen && <OrderModal {...{ isOrderOpen, setIsOrderOpen }} />}
      <ConfirmationModal
        {...{
          isConfirmOpen,
          setIsConfirmOpen,
          message:
            'בפעולה הבאה אתה עומד להשבית את החשבון שלך לצמיתות, פעולה זו אינה ניתנת להפיכה. האם ברצונך להמשיך?',
          setIsConfirmed,
        }}
      />
      <div className="flex flex-col lg:flex-row-reverse lg:space-x-6 lg:space-x-reverse">
        <div className="lg:w-1/3 bg-white shadow-lg p-6 rounded-lg">
          <img
            className="w-36 h-3w-36 rounded-full mx-auto"
            src={currentUser?.profileImg || '/img/profileImagePlaceholder.jpg'}
            alt={currentUser?.fullName}
          />
          <div className="text-center mt-4">
            <h2 className="text-xl font-semibold">{currentUser?.fullName}</h2>
            <p className="text-gray-600 eng-font ">{currentUser?.email}</p>
            <p className="text-gray-600 eng-font ">{currentUser?.phoneNumber}</p>
            {currentUser?.shippingAddress && (
              <p className="text-gray-600">
                {currentUser?.shippingAddress.address}
                {', '}
                {currentUser?.shippingAddress.city}
                {', '}
                {currentUser?.shippingAddress.postalCode}
              </p>
            )}
          </div>
          <div className="mt-6 space-y-1">
            <div
              className="flex w-full px-5 mx-auto rtl cursor-pointer hover:bg-gray-100 rounded-lg p-1 text-sm"
              onClick={() => setIsEditProfileOpen(true)}
            >
              <Icon className="ml-5" path={mdiPencilOutline} size={1} />
              ערוך פרטים
            </div>

            <div
              className="flex w-full px-5 mx-auto rtl cursor-pointer hover:bg-gray-100 rounded-lg p-1 text-sm"
              onClick={() => setIsAdressOpen(true)}
            >
              <Icon className="ml-5" path={mdiMapMarkerOutline} size={1} />
              כתובת ברירת מחדל
            </div>

            <div
              className="flex w-full px-5 mx-auto rtl cursor-pointer hover:bg-gray-100 rounded-lg p-1 text-sm"
              onClick={() => setIsChangePasswordOpen(true)}
            >
              <Icon className="ml-5" path={mdiFormTextboxPassword} size={1} />
              שנה סיסמה
            </div>

            <hr className="border-[1px] w-full" />

            <div
              className="flex w-full px-5 mx-auto rtl cursor-pointer hover:bg-red-100 rounded-lg p-1 text-sm"
              onClick={() => triggerLogout()}
            >
              <Icon className="ml-5" path={mdiLogout} size={1} />
              התנתק
            </div>

            <div
              className="flex w-full px-5 mx-auto rtl cursor-pointer hover:bg-red-100 rounded-lg p-1 text-sm"
              onClick={() => setIsConfirmOpen(true)}
            >
              <Icon className="ml-5" path={mdiAccountLockOutline} size={1} />
              השבת חשבון
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="flex flex-col lg:w-2/3 mt-6 lg:mt-0 bg-white shadow-lg p-6 rounded-lg rtl">
          <h2 className="text-xl font-semibold mb-4">היסטורית הזמנות</h2>
          {currentUser?.orderHistory ? (
            <Table hoverable>
              <Table.Head className="text-center">
                <Table.HeadCell>תאריך ביצוע הזמנה</Table.HeadCell>
                <Table.HeadCell>מספר הזמנה</Table.HeadCell>
                <Table.HeadCell>מחיר</Table.HeadCell>
                <Table.HeadCell>פעולות</Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {currentUser.orderHistory.map((order, i) => (
                  <TableItem {...{ order, setIsOrderOpen, i }} key={'order-' + i} />
                ))}
              </Table.Body>
            </Table>
          ) : (
            ''
          )}
        </div>
      </div>
      <FavoriteProduct />
    </div>
  );
}

function TableItem({ order, setIsOrderOpen, i }) {
  return (
    <Table.Row className="bg-white text-center text-sm">
      <Table.Cell>{toDateString(order.orderDate)}</Table.Cell>
      <Table.Cell>{order._id}</Table.Cell>
      <Table.Cell>{`${Math.trunc(order.total)}.00`}₪</Table.Cell>
      <Table.Cell>
        <button
          className="bg-emerald-500 px-5 py-1 rounded-md text-white hover:bg-emerald-600"
          onClick={() => setIsOrderOpen('' + i)}
        >
          פירטי הזמנה
        </button>
      </Table.Cell>
    </Table.Row>
  );
}
