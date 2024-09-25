import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { mdiMapMarkerOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { Button, List, Modal } from 'flowbite-react';

import Adress from './subComponents/_Adress';
import { setCurrentUser } from '../../slices/state/userState';

export default function AdressModal({ isAdressOpen, setIsAdressOpen, updateMe }) {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [isError, setIsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userState.user);

  const resetFields = function () {
    setAddress('');
    setCity('');
    setPostalCode('');
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      if (!address || !city || !postalCode)
        throw new Error('* עליך למלא את כל השדות.');

      const { data } = await updateMe({
        shippingAddress: { address, city, postalCode },
      }).unwrap();
      dispatch(setCurrentUser({ ...currentUser, ...data.doc }));

      setIsLoading(false);
      setIsAdressOpen(false);
    } catch (err) {
      setIsLoading(false);
      return setIsError(err.message || '* משהו לא עבד... נסה שנית מאוחר יותר.');
    }
  };

  return (
    <Modal
      dismissible
      show={isAdressOpen}
      onClose={() => {
        setIsAdressOpen(false);
        resetFields();
        setIsError('');
      }}
      size="md"
    >
      <Modal.Header>
        <Icon path={mdiMapMarkerOutline} size={1} />
      </Modal.Header>
      <Modal.Body dir="rtl">
        <List unstyled className="space-y-1">
          <Adress
            {...{
              address,
              setAddress,
              city,
              setCity,
              postalCode,
              setPostalCode,
            }}
          />
        </List>
        {isError && <p className="rtl mt-4 text-sm text-red-500">{isError}</p>}
      </Modal.Body>

      <Modal.Footer>
        <Button color="failure" outline onClick={() => setIsAdressOpen(false)}>
          ביטול
        </Button>
        <Button
          isProcessing={isLoading}
          color="success"
          outline
          onClick={handleSubmit}
        >
          שמור
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
