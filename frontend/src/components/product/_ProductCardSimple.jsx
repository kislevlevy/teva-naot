// Imports:
import React, { useEffect, useState, useCallback } from 'react';

import Icon from '@mdi/react';
import { mdiEyeOutline, mdiHeartOutline } from '@mdi/js';
import { Card } from 'flowbite-react';

import hoverFunc from '../../utils/hover';
import '../../styles/modules/hover.css';
import StarComponent from './subComponents/_StarComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { slugify } from '../../utils/slugify';

// Component:
export default function ProductCardSimple({ setProductModalId, product }) {
  const [isHover, setIsHover] = useState(false);

  const hoverEffect = useCallback(() => {
    hoverFunc();
  }, []);
  useEffect(() => {
    hoverEffect();
  }, [hoverEffect]);

  /** Paging Navigation Handling (onClick of <h3> below)*/
  const navigate = useNavigate();
  const location = useLocation();
  const goToProductPage = () =>
    navigate(`/products/product/${slugify(product.name)}`, {
      state: { ...(location.state || {}), _id: product._id },
    });

  return (
    <Card className="m-1 max-w-xs">
      <div className="relative">
        <div
          className="img_producto_container rounded-xl border-2 border-slate-200"
          data-scale="1.6"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          <a
            className="dslc-lightbox-image img_producto"
            target="_self"
            style={{
              backgroundImage: `url(${product.image})`,
            }}
          ></a>
        </div>
        <div
          className="w-fit h-fit bottom-0 absolute justify-center translate-x-[70px] translate-y-4"
          onClick={() => {
            setProductModalId(product._id);
          }}
        >
          <Icon
            className="hover:bg-zinc-200 hover:cursor-pointer rounded-full border-[1px] border-slate-300 bg-zinc-100 p-2"
            path={mdiEyeOutline}
            size={1.5}
            color="green"
          />
        </div>
        {isHover && (
          <div className="absolute top-0 m-1" onMouseEnter={() => setIsHover(true)}>
            <Icon
              className="hover:bg-zinc-200 hover:cursor-pointer rounded-full border-[1px] border-slate-300 bg-zinc-100 p-2 mb-1"
              path={mdiHeartOutline}
              size={1.5}
              color="green"
            />
          </div>
        )}
      </div>
      <div className="p-2">
        <p className="text-center text-xs font-medium   text-gray-400">
          {product.category[product.category.length - 1]}
        </p>

        <StarComponent
          rating={product.ratingsAvg}
          reveiws={product.ratingsQuantity}
        />

        <h3
          className="hover:underline hover:text-blue-800 text-center text-lg font-medium"
          onClick={goToProductPage}
        >
          {product.name}
        </h3>
        <div className="text-center">
          <span className="mr-1 font-bold text-emerald-500">
            {product.lastProductPrice}₪
          </span>
        </div>
      </div>
    </Card>
  );
}
