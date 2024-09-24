import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card, List } from 'flowbite-react';

import { retrieveFromLocalStorage } from '../../utils/localStorage';
import { useCreateOrderMutation } from '../../slices/api/apiOrdersSlices';
import { toMoneyString } from '../../utils/helperFunctions';
export default function ChackoutSummery({ PriceBeforeTax, address }) {
  const [createOrder] = useCreateOrderMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState('');

  const tax = Math.abs(PriceBeforeTax * 0.17);
  const finalPrice = PriceBeforeTax + tax;
  const shippingPrice = finalPrice > 400 ? 0 : 25;

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const {
        productCartObj: { cart },
      } = retrieveFromLocalStorage();
      if (cart.length < 1) throw new Error('Cart is empty');

      const data = await createOrder({ products: cart, shippingAddress: address });
      const { url } = data.data.data;
      localStorage.removeItem('productCart');

      window.location.href = url;
    } catch (err) {
      setIsLoading(false);
      setIsError(err.message);
    }
  };

  return (
    <Card>
      <h3 className="font-bold text-lg text-emerald-500">סיכום הזמנה:</h3>
      <List unstyled>
        <List.Item>{createListItem(PriceBeforeTax, 'סכום ביניים')}</List.Item>
        <List.Item>{createListItem(tax, 'מע"מ')}</List.Item>
        <List.Item>{createListItem(shippingPrice, 'משלוח')}</List.Item>

        <hr className="my-2 border-gray-300" />

        <List.Item className="text-emerald-500">
          {createListItem(finalPrice + shippingPrice, 'סך הכל')}
        </List.Item>
      </List>
      {isError && <p className="text-xs text-red-500">{isError}</p>}
      <Button
        isProcessing={isLoading}
        gradientDuoTone="greenToBlue"
        onClick={handleSubmit}
      >
        לתשלום
      </Button>
    </Card>
  );
}

function createListItem(val, lable) {
  return (
    <div className="flex flex-row justify-between w-full">
      <p>{lable}</p>
      <p className="font-bold">{toMoneyString(Math.floor(val * 100) / 100)}</p>
    </div>
  );
}
