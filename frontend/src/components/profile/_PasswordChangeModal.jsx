import React, { useState } from 'react';
import { useInputState } from '@mantine/hooks';

import { Button, Modal, TextInput, Label } from 'flowbite-react';
import Icon from '@mdi/react';
import { mdiFormTextboxPassword } from '@mdi/js';

import Password from '../auth/subComponents/_Password';
import { useLazyLogoutUserQuery } from '../../slices/api/apiUsersSlices';

export default function ChangePasswordModal({
  isChangePasswordOpen,
  setIsChangePasswordOpen,
  changePassword,
}) {
  const [currentPassword, setCurrentPassword] = useInputState('');
  const [password, setPassword] = useInputState('');
  const [passwordConfirm, setPasswordConfirm] = useInputState('');
  const [isError, setIsError] = useState('');

  const [triggerLogout] = useLazyLogoutUserQuery();

  const resetFields = function () {
    setPassword('');
    setPasswordConfirm('');
    setCurrentPassword('');
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!currentPassword || !password || !passwordConfirm)
        return setIsError('* עליך למלא את כל השדות.');

      await changePassword({
        currentPassword,
        password,
        passwordConfirm,
      }).unwrap();
      setIsEditProfileOpen(false);
      setIsError('');
      await triggerLogout();
    } catch (_) {
      return setIsError('* משהו לא עבד... נסה שנית מאוחר יותר.');
    }
  };

  return (
    <Modal
      show={isChangePasswordOpen}
      onClose={() => {
        setIsChangePasswordOpen(false);
        resetFields();
        setIsError('');
      }}
      dismissible
      size="md"
    >
      <Modal.Header>
        <Icon path={mdiFormTextboxPassword} size={1} />
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <div>
            <div dir="rtl">
              <Label value={'סיסמה נוכחית'} />
              <span className="text-red-500 text-sm mx-1">*</span>
            </div>

            <TextInput
              type="password"
              required
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          <Password
            {...{ password, setPassword, passwordConfirm, setPasswordConfirm }}
          />
        </div>
        <p className="rtl mt-4 text-sm text-red-500">
          {isError ? isError : '* אחרי שינוי סיסמה יהיה עליך להתחבר שוב לחשבון'}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          color="failure"
          outline
          onClick={() => setIsChangePasswordOpen(false)}
        >
          ביטול
        </Button>
        <Button color="success" outline onClick={handleSubmit}>
          שמור
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
