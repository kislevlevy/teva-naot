import React, { useState, useEffect } from 'react';
import $ from 'jquery';

import { Button, Card, Label, List } from 'flowbite-react';
import { Autocomplete, Loader, TextInput } from '@mantine/core';

const user = {
  shippingAddress: {
    address: 'להב',
    city: 'להב',
    postalCode: '8533500',
  },
};

export default function CheckoutShipping() {
  const [isEditing, setIsEditing] = useState(false);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [cities, setCities] = useState(null);
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (!user.shippingAddress) setIsEditing(true);
    else {
      const { address, city, postalCode } = user?.shippingAddress;
      if (postalCode.length !== 7 || address.length < 3 || city.length < 3)
        setIsEditing(true);
      else {
        setAddress(address);
        setCity(city);
        setPostalCode(postalCode);
      }
    }
  }, []);

  const handleCityChange = (val) => {
    setCity(val);
    if (val.length < 1) setAutocompleteLoading(false);
    else {
      setAutocompleteLoading(true);
      $.ajax({
        url: 'https://data.gov.il/api/3/action/datastore_search',
        data: {
          resource_id: '5c78e9fa-c2e2-4771-93ff-7f400a12f7ba',
          limit: 5,
          q: val,
        },
        dataType: 'json',
        success: (data) => {
          setCities(data.result.records.map((ele) => ele.שם_ישוב));
          setAutocompleteLoading(false);
        },
      });
    }
  };
  const handleFinishEditing = () => {
    if (postalCode.length !== 7 || address.length < 3 || city.length < 3) {
      setIsValid(false);
      setIsEditing(true);
    } else {
      setIsEditing(false);
      // TODO: editMe endpoint to edit the shipping in db
      user.shippingAddress = { address, city, postalCode };
      setIsValid(true);
    }
  };

  return (
    <Card className="mb-4">
      <h3 className="font-bold text-lg text-emerald-500">כתובת למשלוח:</h3>
      {isEditing ? (
        <List unstyled className="space-y-3">
          <List.Item dir="rtl">
            <TextInput
              label="כתובת"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              error={
                address.length < 3 && address.length !== 0 ? 'כתובת לא תקינה' : null
              }
            />
          </List.Item>
          <List.Item dir="rtl">
            <Autocomplete
              label="עיר"
              required
              value={city}
              onChange={handleCityChange}
              data={cities}
              rightSection={autocompleteLoading ? <Loader size="1rem" /> : null}
              error={city.length < 3 && city.length !== 0 ? 'עיר לא תקינה' : null}
            />
          </List.Item>
          <List.Item dir="rtl">
            <TextInput
              label="מיקוד"
              required
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              error={
                postalCode.length !== 7 && postalCode.length !== 0
                  ? 'מיקוד לא תקין'
                  : null
              }
            />
          </List.Item>
          {!isValid && <p className="text-red-600 text-sm ">כתובת משלוח לא תקינה</p>}
          <Button
            onClick={handleFinishEditing}
            className="m-auto w-full"
            gradientDuoTone="greenToBlue"
          >
            עדכן
          </Button>
        </List>
      ) : (
        <List unstyled className="space-y-1">
          <List.Item>
            <div className="flex flex-row justify-between w-full">
              <p>כתובת</p>
              <p className="font-bold">{address}</p>
            </div>
          </List.Item>
          <List.Item>
            <div className="flex flex-row justify-between w-full">
              <p>עיר</p>
              <p className="font-bold">{city}</p>
            </div>
          </List.Item>
          <List.Item>
            <div className="flex flex-row justify-between w-full">
              <p>מיקוד</p>
              <p className="font-bold">{postalCode}</p>
            </div>
          </List.Item>
          <Button
            onClick={() => setIsEditing(true)}
            className="m-auto w-full"
            gradientDuoTone="greenToBlue"
            outline
          >
            ערוך
          </Button>
        </List>
      )}
    </Card>
  );
}
