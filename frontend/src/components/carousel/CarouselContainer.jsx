// Imports:
import React from 'react';
import { Link } from 'react-router-dom';

import { Carousel } from 'flowbite-react';

import { banners } from '../../utils/config';

// Component:
export default function CarouselContainer() {
  return (
    <div className="h-fit w-full">
      <Carousel
        className="rounded-none"
        slideInterval={5000}
        pauseOnHover
        theme={{
          scrollContainer: {
            base: 'flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth',
          },
          indicators: {
            active: {
              off: 'bg-white/50 hover:bg-white',
              on: 'bg-white w-[25px]',
            },
            base: 'h-[9px] w-[9px] rounded-full width-transition',
            wrapper: 'absolute bottom-5 left-1/2 flex -translate-x-1/2 space-x-2',
          },
        }}
      >
        {banners.href.map((_, i) => (
          <SlideCard
            key={`carousel-slide-${i}`}
            image={banners.images[i]}
            link={banners.href[i]}
          />
        ))}
      </Carousel>
    </div>
  );
}

// Heleper components:
function SlideCard({ image, link }) {
  return (
    <Link to={link}>
      <img src={image} alt="banner" />
    </Link>
  );
}
