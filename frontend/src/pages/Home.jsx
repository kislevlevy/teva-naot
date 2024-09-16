// Imports:
import Shop from '../components/shop/Shop';
import PopularProductsSection from '../components/popularProducts/PopularProductsMain';
import CarouselContainer from '../components/carousel/CarouselContainer';

// Component:
export default function Home() {
 
  return (
    <>
      <CarouselContainer />
      <PopularProductsSection />
      <Shop />
    </>
  );
}
