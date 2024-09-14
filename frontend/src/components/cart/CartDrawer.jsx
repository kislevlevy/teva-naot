// Imports:
import React, { useContext } from 'react';

import { Button, Drawer } from 'flowbite-react';

import Icon from '@mdi/react';
import { mdiCartVariant } from '@mdi/js';
import CartProductCard from './_CartItem';
import { Link } from 'react-router-dom';

// Component:
export default function CartDrawer({ isCartOpen, setIsCartOpen }) {
  const products = [
    {
      name: 'שחר נשים',
      price: 429,
      discountPrice: 499,
      sizes: {
        37: 1,
        39: 2,
      },
      color: 'חום',
      images: [
        'https://res.cloudinary.com/drxtaxnkr/image/upload/v1726133788/101101-413-01_1_11_1_gdkvcd.jpg',
      ],
    },
    {
      name: 'רותם נשים',
      price: 449,
      sizes: {
        35: 1,
      },
      color: 'לבן',
      images: [
        'https://res.cloudinary.com/drxtaxnkr/image/upload/v1726133788/101101-413-01_1_11_1_gdkvcd.jpg',
      ],
    },
  ];
  let sum = 0;
  const items = products.reduce(
    (acc, ele) =>
      acc +
      Object.entries(ele.sizes).reduce((prev, [key, value]) => {
        sum += ele.price * value;
        return prev + value;
      }, 0),
    0,
  );

  const handleClose = () => setIsCartOpen(false);

  return (
    <Drawer open={isCartOpen} onClose={handleClose}>
      <Drawer.Header
        title="סל הקניות שלך"
        titleIcon={() => (
          <Icon className="ml-3" path={mdiCartVariant} size={0.75} color="#6b7280" />
        )}
      />
      <Drawer.Items>
        {products.map((product, i) => (
          <CartProductCard key={'product-cart-' + i} product={product} />
        ))}
      </Drawer.Items>
      <div className="sticky bottom-0 w-full bg-white p-3 rounded-md shadow-md">
        <div>
          <div className="flex justify-between p-2 bg-gray-200 rounded-md">
            <div className="font-bold">
              {'פריטים: '}
              {items}
            </div>
            <div className="font-bold">
              {'סה"כ: '}
              {sum}₪
            </div>
          </div>
          <div className="flex justify-between my-2">
            <Button
              onClick={handleClose}
              className="w-2/4 m-1"
              outline
              gradientDuoTone="greenToBlue"
            >
              המשך בקניות
            </Button>
            <Link className="w-2/4 m-1" to={'TODO:'}>
              <Button gradientDuoTone="greenToBlue">לתשלום בקופה</Button>
            </Link>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
