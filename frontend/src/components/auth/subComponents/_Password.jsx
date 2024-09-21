import React, { useState } from 'react';

import Icon from '@mdi/react';
import { mdiEyeClosed, mdiEyeOutline } from '@mdi/js';
import { Label, TextInput } from 'flowbite-react';
import { Progress, Group } from '@mantine/core';

import PasswordRequirement from './_PasswordRequirement';

export default function Password({
  password,
  setPassword,
  passwordConfirm,
  setPasswordConfirm,
}) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

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
    <>
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
              password === passwordConfirm ? 'הסיסמאות תואמות' : 'הסיסמאות לא תואמות'
            }
            meets={password === passwordConfirm}
          />
        )}
      </div>
    </>
  );
}
