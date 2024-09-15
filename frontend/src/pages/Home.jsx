// Imports:
import Shop from '../components/shop/Shop';
import PopularProductsSection from '../components/popularProducts/PopularProductsMain';
import CarouselContainer from '../components/carousel/CarouselContainer';
import NotificationComp from '../components/notificationHandler/NotificationComp';
// import { ToastContainer } from 'react-toastify';

// Component:
export default function Home() {
 
  return (
    <>
      <CarouselContainer />
      <PopularProductsSection />
      <Shop />
      <NotificationComp/>
    </>
  );
}
