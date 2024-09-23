import React, { useState } from 'react';

import { mdiPencilOutline } from '@mdi/js';
import Icon from '@mdi/react';
import { Button, FileInput, Label, Modal, TextInput } from 'flowbite-react';

import PhoneNumer from '../auth/subComponents/_PhoneNumer';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentUser } from '../../slices/state/userState';

export default function EditProfileModal({
  isEditProfileOpen,
  setIsEditProfileOpen,
  updateMe,
}) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [isError, setIsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.userState.user);

  const resetFields = function () {
    setFullName('');
    setPhoneNumber('');
    setProfileImg('');
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const userFormData = new FormData();

      fullName && userFormData.append('fullName', fullName);
      phoneNumber && userFormData.append('phoneNumber', phoneNumber);
      profileImg && userFormData.append('profileImg', profileImg);

      if (Array.from(userFormData.entries()).length < 1)
        throw new Error('* עליך למלא שדה אחד לפחות.');

      const { data } = await updateMe(userFormData).unwrap();
      dispatch(setCurrentUser({ ...currentUser, ...data.doc }));

      setIsLoading(false);
      setIsEditProfileOpen(false);
    } catch (err) {
      setIsLoading(false);
      return setIsError(err.message || '* משהו לא עבד... נסה שנית מאוחר יותר.');
    }
  };

  return (
    <Modal
      dismissible
      show={isEditProfileOpen}
      onClose={() => {
        setIsEditProfileOpen(false);
        resetFields();
        setIsError('');
      }}
      size="md"
    >
      <Modal.Header>
        <Icon path={mdiPencilOutline} size={1} />
      </Modal.Header>
      <Modal.Body>
        <div className="grid grid-cols-1 gap-1">
          <div>
            <div dir="rtl">
              <Label value={'שם מלא'} />
            </div>
            <TextInput
              dir="rtl"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="ישראל ישראלי"
            />
          </div>

          <PhoneNumer {...{ phoneNumber, setPhoneNumber, isRequired: false }} />

          <div dir="ltr">
            <div dir="rtl">
              <Label value={'תמונת פרופיל'} />
            </div>
            <FileInput
              accept=".png, .jpg, .jpeg"
              onChange={(e) => setProfileImg(e.target.files[0])}
              helperText="PNG/JPEG, max size of 1mb"
              color="gray"
            />
          </div>
        </div>
        {isError && <p className="rtl mt-4 text-sm text-red-500">{isError}</p>}
      </Modal.Body>

      <Modal.Footer>
        <Button color="failure" outline onClick={() => setIsEditProfileOpen(false)}>
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
