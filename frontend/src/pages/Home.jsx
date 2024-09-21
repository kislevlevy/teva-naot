// Imports:
import PopularProductsSection from '../components/popularProducts/PopularProductsMain';
import CarouselContainer from '../components/carousel/CarouselContainer';

// Component:
export default function Home() {
  return (
    <>
      <CarouselContainer />
      <PopularProductsSection />
      <div className="w-full p-2" style={{ height: '50vh' }}>
        <iframe
          title="vimeo-player"
          src="https://player.vimeo.com/video/1003711822?h=c57ca44b60"
          width="100%"
          height="100%"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}
