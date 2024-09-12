// Imports:
import React, { useEffect, useState } from 'react';

import Icon from '@mdi/react';
import { mdiEyeOutline, mdiHeartOutline } from '@mdi/js';
import { Card } from 'flowbite-react';

import hoverFunc from '../../utils/hover';
import '../../styles/modules/hover.css';
import StarComponent from './subComponents/_StarComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { slugify } from '../../utils/slugify';

// Component:
export default function ProductCardDetailed({ setProductModalId, product }) {
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    hoverFunc();
  }, []);

  /** Paging Navigation Handling (onClick of <h3> below)*/
  const navigate = useNavigate();
  const location = useLocation();
  const goToProductPage = () =>
      navigate(`/products/product/${slugify(product.name)}`, { state: {...location.state||{}, _id:product._id } });

  return (
    <Card className="m-1 w-full">
      <div className="flex justify-between">
        <div className="relative">
          <div
            className="img_producto_container rounded-xl border-2 border-slate-200 h-full w-64"
            data-scale="1.6"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <a
              className="dslc-lightbox-image img_producto"
              target="_self"
              style={{
                backgroundImage:product.image,
              }}
            ></a>
          </div>
          <div className="absolute flex top-0 right-0 m-1">
            {isHover && (
              <div onMouseEnter={() => setIsHover(true)} className="mr-0.5">
                <Icon
                  className="hover:bg-zinc-200 hover:cursor-pointer rounded-full border-[1px] border-slate-300 bg-zinc-100 p-2 mb-1"
                  path={mdiHeartOutline}
                  size={1.5}
                  color="green"
                />
              </div>
            )}
            <div onClick={() => setProductModalId(product._id)}>
              <Icon
                className="hover:bg-zinc-200 hover:cursor-pointer rounded-full border-[1px] border-slate-300 bg-zinc-100 p-2"
                path={mdiEyeOutline}
                size={1.5}
                color="green"
              />
            </div>
          </div>
        </div>
        <div className="p-2 rtl flex flex-col ml-5">
          <div className="flex items-center">
            <p className="text-xs font-medium   text-gray-400">
              {product.category[product.category.length - 1]}
            </p>
            <StarComponent
              rating={product.ratingsAvg}
              reveiws={product.ratingsQuantity}
            />
          </div>

          <h3 className="hover:underline hover:text-blue-800 text-right text-xl font-medium" onClick={goToProductPage}>{product.name}</h3>

          <p className="text-sm mt-1">{product.description}</p>

          <div className="self-end mt-10">
            <span className="mr-1 font-bold text-lg text-emerald-500">
              {product.lastProductPrice}₪
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
