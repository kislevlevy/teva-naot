import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInputState } from '@mantine/hooks';

import Icon from '@mdi/react';
import { mdiAt, mdiEyeClosed, mdiEyeOutline } from '@mdi/js';
import { Button, Label, TextInput } from 'flowbite-react';
import { useLoginUserMutation } from '../../slices/api/apiUsersSlices';
import ForgotPasswordModal from './ForgotPasswordModal';

export default function LoginPopover() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useInputState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isSuccess, setIsSuccess] = useState(true);
  const [loginUser] = useLoginUserMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const resetFields = function () {
    setEmail('');
    setPassword('');
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      await loginUser({ email, password });
      setIsSuccess(true);
      setIsLoading(false);
      resetFields();
      navigate('/');
    } catch (_) {
      setIsLoading(false);
      setIsSuccess(false);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <ForgotPasswordModal {...{ isForgotPasswordOpen, setIsForgotPasswordOpen }} />
      <form
        className="w-full h-full p-8 m-5 space-y-2 bg-white rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <h2 className="mb-3 text-xl">לקוחות קיימים:</h2>

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
                className="cursor-pointer h-fit w-fit"
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
          <span
            className="text-sm text-green-500 cursor-pointer hover:underline"
            onClick={() => setIsForgotPasswordOpen(true)}
          >
            לחץ כאן
          </span>
        </div>

        <Button
          type="submit"
          gradientDuoTone="greenToBlue"
          className="w-full"
          isProcessing={isLoading}
        >
          כניסה
        </Button>
        {isSuccess || (
          <p className="text-sm text-red-600">
            * מייל או סיסמה אינם נכונים, נסה שנית
          </p>
        )}
      </form>
    </div>
  );
}
