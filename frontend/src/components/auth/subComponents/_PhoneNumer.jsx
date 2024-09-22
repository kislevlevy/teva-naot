import { Label, TextInput } from 'flowbite-react';
import React from 'react';
import PasswordRequirement from './_PasswordRequirement';
import Icon from '@mdi/react';
import { mdiPhone } from '@mdi/js';

export default function PhoneNumer({
  phoneNumber,
  setPhoneNumber,
  isRequired = true,
}) {
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

  return (
    <>
      <div dir="ltr">
        <div dir="rtl">
          <Label value={'מספר טלפון נייד'} />
          {isRequired && <span className="text-red-500 text-sm mx-1">*</span>}
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
              testPhoneNumber(phoneNumber) ? 'מספר טלפון חוקי' : 'מספר טלפון לא חוקי'
            }
            meets={testPhoneNumber(phoneNumber)}
          />
        )}
      </div>
    </>
  );
}
