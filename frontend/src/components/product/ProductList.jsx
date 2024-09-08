import React, { useEffect } from 'react';
import ProductCardSimple from './ProductCardSimple';
import ProductCardDetailed from './ProductCardDetailed';

export default function ProductList({ isDetailed }) {
  return (
    <>
      <div className="flex w-full flex-wrap">
        {[1, 1, 1, 1].map((ele, i) =>
          isDetailed ? (
            <ProductCardDetailed key={i} />
          ) : (
            <ProductCardSimple key={i} />
          ),
        )}
      </div>
    </>
  );
}
