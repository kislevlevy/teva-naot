import React, { useEffect } from 'react';
import ProductCardSimple from './ProductCardSimple';
import ProductCardDetailed from './ProductCardDetailed';

export default function ProductList({ isDetailed , listToRender}) {
  console.log(listToRender);
  
  return (
    <>
      {listToRender}
      <div className="flex flex-wrap w-full">
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
