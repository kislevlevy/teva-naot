import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useInputState } from '@mantine/hooks';

import Icon from '@mdi/react';
import { mdiAt, mdiEyeClosed, mdiEyeOutline } from '@mdi/js';
import { Button, Label, TextInput } from 'flowbite-react';
import { useLoginUserMutation } from '../../slices/api/apiUsersSlices';

export default function LoginPopover() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useInputState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isSuccess, setIsSuccess] = useState(true);
  const [loginUser] = useLoginUserMutation();

  const resetFields = function () {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      await loginUser({ email, password });
      setIsSuccess(true);
      resetFields();
      navigate('/');
    } catch (_) {
      setIsSuccess(false);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-full m-5 space-y-2 h-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl mb-3">לקוחות קיימים:</h2>

        <div dir="ltr">
          <div dir="rtl">
            <Label value={'מייל:'} />
          </div>
          <TextInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            addon={<Icon path={mdiAt} size={0.65} color="#8d949a" />}
            placeholder="hello@example.com"
            required
          />
        </div>
        <div dir="ltr">
          <div dir="rtl">
            <Label value={'סיסמה:'} />
          </div>
          <TextInput
            size={5}
            type={isPasswordHidden ? 'password' : 'text'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            addon={
              <div
                className="h-fit w-fit cursor-pointer"
                onClick={() => setIsPasswordHidden((prev) => !prev)}
              >
                {isPasswordHidden ? (
                  <Icon path={mdiEyeOutline} size={0.65} color="#8d949a" />
                ) : (
                  <Icon path={mdiEyeClosed} size={0.65} color="#8d949a" />
                )}
              </div>
            }
            placeholder={isPasswordHidden ? '••••••••' : 'Pass1$34'}
            required
          />
        </div>

        <div className="text-sm ">
          {'שכחת סיסמה? '}
          <Link
            to={'TODO:'}
            className="text-sm text-green-500 hover:underline"
            state={{ ...location.state, from: location.pathname }}
          >
            לחץ כאן
          </Link>
        </div>

        <Button type="submit" gradientDuoTone="greenToBlue" className="w-full">
          כניסה
        </Button>
        {isSuccess || (
          <p className="text-red-600 text-sm">
            * מייל או סיסמה אינם נכונים, נסה שנית
          </p>
        )}
      </form>
    </div>
  );
}
