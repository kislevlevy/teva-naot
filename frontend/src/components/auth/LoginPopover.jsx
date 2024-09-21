import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { setCurrentUser } from '../../slices/state/userState';
import { useLoginUserMutation } from '../../slices/api/apiUsersSlices';

import { useInputState } from '@mantine/hooks';
import Icon from '@mdi/react';
import { mdiAt, mdiEyeClosed, mdiEyeOutline } from '@mdi/js';
import { Button, Label, Popover, TextInput } from 'flowbite-react';

export default function LoginPopover({ isLoginOpen, setIsLoginOpen, children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useInputState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isSuccess, setIsSuccess] = useState(true);
  const [loginUser] = useLoginUserMutation();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await loginUser({ email, password });

      setIsSuccess(true);
      setEmail('');
      setPassword('');
      setIsLoginOpen(false);
    } catch (_) {
      setIsSuccess(false);
    }
  };

  return (
    <Popover
      aria-labelledby="area-popover"
      open={isLoginOpen}
      onOpenChange={setIsLoginOpen}
      content={
        <div className="flex justify-center items-center bg-gray-100">
          <form
            className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-2"
            onSubmit={handleSubmit}
          >
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
                placeholder="••••••••"
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
      }
    >
      {children}
    </Popover>
  );
}
