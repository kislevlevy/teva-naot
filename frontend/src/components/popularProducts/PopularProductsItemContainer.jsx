import { useEffect, useState } from 'react';

import ProductList from '../product/ProductList';

export default function PopularProductsItemContainer({
  selectedCategory,
  products,
}) {
  const [productsArr, setProductsArr] = useState([]);

  const displayProducts = (cat) => {
    switch (cat) {
      case 'all':
        setProductsArr([
          ...products.discountedProducts,
          ...products.topSoldProducts,
        ]);
        break;
      case 'popular':
        setProductsArr(products.discountedProducts);
        break;
      case 'selected':
        setProductsArr(products.topSoldProducts);
        break;
    }
  };

  useEffect(() => {
    displayProducts(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="flex flex-wrap flex-grow w-full mb-6 product-content">
      {productsArr.length > 0 && <ProductList productsGroupArr={productsArr} />}
    </div>
  );
}
