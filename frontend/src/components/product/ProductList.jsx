import React from 'react';
import ProductCardSimple from './ProductCardSimple';

export default function ProductList() {
  return (
    <>
      <div className="flex w-[100%] flex-wrap">
        {[1, 1, 1, 1].map((ele, i) => (
          <ProductCardSimple
            key={i}
            responsive="max-w-lg sm:max-w-md md:max-w-sm lg:max-w-xs"
          />
        ))}
      </div>
    </>
  );
}
