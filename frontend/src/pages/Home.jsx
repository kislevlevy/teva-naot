import Shop from '../components/shop/Shop';
import FooterMainComp from '../components/footer/FooterMainComp';
import PopularProductsSection from '../components/productsShow/PopularProductsMain';

const Home = () => {
  return (
    <>
      <PopularProductsSection />
      <Shop />
      <FooterMainComp />
    </>
  );
};
export default Home;
