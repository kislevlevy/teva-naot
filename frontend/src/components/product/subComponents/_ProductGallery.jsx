// Imports:
import React, { useEffect } from 'react';

import hoverFunc from '../../../utils/hover';
import '../../../styles/modules/hover.css';

// Component:
export default function ProductGallery({
  imagesArr,
  setActiveImg,
  activeImg,
  classNames,
}) {
  useEffect(() => {
    hoverFunc();
  }, []);

  return (
    <div className={classNames}>
      <div
        className={
          'img_producto_container rounded-xl border-2 border-slate-200 w-full'
        }
        data-scale="1.6"
      >
        <a
          className="dslc-lightbox-image img_producto"
          target="_self"
          style={{
            backgroundImage: `url(${activeImg})`,
          }}
        ></a>
      </div>
      <div className="flex h-12 my-2 overflow-hidden">
        {imagesArr.map((img, i) => {
          // const isScroll = e.target.parentElement.clientWidth / 48;
          return (
            <img
              key={i}
              onClick={(e) => {
                setActiveImg(img);
                e.target.scrollIntoView({
                  behavior: 'smooth',
                  inline: 'center',
                  block: 'nearest',
                });
              }}
              src={img}
              className="mx-0.5 h-full w-12 cursor-pointer rounded-lg object-cover"
            />
          );
        })}
      </div>
    </div>
  );
}
