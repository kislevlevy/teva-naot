import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Button, Card, List } from 'flowbite-react';
import Adress from '../../profile/subComponents/_Adress';

export default function Shipping({
  address,
  setAddress,
  city,
  setCity,
  postalCode,
  setPostalCode,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const currentUser = useSelector((state) => state.userState.user);

  useEffect(() => {
    if (!currentUser.shippingAddress) setIsEditing(true);
    else {
      const { address, city, postalCode } = currentUser?.shippingAddress;
      if (postalCode.length !== 7 || address.length < 3 || city.length < 3)
        setIsEditing(true);
      else {
        setAddress(address);
        setCity(city);
        setPostalCode(postalCode);
      }
    }
  }, []);

  const handleFinishEditing = () => {
    if (postalCode.length !== 7 || address.length < 3 || city.length < 3) {
      setIsValid(false);
      setIsEditing(true);
    } else {
      setIsEditing(false);
      setIsValid(true);
    }
  };

  return (
    <Card className="mb-4">
      <h3 className="text-lg font-bold text-emerald-500">כתובת למשלוח:</h3>
      {isEditing ? (
        <List unstyled className="space-y-3">
          <Adress
            {...{
              address,
              setAddress,
              city,
              setCity,
              postalCode,
              setPostalCode,
            }}
          />
          {!isValid && <p className="text-sm text-red-600 ">כתובת משלוח לא תקינה</p>}

          <Button
            onClick={handleFinishEditing}
            className="w-full m-auto"
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
            className="w-full m-auto"
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
