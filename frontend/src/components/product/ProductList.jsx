// Imports:
import React, { useState } from 'react';

import ProductModal from './_ProductModal';
import ProductCardSimple from './_ProductCardSimple';
import ProductCardDetailed from './_ProductCardDetailed';

// Component:
export default function ProductList({ isDetailed=false, productsGroupArr }) {
  const [productModalId, setProductModalId] = useState('');

  return (
    <>
      {productModalId && <ProductModal {...{ productModalId, setProductModalId }} />}
      <div className="flex flex-wrap w-full justify-center md:justify-auto">
        {productsGroupArr.map((product, i) =>
          isDetailed ? (
            <ProductCardDetailed {...{ setProductModalId, product }} key={i} />
          ) : (
            <ProductCardSimple {...{ setProductModalId, product }} key={i} />
          ),
        )}
      </div>
    </>
  );
}
