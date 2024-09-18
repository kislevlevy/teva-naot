import { Button, Card, List } from 'flowbite-react';
import React from 'react';

export default function ChackoutSummery({ products }) {
  const finalPrice = products.reduce(
    (acc, { price, sizes }) =>
      acc + price * Object.values(sizes).reduce((acc, val) => acc + val, 0),
    0,
  );
  const tax = Math.abs(finalPrice - finalPrice * 1.17);
  const shippingPrice = finalPrice > 400 ? 0 : 25;

  return (
    <Card>
      <h3 className="font-bold text-lg text-emerald-500">סיכום הזמנה:</h3>
      <List unstyled>
        <List.Item>{createListItem(finalPrice - tax, 'סכום ביניים')}</List.Item>
        <List.Item>{createListItem(tax, 'מע"מ')}</List.Item>
        <List.Item>{createListItem(shippingPrice, 'משלוח')}</List.Item>

        <hr className="my-2 border-gray-300" />

        <List.Item className="text-emerald-500">
          {createListItem(finalPrice + shippingPrice, 'סך הכל')}
        </List.Item>
      </List>

      <Button gradientDuoTone="greenToBlue">לתשלום</Button>
    </Card>
  );
}

function createListItem(val, lable) {
  return (
    <div className="flex flex-row justify-between w-full">
      <p>{lable}</p>
      <p className="font-bold">{Math.floor(val * 100) / 100}₪</p>
    </div>
  );
}
