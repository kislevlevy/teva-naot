import { useEffect, useState, useRef } from 'react';

import { Table } from 'flowbite-react';

import CheckoutItem from './_CheckoutTableItem';
import {
  retrieveFromLocalStorage,
  updateQuantity,
  deleteItemFromLS,
} from '../../utils/localStorage';

export default function CheckoutTable({ setPriceBeforeTax }) {
  const { productCartObj } = retrieveFromLocalStorage();
  const [_product, setProduct] = useState([]);
  const [update, setUpdate] = useState(false);
  if (productCartObj == null) {
  }
  const productRef = useRef(productCartObj ? productCartObj : {}).current;

  useEffect(() => {
    if (productCartObj) {
      const { cart, cache } = productCartObj;
      setProduct((prev) => {
        prev = [];
        cache?.map((obj, i) => {
          const newObj = {
            productColor: cart[i].productColor,
            image: obj.image,
            productName: obj.productName,
            productColorName: obj.productColorName,
            update: [update],
          };
          prev = [...prev, newObj];
        });
        let finalArr = [];
        prev.map((obj, i) => {
          let newObj;
          Object.entries(cart[i].sizes).map((zisesArr) => {
            newObj = {
              ...obj,
              size: zisesArr[0],
              quantity: zisesArr[1],
              price: cache[i].price * zisesArr[1],
            };
            finalArr.push(newObj);
          });
        });
        prev = finalArr;
        return prev;
      });
      setUpdate(false);
    } else {
      setProduct(null);
    }
  }, [productRef, update]);
  const addQuantity = (id, size) => {
    const update = updateQuantity(id, size, 'plus');
    if (update) setUpdate(update);
  };
  const reduceQuntity = (id, size) => {
    const update = updateQuantity(id, size, 'minus');
    if (update) setUpdate(update);
  };
  const deleteItem = (id, size) => {
    const update = deleteItemFromLS(id, size);
    if (update) setUpdate(update);
  };
  return (
    <Table
      hoverable
      className="bg-white"
      theme={{
        root: {
          base: 'w-full text-left text-sm text-gray-500 dark:text-gray-400 rounded-lg shadow-lg',
        },
        head: {
          cell: {
            base: 'bg-gray-50 px-6 py-3 dark:bg-gray-700 rounded-t-lg',
          },
        },
      }}
    >
      {_product && (
        <>
          <Table.Head>
            <Table.HeadCell className="text-center">פריט</Table.HeadCell>
            <Table.HeadCell className="text-center">שם</Table.HeadCell>
            <Table.HeadCell className="text-center">מידע</Table.HeadCell>
            <Table.HeadCell className="text-center">מחיר</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            <CheckoutItem
              p={_product}
              setPriceBeforeTax={setPriceBeforeTax}
              addQuantity={addQuantity}
              reduceQuntity={reduceQuntity}
              deleteItem={deleteItem}
            />
          </Table.Body>
        </>
      )}
    </Table>
  );
}
