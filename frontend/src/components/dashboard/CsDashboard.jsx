import React, { useEffect, useState } from 'react';

import { TextInput, Select, Button, Label, Card } from 'flowbite-react';
import { Icon } from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import { Container } from '@mui/material';

import {
  useEditUserByIdMutation,
  useGetUsersQuery,
} from '../../slices/api/apiUsersSlices';

export default function CsDashboard() {
  const [filterStr, setFilterStr] = useState('');
  const [searchOption, setSearchOption] = useState('_id');
  const [query, setQuery] = useState('');
  const [user, setUser] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { data, isSuccess } = useGetUsersQuery(filterStr || '');
  const [editUserById] = useEditUserByIdMutation();

  const onSearch = (e) => {
    e.preventDefault();
    if (query)
      setFilterStr(`?${searchOption}=${query}&fields=fullName,email,phoneNumber`);
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const dbUser = data.data.docs[0];
      const body = {};

      user.password && (body.password = user.password);
      user.email !== dbUser.email && (body.email = user.email);
      user.fullName !== dbUser.fullName && (body.fullName = user.fullName);
      user.phoneNumber !== dbUser.phoneNumber &&
        (body.phoneNumber = user.phoneNumber);

      await editUserById({ id: dbUser._id, body });

      setIsEditing(false);
      setIsLoading(false);
    } catch (_) {
      setIsLoading(false);
      // setIsError('There was an error editing the product');
    }
  };

  const handleInput = (key) => (e) =>
    setUser((prev) => ({ ...prev, [key]: e.target.value }));

  useEffect(() => {
    if (isSuccess) {
      setUser(data.data.docs[0]);
    }
  }, [data]);

  return (
    <>
      <form
        dir="rtl"
        onSubmit={onSearch}
        className=" mb-2 p-2 flex justify-between items-center bg-gray-50 rounded-lg"
      >
        <div className="flex gap-x-1">
          <TextInput
            type="text"
            placeholder={`חפש לפי ${
              searchOption === '_id' ? 'מזהה לקוח' : 'דוא"ל'
            }...`}
            className="rounded"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            icon={() => (
              <Icon className="text-gray-400" path={mdiMagnify} size={0.7} />
            )}
          />
          <Select
            value={searchOption}
            onChange={(e) => setSearchOption(e.target.value)}
            className="rounded w-28"
          >
            <option value="_id">מזהה לקוח</option>
            <option value="email">{'דוא"ל'}</option>
          </Select>
        </div>
        <Button color="gray" onClick={() => setFilterStr('')}>
          אפס חיפוש
        </Button>
        <input type="submit" hidden />
      </form>

      {user && (
        <Card className="max-w-sm mx-auto my-5 rtl">
          <form>
            <div>
              <Label value='דוא"ל' />
              <TextInput
                dir="ltr"
                disabled={!isEditing}
                value={user.email}
                onChange={handleInput('email')}
              />
            </div>
            <div>
              <Label value="שם מלא" />
              <TextInput
                disabled={!isEditing}
                value={user.fullName}
                onChange={handleInput('fullName')}
              />
            </div>
            <div>
              <Label value="מספר טלפון" />
              <TextInput
                dir="ltr"
                disabled={!isEditing}
                value={user.phoneNumber}
                onChange={handleInput('phoneNumber')}
              />
            </div>
            <div>
              <Label value="סיסמה" />
              <TextInput
                value={user?.password}
                disabled={!isEditing}
                onChange={handleInput('password')}
              />
            </div>
            <div className="my-2 gap-x-1 flex justify-center">
              {isEditing ? (
                <>
                  <Button onClick={onSubmit}>שמור</Button>
                  <Button onClick={() => setIsEditing(false)}>בטל</Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)}>ערוך</Button>
              )}
            </div>
          </form>
        </Card>
      )}
    </>
  );
}
