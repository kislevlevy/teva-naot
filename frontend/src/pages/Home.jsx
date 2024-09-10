import Shop from '../components/shop/Shop';
import FooterMainComp from '../components/footer/FooterMainComp';
import PopularProductsSection from '../components/productsShow/PopularProductsMain';

export default function Home() {
  return (
    <>
      <PopularProductsSection />
      <Shop />
      <FooterMainComp />
    </>
  );
}
