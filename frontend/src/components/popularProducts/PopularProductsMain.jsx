import { useState, useEffect } from 'react';
import AOS from 'aos'; // To use AOS for animation
import 'aos/dist/aos.css'; // Import AOS CSS
import PopularProductsItemContainer from './PopularProductsItemContainer';
import PopularProductsSidebar from './PopularProductsSidebar';
import PopularProductsButtonsGroup from './PopularProductsButtonGroup';
import { useSelector } from 'react-redux';
import { useGetPopularProductsQuery } from '../../slices/api/apiProductsSlices';

export default function PopularProducts() {
  // const popularProducts = useSelector((state) => state.popularProducts);
  const [selectedCategory, setSelectedCategory] = useState('מוצרים נבחרים');

  useEffect(() => {
    AOS.init();
  }, []);

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
         <PopularProductsSidebar {...{selectedCategory,setSelectedCategory}} />

         <PopularProductsItemContainer selectedCategory={selectedCategory}/> 
          </div>
        </div>
      </div>
    </section>
  );
}
