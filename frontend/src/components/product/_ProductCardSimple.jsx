// Imports:
import { useEffect, useState, useCallback } from 'react';

import Icon from '@mdi/react';
import { mdiEyeOutline, mdiHeartOutline, mdiHeart } from '@mdi/js';
import { Card } from 'flowbite-react';

import hoverFunc from '../../utils/hover';
import '../../styles/modules/hover.css';
import StarComponent from './subComponents/_StarComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { saveLikeItems } from '../../slices/state/userState';

// Component:
export default function ProductCardSimple({ setProductModalId, product }) {
  const [isHover, setIsHover] = useState(false);

  const likedItems = useSelector((state) => state.userState.likedItems) || [];
  const isLiked = likedItems.includes(product._id); //should rerender on change of likedItems state

  const hoverEffect = useCallback(() => {
    hoverFunc();
  }, []);
  useEffect(() => {
    hoverEffect();
  }, [hoverEffect, isLiked]);

  /** Paging Navigation Handling (onClick of <h3> below)*/
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const goToProductPage = () =>
    navigate(`/products/product/${product.slug}`, {
      state: { ...(location.state || {}), _id: product._id },
    });

  const handleLikeItem = (e) => {
    let updatedLikedItems = [...likedItems];
    if (!isLiked) {
      updatedLikedItems = [...likedItems, product._id];
    } else {
      updatedLikedItems = updatedLikedItems.filter((id) => id !== product._id);
    }

    //saves the changes in local storage and in state
    dispatch(saveLikeItems({ likedItems: updatedLikedItems }));
    localStorage.setItem('likedItems', JSON.stringify(updatedLikedItems));
  };

  return (
    <Card className="max-w-xs m-1">
      <div className="relative">
        <div
          className="border-2 img_producto_container rounded-xl border-slate-200"
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
        {isHover &&
          ((isLiked && (
            <div
              className="absolute top-0 m-1"
              onMouseEnter={() => setIsHover(true)}
            >
              <Icon
                className="hover:bg-zinc-200 hover:cursor-pointer rounded-full border-[1px] border-slate-300 bg-zinc-100 p-2 mb-1"
                path={mdiHeart}
                size={1.5}
                color="green"
                onClick={handleLikeItem}
              />
            </div>
          )) ||
            (!isLiked && (
              <div
                className="absolute top-0 m-1"
                onMouseEnter={() => setIsHover(true)}
              >
                <Icon
                  className="hover:bg-zinc-200 hover:cursor-pointer rounded-full border-[1px] border-slate-300 bg-zinc-100 p-2 mb-1"
                  path={mdiHeartOutline}
                  size={1.5}
                  color="green"
                  onClick={handleLikeItem}
                />
              </div>
            )))}
      </div>
      <div className="flex flex-col items-center p-2">
        <p className="text-xs font-medium text-center text-gray-400">
          {product.category[product.category.length - 1]}
        </p>

        <StarComponent
          rating={product.ratingsAvg}
          reveiws={product.ratingsQuantity}
        />

        <h3
          className="text-lg font-medium cursor-pointer hover:underline w-fit"
          onClick={goToProductPage}
        >
          {product.name}
        </h3>
        <div className="text-center">
          <span className="mr-1 font-bold text-emerald-500">{product.price} ₪</span>
        </div>
      </div>
    </Card>
  );
}
