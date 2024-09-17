// Imports:
import React, { useCallback, useState } from 'react';

import Icon from '@mdi/react';
import { mdiCloseThick, mdiHeartOutline, mdiShoppingOutline } from '@mdi/js';
import { Modal } from 'flowbite-react';

import StarComponent from './subComponents/_StarComponent';
import ProductGallery from './subComponents/_ProductGallery';
import { useNavigate, useLocation } from 'react-router-dom';
import { slugify } from '../../utils/slugify';

import { useGetProductQuery } from '../../slices/api/apiProductsSlices';
import { useEffect } from 'react';

// Component:
export default function ProductModal({ productModalId, setProductModalId }) {
  const { data, isSuccess, isError } = useGetProductQuery(productModalId);
    const [activeImg, setActiveImg] = useState(null);
  let initImage;
  let product;
  let imagesArr=[];
  if (isSuccess) {
    product = data.data.doc;
    product.colors.map((colorObj) =>{
  colorObj.images.map(img=>imagesArr.push(img))
    });
    initImage = product.colors[0].images[0]
    console.log(product)
  }

  const products = [
    {
      name: 'שפאלט לבן',
      thumbnail: ['hex', '#ded9d9'],
      images: [
        'https://www.tevanaot.co.il/media/catalog/product/cache/0d1eeda344e585470b8d983c25fb14e2/1/0/101101-H50-01_1_2.jpg',
      ],
      colorBarcode: 'H5036',
      sizes: {
        35: 10,
        36: 1,
        37: 4,
        38: 0,
        39: 1,
        40: 1,
        41: 2,
      },
      price: 450,
      discountPrice: 499,
      productGroup: '5c88fa8cf4afda39709c2955',
      _id: '1',
    },
    {
      name: 'ר שפאלט ורוד פלמינגו',
      thumbnail: ['hex', '#b69088'],
      images: [
        'https://www.tevanaot.co.il/media/catalog/product/cache/0d1eeda344e585470b8d983c25fb14e2/1/0/101101-CAP-01_1_3.jpg',
        'https://www.tevanaot.co.il/media/catalog/product/cache/0d1eeda344e585470b8d983c25fb14e2/1/0/101101-CAP-02_1_3.jpg',
      ],
      colorBarcode: 'CAP36',
      sizes: {
        35: 10,
      },
      price: 450,
      discountPrice: 499,
      productGroup: '5c88fa8cf4afda39709c2955',
      _id: '2',
    },
    {
      name: 'אביב מוזהב',
      thumbnail: [
        'img',
        'https://www.tevanaot.co.il/media/attribute/swatch/swatch_image/30x20/e/e/ee2.jpg',
      ],
      images: [
        'https://www.tevanaot.co.il/media/catalog/product/cache/0d1eeda344e585470b8d983c25fb14e2/1/0/101101-EE2-01_1.jpg',
      ],
      colorBarcode: 'EE236',
      sizes: {
        35: 10,
      },
      price: 429,
      productGroup: '5c88fa8cf4afda39709c2955',
      _id: '3',
    },
  ];

  /** Paging Navigation Handling (onClick of <h3> below)*/
  const navigate = useNavigate();
  const location = useLocation();
  const goToProductPage = () =>
    navigate(`/products/product/${slugify(products[0].name)}`, {
      state: { ...(location.state || {}), _id: products[0]._id },
    });

  const [currentProduct, setCurrentProduct] = useState(null);
  const [currentSize, setCurrentSize] = useState('');
  // const [activeImg, setActiveImg] = useState(products[0].images[0]);

  return (
    <Modal
      show={productModalId}
      onClose={() => setProductModalId('')}
      onKeyDown={(e) => e.key === 'Escape' && setProductModalId('')}
      dismissible
    >
      <Modal.Body>
        <div
          className="absolute right-0 top-0 m-2 text-red-300 hover:text-red-600 cursor-pointer"
          onClick={() => setProductModalId('')}
        >
          <Icon path={mdiCloseThick} size={0.75} />
        </div>
        <div className="flex justify-between">
          <div className="my-2 w-full h-full flex rounded-md">
            {isSuccess && (
              <ProductGallery
                classNames=" w-[250px]"
                imagesArr={imagesArr.length > 0 ? imagesArr : []}
                {...{ setActiveImg, activeImg, initImage }}
              />
            )}
          </div>
          <div className="p-2 rtl flex flex-col ml-5">
            <div className="flex items-center">
              <p className="text-xs font-medium   text-gray-400">
                {product?.category[product.category.length - 1]}
              </p>
              {isSuccess && (
                <StarComponent
                  rating={product?.ratingsAvg}
                  reveiws={product?.ratingsQuantity}
                />
              )}
            </div>
            <h3
              className="hover:underline hover:text-blue-800 text-right text-xl font-medium"
              onClick={goToProductPage}
            >
              {product?.name}
            </h3>
            <p className="text-sm mt-1">{product?.description}</p>
            <div className="mt-2">
              <h4>צבעים:</h4>
              <div className="flex flex-wrap">
                {product?.colors.map((ele, i) => (
                  <div
                    onClick={() => {
                      setCurrentProduct((prev) => (prev = product.colors[i]));
                      setActiveImg(product?.colors[i].images[0]);
                    }}
                    key={`thumbnail-${i}`}
                    className={`w-6 h-6 border-2 mx-0.5 hover:brightness-90 cursor-pointer ${currentProduct && currentProduct._id === ele._id ? 'border-gray-600' : 'border-gray-300'}`}
                    style={
                      ele.thumbnail[0] === 'hex'
                        ? { backgroundColor: ele.thumbnail[1] }
                        : { backgroundImage: `url(${ele.thumbnail[1]})` }
                    }
                  ></div>
                ))}
              </div>
              <h4>מידות:</h4>
              <div className="flex flex-wrap">
                {currentProduct &&
                  Object.keys(currentProduct.sizes).map((key, i) => (
                    <div
                      key={`size-${i}`}
                      className={`w-6 h-6  border-2 text-center mx-0.5 hover:border-gray-400 cursor-pointer ${currentSize === key ? 'border-gray-600' : 'border-gray-300'}`}
                      onClick={() => setCurrentSize(key)}
                    >
                      {key}
                    </div>
                  ))}
              </div>
            </div>
            <div className="w-full flex justify-between mt-10 items-center">
              <div className="flex">
                <div className="mx-1 w-fit h-10 hover:bg-zinc-200 hover:cursor-pointer rounded-md border-[1px] border-slate-300 bg-zinc-100 p-2 flex items-center">
                  <Icon path={mdiHeartOutline} size={1} color="green" />
                </div>
                <div className="mx-1 w-fit h-10 hover:bg-zinc-200 hover:cursor-pointer rounded-md border-[1px] border-slate-300 bg-zinc-100 p-2 flex items-center">
                  <Icon path={mdiShoppingOutline} size={1} color="green" />
                  <span className="mr-1 text-sm">הוסף לעגלה</span>
                </div>
              </div>
              <div>
                <span className="mr-1 font-bold text-emerald-500 text-xl">
                  {currentProduct && currentProduct.price}₪
                </span>

                {currentProduct && (
                  <span className="ml-1 text-md text-gray-500 line-through">
                    {currentProduct.priceBeforeDiscount} ₪
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
