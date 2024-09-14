// Imports:
import React from 'react';

import Icon from '@mdi/react';
import {
  mdiClose,
  mdiEyeOutline,
  mdiHeartOutline,
  mdiTrashCanOutline,
} from '@mdi/js';
import { Card } from 'flowbite-react';

// Component:
export default function CartProductCard({ product }) {
  const sizesArr = Object.keys(product.sizes);

  return (
    <Card
      className="max-w-xs flex-row mb-1"
      horizontal
      renderImage={() => (
        <img
          className="w-1/3 object-cover"
          src={product.images[0]}
          alt={product.name}
        />
      )}
    >
      <div className="relative w-36">
        <div className="flex flex-col rtl">
          <h4 className="font-bold text-[#64b496]">{product.name}</h4>
          <div>
            {'צבע: '}
            {product.color}
          </div>
          <div>
            {sizesArr.length > 1 ? 'מידות: ' : 'מידה: '}
            {sizesArr.join(', ')}
          </div>

          <div>
            {'כמות: '}
            {Object.entries(product.sizes).reduce((prev, [_, val]) => prev + val, 0)}
          </div>
          <div>
            {'מחיר: '}
            {product.discountPrice && (
              <span className="mr-1 text-sm text-gray-500 line-through">
                {product.discountPrice}₪
              </span>
            )}
            <span className="mr-1 font-bold text-emerald-500 text-md">
              {product.price}₪
            </span>
          </div>
        </div>
        <div
          className="hover:text-red-500 text-gray-400 cursor-pointer absolute top-0 left-0"
          onClick={() => 'TODO:'}
        >
          <Icon path={mdiTrashCanOutline} size={1} />
        </div>
      </div>
    </Card>
  );
}
