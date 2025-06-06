import { useEffect, useState } from 'react';
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
import { getAssetPath } from '../utils/assets';
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
    <div className="container p-6 mx-auto">
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
        <div className="p-6 bg-white rounded-lg shadow-lg lg:w-1/3">
          <img
            className="mx-auto rounded-full w-36 h-3w-36"
            src={
              currentUser?.profileImg ||
              getAssetPath('img/profileImagePlaceholder.jpg')
            }
            alt={currentUser?.fullName}
          />
          <div className="mt-4 text-center">
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
              className="flex w-full p-1 px-5 mx-auto text-sm rounded-lg cursor-pointer rtl hover:bg-gray-100"
              onClick={() => setIsEditProfileOpen(true)}
            >
              <Icon className="ml-5" path={mdiPencilOutline} size={1} />
              ערוך פרטים
            </div>

            <div
              className="flex w-full p-1 px-5 mx-auto text-sm rounded-lg cursor-pointer rtl hover:bg-gray-100"
              onClick={() => setIsAdressOpen(true)}
            >
              <Icon className="ml-5" path={mdiMapMarkerOutline} size={1} />
              כתובת ברירת מחדל
            </div>

            <div
              className="flex w-full p-1 px-5 mx-auto text-sm rounded-lg cursor-pointer rtl hover:bg-gray-100"
              onClick={() => setIsChangePasswordOpen(true)}
            >
              <Icon className="ml-5" path={mdiFormTextboxPassword} size={1} />
              שנה סיסמה
            </div>

            <hr className="border-[1px] w-full" />

            <div
              className="flex w-full p-1 px-5 mx-auto text-sm rounded-lg cursor-pointer rtl hover:bg-red-100"
              onClick={() => triggerLogout()}
            >
              <Icon className="ml-5" path={mdiLogout} size={1} />
              התנתק
            </div>

            <div
              className="flex w-full p-1 px-5 mx-auto text-sm rounded-lg cursor-pointer rtl hover:bg-red-100"
              onClick={() => setIsConfirmOpen(true)}
            >
              <Icon className="ml-5" path={mdiAccountLockOutline} size={1} />
              השבת חשבון
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="flex flex-col p-6 mt-6 bg-white rounded-lg shadow-lg lg:w-2/3 lg:mt-0 rtl">
          <h2 className="mb-4 text-xl font-semibold">היסטורית הזמנות</h2>
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
    <Table.Row className="text-sm text-center bg-white">
      <Table.Cell>{toDateString(order.orderDate)}</Table.Cell>
      <Table.Cell>{order._id}</Table.Cell>
      <Table.Cell>{`${Math.trunc(order.total)}.00`}₪</Table.Cell>
      <Table.Cell>
        <button
          className="px-5 py-1 text-white rounded-md bg-emerald-500 hover:bg-emerald-600"
          onClick={() => setIsOrderOpen('' + i)}
        >
          פירטי הזמנה
        </button>
      </Table.Cell>
    </Table.Row>
  );
}
