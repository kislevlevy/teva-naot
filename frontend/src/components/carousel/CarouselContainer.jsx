import { Skeleton } from '@mui/material';
import { Carousel } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

const data = [
  {
    image: 'https://www.tevanaot.co.il/media/wysiwyg/slider_web_14.jpg',
    name: '#',
  },
  {
    image: 'https://www.tevanaot.co.il/media/wysiwyg/slider_web_12.jpg',
    name: '#',
  },
  {
    image: 'https://www.tevanaot.co.il/media/wysiwyg/slider_web_11.jpg',
    name: '#',
  },
  {
    image: 'https://www.tevanaot.co.il/media/wysiwyg/slider_web_9.jpg',
    name: '#',
  },
];

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
        {data.map((ele, i) => (
          <SlideCard key={`carousel-slide-${i}`} data={ele} />
        ))}
      </Carousel>
    </div>
  );
}

function SlideCard({ data }) {
  return (
    <Link to={data.link} state={{...location.state, from: location.pathname}}
>
      <img src={data.image} alt={data.name} />
    </Link>
  );
}
