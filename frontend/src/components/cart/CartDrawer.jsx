// Imports:
import { useEffect, useState } from 'react';

import { Button, Drawer } from 'flowbite-react';

import Icon from '@mdi/react';
import { mdiCartVariant } from '@mdi/js';
import CartProductCard from './_CartItem';
import { Link } from 'react-router-dom';
import {
  retrieveFromLocalStorage,
  deleteItemFromLS,
} from '../../utils/localStorage';
import { toMoneyString } from '../../utils/helperFunctions';

// Component:
export default function CartDrawer({ isCartOpen, setIsCartOpen }) {
  let items, sum;
  const [_productCartObj, setProductCartObj] = useState({});
  const [localStorage, setLocalStorage] = useState(0);
  const [_sum, setSum] = useState(0);
  const [_items, setItems] = useState(0);
  const [deletItem, setDeletItem] = useState(false);
  const { productCartObj } = retrieveFromLocalStorage();

  useEffect(() => {
    const { productCartObj } = retrieveFromLocalStorage();
    calc();
    setProductCartObj((prev) => {
      const obj = { ...productCartObj };
      prev = obj;
      return prev;
    });
    setDeletItem(false);
  }, [_items, setIsCartOpen, isCartOpen, deletItem]);

  const calc = () => {
    if (productCartObj) {
      sum = 0;
      items = productCartObj.cart?.reduce(
        (acc, ele, i) =>
          acc +
          Object.entries(ele.sizes).reduce((prev, [key, value]) => {
            sum += productCartObj.cache[i].price * value;
            return prev + value;
          }, 0),
        0
      );
    }
    setSum(sum);
    setItems(items);
    return items;
  };

  const handleClose = () => setIsCartOpen(false);
  const deleteProductFromLS = (id) => {
    deleteItemFromLS(id);
    setDeletItem(true);

    //local storage is just to forc rerender
    setLocalStorage(productCartObj.cart.length);
    setProductCartObj(productCartObj);
    calc();
  };

  return (
    <Drawer open={isCartOpen} onClose={handleClose}>
      <Drawer.Header
        title="סל הקניות שלך"
        titleIcon={() => (
          <Icon className="ml-3" path={mdiCartVariant} size={0.75} color="#6b7280" />
        )}
      />

      <Drawer.Items>
        {_productCartObj &&
          productCartObj &&
          productCartObj.cart.map((product, i) => (
            <CartProductCard
              key={'product-cart-' + i}
              {...productCartObj}
              i={i}
              deleteProductFromLS={deleteProductFromLS}
            />
          ))}
      </Drawer.Items>

      <div className="sticky bottom-0 w-full bg-white p-3 rounded-md shadow-md">
        <div>
          <div className="flex justify-between p-2 bg-gray-200 rounded-md">
            <div className="font-bold">
              {'פריטים: '}
              {_items && _items}
            </div>
            <div className="font-bold">
              {'סה"כ: '}
              {_sum && toMoneyString(_sum)}
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
