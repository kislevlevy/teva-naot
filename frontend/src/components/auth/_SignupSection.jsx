import React, { useState } from 'react';
import { useSignupUserMutation } from '../../slices/api/apiUsersSlices';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../slices/comp.Slices/usersSlice';
import { useInputState } from '@mantine/hooks';
import Icon from '@mdi/react';
import {
  mdiClose,
  mdiCheck,
  mdiAt,
  mdiEyeClosed,
  mdiEyeOutline,
  mdiAccount,
  mdiPhone,
} from '@mdi/js';
import { Button, FileInput, Label, TextInput } from 'flowbite-react';
import { Box, Progress, Group, Text, Center } from '@mantine/core';

export default function SignupSection() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useInputState('');
  const [passwordConfirm, setPasswordConfirm] = useInputState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [signupUser] = useSignupUserMutation();

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Handle submit
    const userFormData = new FormData();
    userFormData.append('email', email);
    userFormData.append('password', password);
    userFormData.append('passwordConfirm', passwordConfirm);
    userFormData.append('fullName', fullName);
    userFormData.append('phoneNumber', phoneNumber);
    if (profileImage) {
      userFormData.append('profileImage', profileImage); // Append the file
    }

    try {
      const result = await signupUser(userFormData);
      const userData = result.data.data.user;

      dispatch(
        setCurrentUser({
          _id: userData._id,
        }),
      );
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const requirements = [
    { re: /[0-9]/, label: 'כולל ספרה אחת לפחות' },
    { re: /[a-z]/, label: 'כולל אות קטנה אחת לפחות' },
    { re: /[A-Z]/, label: 'כולל אות גדולה אחת לפחות' },
    { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: 'כולל סימן אחד לפחות' },
  ];

  const getStrength = function (password) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
      if (!requirement.re.test(password)) {
        multiplier += 1;
      }
    });
    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 0);
  };

  const handlePhoneNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters

    if (value.length > 10) {
      value = value.slice(0, 10); // Limit to 10 digits
    }

    if (value.length > 3 && value.length <= 6) {
      value = `${value.slice(0, 3)}-${value.slice(3)}`;
    } else if (value.length > 6) {
      value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
    }

    setPhoneNumber(value);
  };
  const testPhoneNumber = (val) => /^05\d-\d{3}-\d{4}$/.test(val);

  const strength = getStrength(password);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(password)}
    />
  ));
  const bars = Array(4)
    .fill(0)
    .map((_, index) => (
      <Progress
        styles={{ section: { transitionDuration: '0ms' } }}
        value={
          password.length > 0 && index === 0
            ? 100
            : strength >= ((index + 1) / 4) * 100
              ? 100
              : 0
        }
        color={strength > 80 ? 'teal' : strength > 50 ? 'yellow' : 'red'}
        key={index}
        size={4}
      />
    ));

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
              <Label value={'מספר טלפון נייד'} />
              <span className="text-red-500 text-sm mx-1">*</span>
            </div>
            <TextInput
              type="text"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              addon={<Icon path={mdiPhone} size={0.65} color="#8d949a" />}
              placeholder="051-234-5678"
              required
            />
            {phoneNumber && (
              <PasswordRequirement
                label={
                  testPhoneNumber(phoneNumber)
                    ? 'מספר טלפון חוקי'
                    : 'מספר טלפון לא חוקי'
                }
                meets={testPhoneNumber(phoneNumber)}
              />
            )}
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
              onChange={(e) => setProfileImage(e.target.files[0])}
              helperText="PNG/JPEG, max size of 1mb"
              color="gray"
            />
          </div>

          <div dir="ltr">
            <div dir="rtl">
              <Label value={'סיסמה'} />
              <span className="text-red-500 text-sm mx-1">*</span>
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
            <Group gap={5} grow mt="xs" mb="md">
              {bars}
            </Group>
            {getStrength(password) !== 100 ? (
              password.length !== 0 && (
                <>
                  <PasswordRequirement
                    label="לפחות 8 תוים"
                    meets={password.length > 5}
                  />
                  {checks}
                </>
              )
            ) : (
              <PasswordRequirement label="סיסמה חזקה" meets={true} />
            )}
          </div>

          <div dir="ltr">
            <div dir="rtl">
              <Label value={'אימות סיסמה'} />
              <span className="text-red-500 text-sm mx-1">*</span>
            </div>
            <TextInput
              size={5}
              type={isPasswordHidden ? 'password' : 'text'}
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
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
            {passwordConfirm.length > 0 && (
              <PasswordRequirement
                label={
                  password === passwordConfirm
                    ? 'הסיסמאות תואמות'
                    : 'הסיסמאות לא תואמות'
                }
                meets={password === passwordConfirm}
              />
            )}
          </div>
        </div>

        <div className="text-red-500 mb-2 text-sm">* שדות נדרשים</div>

        <Button type="submit" gradientDuoTone="greenToBlue" className="w-full">
          הרשמה
        </Button>
      </form>
    </div>
  );
}

function PasswordRequirement({ meets, label }) {
  return (
    <Text component="div" c={meets ? 'teal' : 'red'} size="sm" dir="rtl">
      <Center inline>
        {meets ? (
          <Icon path={mdiCheck} size={0.65} />
        ) : (
          <Icon path={mdiClose} size={0.65} />
        )}
        <Box>{label}</Box>
      </Center>
    </Text>
  );
}
