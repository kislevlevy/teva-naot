import React, { useEffect, useState } from 'react';

import { Button, Card } from 'flowbite-react';
import Password from '../components/auth/subComponents/_Password';
import { useResetPasswordMutation } from '../slices/api/apiUsersSlices';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [token, setToken] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [resetPassword] = useResetPasswordMutation();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);

      if (!password || !passwordConfirm) throw new Error('עליך למלא את כל השדות.');

      await resetPassword({ token, body: { password, passwordConfirm } });

      setIsError(false);
      setIsLoading(false);
      navigate('/signup');
    } catch (err) {
      setIsLoading(false);
      setIsError(err.message);
    }
  };

  useEffect(() => {
    const token = params.get('token');
    token ? setToken(token) : navigate('/');
  }, [params]);

  return (
    <Card className="max-w-md mx-auto my-20">
      <Password
        {...{ password, setPassword, passwordConfirm, setPasswordConfirm }}
      />
      {isError && <p className="text-sm text-red-500 rtl">* {isError}</p>}
      <Button isProcessing={isLoading} color="success" onClick={handleSubmit}>
        שמור סיסמה
      </Button>
    </Card>
  );
}
