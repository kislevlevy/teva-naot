import React, { useState } from 'react';
import { useInputState } from '@mantine/hooks';

import Icon from '@mdi/react';
import { mdiAt } from '@mdi/js';
import { Button, FileInput, Label, TextInput } from 'flowbite-react';

import { useSignupUserMutation } from '../../slices/api/apiUsersSlices';
import Password from './subComponents/_Password';
import PhoneNumer from './subComponents/_PhoneNumer';

export default function SignupSection() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useInputState('');
  const [passwordConfirm, setPasswordConfirm] = useInputState('');
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [isSuccess, setIsSuccess] = useState(true);
  const [signupUser] = useSignupUserMutation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);

      const userFormData = new FormData();
      userFormData.append('email', email);
      userFormData.append('password', password);
      userFormData.append('passwordConfirm', passwordConfirm);
      userFormData.append('fullName', fullName);
      userFormData.append('phoneNumber', phoneNumber);
      profileImg && userFormData.append('profileImg', profileImg);

      await signupUser(userFormData);
      setIsLoading(false);
      setIsSuccess(true);
    } catch (_) {
      setIsLoading(false);
      setIsSuccess(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        className="bg-white p-8 rounded shadow-md w-full m-5 space-y-2 h-full"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl mb-3">לקוחות חדשים:</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <div dir="rtl">
              <Label value={'שם מלא'} />
              <span className="text-red-500 text-sm mx-1">*</span>
            </div>
            <TextInput
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="ישראל ישראלי"
              required
            />
          </div>

          <div dir="ltr">
            <div dir="rtl">
              <Label value={'כתובת מייל'} />
              <span className="text-red-500 text-sm mx-1">*</span>
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
              <Label value={'תמונת פרופיל'} />
            </div>
            <FileInput
              accept=".png, .jpg, .jpeg"
              onChange={(e) => setProfileImg(e.target.files[0])}
              helperText="PNG/JPEG, max size of 1mb"
              color="gray"
            />
          </div>
          <PhoneNumer {...{ phoneNumber, setPhoneNumber }} />
          <Password
            {...{ password, setPassword, setPasswordConfirm, passwordConfirm }}
          />
        </div>
        <div className="text-red-500 mb-2 text-sm">* שדות נדרשים</div>

        <Button
          type="submit"
          gradientDuoTone="greenToBlue"
          className="w-full"
          isProcessing={isLoading}
        >
          הרשמה
        </Button>
        {isSuccess || (
          <p className="text-red-600 text-sm">מייל כבר נמצא בשימוש, אנא התחבר </p>
        )}
      </form>
    </div>
  );
}
