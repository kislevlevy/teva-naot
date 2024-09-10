// Imports:
import React, { useState } from 'react';

import ProductModal from './_ProductModal';
import ProductCardSimple from './_ProductCardSimple';
import ProductCardDetailed from './_ProductCardDetailed';

// Component:
export default function ProductList({ isDetailed }) {
  const [productModalId, setProductModalId] = useState('');

  return (
    <>
      {productModalId && <ProductModal {...{ productModalId, setProductModalId }} />}
      <div className="flex flex-wrap w-full justify-center md:justify-auto">
        {[1, 1, 1, 1].map((ele, i) =>
          isDetailed ? (
            <ProductCardDetailed {...{ setProductModalId }} key={i} />
          ) : (
            <ProductCardSimple {...{ setProductModalId }} key={i} />
          ),
        )}
      </div>
    </>
  );
}
