import { Button, Card, List } from 'flowbite-react';
import { toMoneyString } from '../../utils/helperFunctions';

export default function ChackoutSummery({PriceBeforeTax }) {
 
  const tax = Math.abs(PriceBeforeTax * 0.17);
  const finalPrice = PriceBeforeTax + tax
  const shippingPrice = finalPrice > 400 ? 0 : 25;

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

      <Button gradientDuoTone="greenToBlue">לתשלום</Button>
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
