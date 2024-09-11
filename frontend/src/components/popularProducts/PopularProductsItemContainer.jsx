import { useEffect } from 'react';
import ProductList from '../product/ProductList';

export default function PopularProductsItemContainer({ selectedCategory }) {
  useEffect(() => {
    //SEND APIREQ FOR THE 3 CARDS OF THE REQUESTED TOPIC
  }, [selectedCategory]);
  return (
    <div className="product-content flex flex-grow flex-wrap w-full mb-6">
      <ProductList productsGroupArr={selectedCategory} />
    </div>
  );
}
