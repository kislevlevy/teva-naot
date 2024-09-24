// Imports:
import { useEffect, useState, useRef } from 'react';
import PopularProductsSection from '../components/popularProducts/PopularProductsMain';
import CarouselContainer from '../components/carousel/CarouselContainer';
import SpinnerComponent from '../utils/SpinnerComponent';

export default function Home() {
  const iframeRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const iframObserverCallback = (elements) => {
      elements.forEach((el) => {
        if (el.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      });
    };
    const observer = new IntersectionObserver(iframObserverCallback, {
      threshold: 0.1,
    });
    if (iframeRef.current) {
      observer.observe(iframeRef.current);
    }
    return () => {
      if (iframeRef.current) {
        observer.unobserve(iframeRef.current);
      }
    };
  }, []);
  return (
    <>
      <CarouselContainer />
      <PopularProductsSection />

      <div
        ref={iframeRef}
        style={{ width: '100%', height: 300, display: 'grid', placeItems: 'center' }}
      >
        {!isVisible ? (
          <SpinnerComponent />
        ) : (
          <iframe
            title="vimeo-player"
            src="https://player.vimeo.com/video/1003711822?h=c57ca44b60"
            width="100%"
            height="100%"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </>
  );
}
