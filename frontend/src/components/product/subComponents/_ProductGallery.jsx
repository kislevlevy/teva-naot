import React, { useEffect } from 'react';
import hoverFunc from '../../../utils/hover';
import '../../../styles/modules/hover.css';

export default function ProductGallery({ images, setActiveImg, activeImg }) {
  useEffect(() => {
    hoverFunc();
  }, []);

  return (
    <div>
      <div
        className="img_producto_container rounded-xl border-2 border-slate-200"
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
        {images.map((img, i) => (
          <img
            key={i}
            onClick={(e) => {
              setActiveImg(img);
              e.target.scrollIntoView({ behavior: 'smooth', inline: 'center' });
            }}
            src={img}
            className="mx-0.5 h-full w-12 cursor-pointer rounded-lg object-cover"
          />
        ))}
      </div>
    </div>
  );
}