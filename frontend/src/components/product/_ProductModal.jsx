// Imports:
import React, { useEffect, useState } from 'react';

import Icon from '@mdi/react';
import { mdiCloseThick, mdiHeartOutline, mdiShoppingOutline } from '@mdi/js';
import { Modal } from 'flowbite-react';

import StarComponent from './subComponents/_StarComponent';
import ProductGallery from './subComponents/_ProductGallery';
import { useNavigate, useLocation } from 'react-router-dom';

import { useGetProductQuery } from '../../slices/api/apiProductsSlices';
//localstorage
import { addProductsToLocalStorage } from '../../utils/localStorage';
// Component:
export default function ProductModal({ productModalId, setProductModalId }) {
  const [product, setProduct] = useState(null);
  const [currentProductColor, setCurrentProductColor] = useState(null);
  const [activeImg, setActiveImg] = useState('');
  const [currentSize, setCurrentSize] = useState('');

  const { data, isSuccess, isError } = useGetProductQuery(productModalId);
  useEffect(() => {
    if (isSuccess) {
      setProduct(data.data.doc);
      setActiveImg(data.data.doc.colors[0].images[0]);
      setCurrentProductColor(data.data.doc.colors[0]);
    }
  }, [isSuccess, data, productModalId]);

  // Paging Navigation Handling (onClick of <h3> below)
  const navigate = useNavigate();
  const location = useLocation();
  const goToProductPage = () =>
    navigate(`/products/product/${product.slug}`, {
      state: { ...(location.state || {}), _id: product._id },
    });
const handleLocalstorage =()=>{
  if(product&&currentProductColor&&currentSize){
    // console.log(product)
    // console.log(currentProductColor)

addProductsToLocalStorage(product,currentProductColor,currentSize)
}
}
  if (product)
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
              <ProductGallery
                classNames=" w-[250px]"
                imagesArr={currentProductColor.images}
                {...{ setActiveImg, activeImg }}
              />
            </div>
            <div className="p-2 rtl flex flex-col ml-5">
              <div className="flex items-center">
                <p className="text-xs font-medium   text-gray-400">
                  {product?.category[product.category.length - 1]}
                </p>

                <StarComponent
                  rating={product.ratingsAvg}
                  reveiws={product.ratingsQuantity}
                />
              </div>
              <h3
                className="hover:underline cursor-pointer text-right text-xl font-medium"
                onClick={goToProductPage}
              >
                {product.name}
              </h3>
              <p className="text-sm mt-1">{product.description}</p>
              <div className="mt-2">
                <h4>צבעים:</h4>
                <div className="flex flex-wrap">
                  {product?.colors.map((ele, i) => (
                    <div
                      onClick={() => {
                        setCurrentProductColor(product.colors[i]);
                        setActiveImg(product.colors[i].images[0]);
                      }}
                      key={`thumbnail-${i}`}
                      className={`w-6 h-6 border-2 mx-0.5 hover:brightness-90 cursor-pointer ${currentProductColor._id === ele._id ? 'border-gray-600' : 'border-gray-300'}`}
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
                  {Object.entries(currentProductColor.sizes).map(([key, val], i) => {
                    if (currentSize && currentProductColor.sizes[currentSize] === 0)
                      setCurrentSize('');

                    return (
                      <div
                        key={`size-${i}`}
                        className={`w-6 h-6 border-2 text-center mx-0.5
                        ${currentSize === key ? 'border-gray-600' : 'border-gray-300'}
                        ${val === 0 ? 'diagonalCross cursor-not-allowed text-gray-400' : 'cursor-pointer hover:border-gray-400'}`}
                        onClick={val !== 0 ? () => setCurrentSize(key) : null}
                      >
                        {key}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="w-full flex justify-between mt-10 items-center">
                <div className="flex">
                  <div className="mx-1 w-fit h-10 hover:bg-zinc-200 hover:cursor-pointer rounded-md border-[1px] border-slate-300 bg-zinc-100 p-2 flex items-center">
                    <Icon path={mdiHeartOutline} size={1} color="green" />
                  </div>
                  <div
                  onClick={handleLocalstorage}
                   className="mx-1 w-fit h-10 hover:bg-zinc-200 hover:cursor-pointer rounded-md border-[1px] border-slate-300 bg-zinc-100 p-2 flex items-center">
                    <Icon path={mdiShoppingOutline} size={1} color="green" />
                    <span className="mr-1 text-sm">הוסף לעגלה</span>
                  </div>
                </div>
                <div>
                  <span className="mr-1 font-bold text-emerald-500 text-xl">
                    {currentProductColor.price}₪
                  </span>

                  {currentProductColor.priceBeforeDiscount && (
                    <span className="ml-1 text-md text-gray-500 line-through">
                      {currentProductColor.priceBeforeDiscount}₪
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
