import React from 'react';
import { Table, Button } from 'flowbite-react';
import Icon from '@mdi/react';
import { mdiMinusBoxOutline, mdiPlusBoxOutline, mdiTrashCanOutline } from '@mdi/js';
import { useLocation, useNavigate } from 'react-router-dom';

export default function CheckoutItem({ product }) {
  const sizesArr = Object.keys(product.sizes);

  const navigate = useNavigate();
  const location = useLocation();
  const goToProductPage = () =>
    navigate(`/products/product/${product.slug}`, {
      state: { ...(location.state || {}), _id: product._id },
    });

  return sizesArr.map((size, i) => (
    <Table.Row key={`${product._id}-${i}`}>
      <Table.Cell className="flex">
        <div className="flex flex-col justify-center items-center ml-1">
          <div
            className="hover:text-green-500 text-gray-400 cursor-pointer"
            onClick={() => 'TODO:'}
          >
            <Icon path={mdiPlusBoxOutline} size={1} />
          </div>
          <div
            className="hover:text-green-500 text-gray-400 cursor-pointer mb-2"
            onClick={() => 'TODO:'}
          >
            <Icon path={mdiMinusBoxOutline} size={1} />
          </div>
          <div
            className="hover:text-red-500 text-gray-400 cursor-pointer"
            onClick={() => 'TODO:'}
          >
            <Icon path={mdiTrashCanOutline} size={1} />
          </div>
        </div>
        <img
          className="min-w-16 h-20 object-cover m-auto rounded-lg"
          src={product.images[0]}
          alt={product.name}
        />
      </Table.Cell>
      <Table.Cell>
        <div
          className="text-center font-bold text-[#64b496] hover:underline cursor-pointer"
          onClick={goToProductPage}
        >
          {product.name}
        </div>
      </Table.Cell>
      <Table.Cell className="text-right">
        <div className="min-w-14">
          {'צבע: '}
          {product.color}
        </div>
        <div className="min-w-14">
          {'מידה: '}
          {size}
        </div>
        <div className="min-w-14">
          {'כמות: '}
          {product.sizes[size]}
        </div>
      </Table.Cell>
      <Table.Cell className="text-center">
        {product.discountPrice && (
          <span className="mr-1 text-sm text-gray-500 line-through">
            {product.discountPrice}₪
          </span>
        )}
        <span className="mr-1 font-bold text-emerald-500 text-md">
          {product.price}₪
        </span>
      </Table.Cell>
    </Table.Row>
  ));
}
