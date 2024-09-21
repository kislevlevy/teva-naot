import { Autocomplete, Loader, TextInput } from '@mantine/core';
import { List } from 'flowbite-react';
import $ from 'jquery';

import React, { useState } from 'react';

export default function Adress({
  address,
  setAddress,
  city,
  setCity,
  postalCode,
  setPostalCode,
}) {
  const [autocompleteLoading, setAutocompleteLoading] = useState(false);
  const [cities, setCities] = useState(null);

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

  return (
    <>
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
    </>
  );
}
