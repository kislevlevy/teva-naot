// Imports:
import React, { useContext } from 'react';

import { Button, Drawer } from 'flowbite-react';

import Icon from '@mdi/react';
import { mdiCartVariant } from '@mdi/js';
import CartProductCard from './_CartItem';
import { Link } from 'react-router-dom';
import { retrieveFromLocalStorage } from '../../utils/localStorage';
// Component:
export default function CartDrawer({ isCartOpen, setIsCartOpen }) {
  const { productCartObj } = retrieveFromLocalStorage();
  let cart, cache, items, sum;
  if (productCartObj) {
    let { cart, cache } = productCartObj;
  }

  if (cart && cart.length > 0) {
    sum = 0;
    items = cart?.reduce(
      (acc, ele, i) =>
        acc +
        Object.entries(ele.sizes).reduce((prev, [key, value]) => {
          sum += cache[i].price * value;
          return prev + value;
        }, 0),
      0,
    );
  }

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
        {cart?.length > 0 &&
          cache.map((product, i) => (
            <CartProductCard key={'product-cart-' + i} {...productCartObj} i={i} />
          ))}
      </Drawer.Items>
      <div className="sticky bottom-0 w-full bg-white p-3 rounded-md shadow-md">
        <div>
          <div className="flex justify-between p-2 bg-gray-200 rounded-md">
            <div className="font-bold">
              {'פריטים: '}
              {items && items}
            </div>
            <div className="font-bold">
              {'סה"כ: '}
              {sum && sum}₪
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
            <Link
              className="w-2/4 m-1"
              to="/checkout"
              state={{ ...location.state, from: location.pathname }}
            >
              <Button onClick={handleClose} gradientDuoTone="greenToBlue">
                לתשלום בקופה
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Drawer>
  );
}
