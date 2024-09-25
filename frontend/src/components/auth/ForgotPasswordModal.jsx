import React, { useState } from 'react';

import { Button, Label, Modal, TextInput } from 'flowbite-react';
import Icon from '@mdi/react';
import { mdiLockReset } from '@mdi/js';

import { useForgotPasswordMutation } from '../../slices/api/apiUsersSlices';

export default function ForgotPasswordModal({
  isForgotPasswordOpen,
  setIsForgotPasswordOpen,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(false);

  const [forgotPassword] = useForgotPasswordMutation();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setError('');
      setMessage('');

      if (!email) {
        setError('עליך למלא את כתובת המייל בשדה.');
        throw new Error('');
      }
      if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        setError('כתובת המייל הזו אינה תקינה.');
        throw new Error('');
      }

      await forgotPassword({ email });
      setIsLoading(false);
      setMessage('אם משתמש זה קיים, נשלח כעת מייל עם לינק שחזור סיסמה.');
      setDisabled(true);
    } catch (err) {
      setIsLoading(false);
      setMessage('אם משתמש זה קיים, נשלח כעת מייל עם לינק שחזור סיסמה.');
      setDisabled(true);
    }
  };

  return (
    <Modal
      show={isForgotPasswordOpen}
      dismissible
      onClose={() => {
        setIsForgotPasswordOpen(false);
      }}
      size="md"
    >
      <Modal.Header>
        <Icon path={mdiLockReset} size={1} />
      </Modal.Header>
      <Modal.Body>
        <div dir="rtl">
          <Label value="הזן כאן את כתובת המייל המשוייכת לחשבון שלך" />
          <TextInput
            dir="ltr"
            type="string"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-red-500 rtl mt-2">* {error}</p>}
        {!error && message && <p className="text-sm rtl mt-2">{message}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button
          disabled={disabled}
          onClick={handleSubmit}
          isProcessing={isLoading}
          color="success"
        >
          שחזר סיסמה
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
