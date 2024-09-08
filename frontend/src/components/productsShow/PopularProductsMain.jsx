import { useState, useEffect} from "react";
import AOS from 'aos'; // To use AOS for animation
import 'aos/dist/aos.css'; // Import AOS CSS
import PopularProductsItemContainer from "./PopularProductsItemContainer";
import PopularProductsSidebar from "./PopularProductsSidebar";
import PopularProductsButtonsGroup from "./PopularProductsButtonGroup";



export default function PopularProducts() {

  useEffect(() => {
    AOS.init();
  }, []);  const [selectedCategory, setSelectedCategory] = useState("")

  return (
    <section className="relative pb-24 md:pb-16">
      <div 
        className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl"
        data-aos="fade-up"
        data-aos-duration="2000"
      >
        <div className="mb-8 w-full">
          <div className="text-center mb-4">
            <h2 className="text-4xl font-bold leading-snug text-gray-900 md:text-3xl sm:text-2xl">
              Popular Products
            </h2>
          </div>
        </div>
        <div className="relative">
          {/* Button Group for small screens */}
          <div className="md:hidden sticky top-0 z-50 bg-white shadow-md">
            <PopularProductsButtonsGroup setSelectedCategory={setSelectedCategory} />
          </div>

          <div className="flex justify-between align-top">   
              <PopularProductsSidebar setSelectedCategory={setSelectedCategory} />
            <PopularProductsItemContainer selectedCategory={selectedCategory} />
          </div>
        </div>
      </div>
    </section>
  );
}
