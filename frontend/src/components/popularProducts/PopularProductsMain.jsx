import { useState, useEffect } from 'react';

import AOS from 'aos';
import 'aos/dist/aos.css';

import PopularProductsItemContainer from './PopularProductsItemContainer';
import PopularProductsSidebar from './PopularProductsSidebar';
import PopularProductsButtonsGroup from './PopularProductsButtonGroup';
import { useGetPopularProductsQuery } from '../../slices/api/apiProductsSlices';

export default function PopularProducts() {
  // const popularProducts = useSelector((state) => state.popularProducts);
  const [selectedCategory, setSelectedCategory] = useState('selected');
  const { data, isSuccess } = useGetPopularProductsQuery();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    AOS.init();
    if (isSuccess) setProducts(data.data);
    console.log(data);
  }, [isSuccess]);

  return (
    <section className="relative pb-24 md:pb-16">
      <div
        className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <div className="relative">
          {/* Button Group for small screens */}
          <div className="md:hidden sticky top-0 z-50 bg-white shadow-md">
            <PopularProductsButtonsGroup setSelectedCategory={setSelectedCategory} />
          </div>

          <div className="flex justify-between align-top">
            <PopularProductsSidebar {...{ selectedCategory, setSelectedCategory }} />

            {products && (
              <PopularProductsItemContainer {...{ selectedCategory, products }} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
