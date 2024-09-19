// Imports:
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import {
  mdiChevronLeft,
  mdiHeartOutline,
  mdiHeart,
  mdiHome,
  mdiShoppingOutline,
} from '@mdi/js';
import Icon from '@mdi/react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import BreadcrumbsLink from '@mui/material/Link';
import BreadcrumbsTypography from '@mui/material/Typography';
import { Grid, Container } from '@mantine/core';

import StarComponent from '../components/product/subComponents/_StarComponent';
import ProductGallery from '../components/product/subComponents/_ProductGallery';
import ReviewCard from '../components/reviews/_ReviewCard';
import { useSelector, useDispatch } from 'react-redux';
import { saveLikeItems } from '../slices/comp.Slices/usersSlice';
import { useGetProductQuery } from '../slices/api/apiProductsSlices';
import { slugify } from '../../../backend/utils/slugify';

// Component:
export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const [currentProductColor, setCurrentProductColor] = useState(null);
  const [activeImg, setActiveImg] = useState(null);
  const [currentSize, setCurrentSize] = useState('');
  const likedItems = useSelector((state) => state.usersSlice.likedItems) || [];
  const isLiked = product ? likedItems.includes(product._id) : false;
  const dispatch = useDispatch();

  // paging: location.state._id - the id to fetch data for
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading, isSuccess } = useGetProductQuery(location.state._id);

  useEffect(() => {
    if (isSuccess) {
      setProduct(data.data.doc);
      setActiveImg(data.data.doc.colors[0].images[0]);
      setCurrentProductColor(data.data.doc.colors[0]);
      console.log(data);
      console.log(isLiked);
    }
  }, [isSuccess, data]);

  const handleLikeItem = (e) => {
    console.log(likedItems);
    console.log(isLiked);
    let updatedLikedItems = [...likedItems];
    if (!isLiked) {
      updatedLikedItems = [...likedItems, product?._id];
      console.log(updatedLikedItems);
    } else {
      updatedLikedItems = updatedLikedItems.filter((id) => id !== product._id);
    }

    //saves the changes in local storage and in state
    dispatch(saveLikeItems({ likedItems: updatedLikedItems }));
    localStorage.setItem('likedItems', JSON.stringify(updatedLikedItems));
  };

  if (product)
    return (
      <>
        <div className="flex justify-between m-5 flex-col md:flex-row mb-10">
          <div className="my-2 h-full w-full md:w-1/2">
            <ProductGallery
              classNames=" h-[300px]"
              {...{ setActiveImg, activeImg, imagesArr: currentProductColor.images }}
            />
          </div>
          <div className="w-full md:w-1/2 p-5 flex flex-col rtl">
            <div className="flex items-center">
              <div className="mb-4">
                <Breadcrumbs
                  separator={<Icon path={mdiChevronLeft} size={1} />}
                  maxItems={4}
                >
                  <div
                    className="hover:text-[#64b496]"
                    onClick={() => navigate('/')}
                  >
                    <BreadcrumbsLink color="inherit">
                      <Icon
                        path={mdiHome}
                        size={1}
                        className="cursor-pointer text-inherit"
                      />
                    </BreadcrumbsLink>
                  </div>
                  {product.category.map((ele, i) => (
                    <div
                      key={'category-' + i}
                      onClick={() => navigate(`/products/category/${slugify(ele)}`)}
                    >
                      <BreadcrumbsLink
                        underline="hover"
                        color="inherit"
                        className="cursor-pointer"
                      >
                        {ele}
                      </BreadcrumbsLink>
                    </div>
                  ))}

                  <div>
                    <BreadcrumbsTypography color="inherit">
                      <span>{product.name}</span>
                    </BreadcrumbsTypography>
                  </div>
                </Breadcrumbs>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <h3 className="text-right text-xl font-medium">{product.name}</h3>
              <StarComponent
                rating={product.ratingsAvg}
                reveiws={product.ratingsQuantity}
              />
            </div>

            <p className="text-sm mt-1">{product.description}</p>
            <div className="mt-2">
              <h4>צבעים:</h4>
              <div className="flex flex-wrap">
                {product.colors.map((ele, i) => (
                  <div
                    onClick={() => {
                      setCurrentProductColor(ele);
                      setActiveImg(ele.images[0]);
                    }}
                    key={`thumbnail-${i}`}
                    className={`w-6 h-6 border-2 mx-0.5 hover:brightness-90 cursor-pointer ${
                      currentProductColor._id === ele._id
                        ? 'border-gray-600'
                        : 'border-gray-300'
                    }`}
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
                {(isLiked && (
                  <div
                    className="mx-1 w-fit h-10 hover:bg-zinc-200 hover:cursor-pointer rounded-md border-[1px] border-slate-300 bg-zinc-100 p-2 flex items-center"
                    onClick={handleLikeItem}
                  >
                    <Icon path={mdiHeart} size={1} color="green" />
                  </div>
                )) ||
                  (!isLiked && (
                    <div
                      className="mx-1 w-fit h-10 hover:bg-zinc-200 hover:cursor-pointer rounded-md border-[1px] border-slate-300 bg-zinc-100 p-2 flex items-center"
                      onClick={handleLikeItem}
                    >
                      <Icon path={mdiHeartOutline} size={1} color="green" />
                    </div>
                  ))}
                <div
                  className="mx-1 w-fit h-10 hover:bg-zinc-200 hover:cursor-pointer rounded-md border-[1px] border-slate-300 bg-zinc-100 p-2 flex items-center"
                  onClick={() => 'TODO:'}
                >
                  <Icon path={mdiShoppingOutline} size={1} color="green" />
                  <span className="mr-1 text-sm">הוסף לעגלה</span>
                </div>
              </div>
              <div>
                <span className="mr-1 font-bold text-emerald-500 text-2xl">
                  {currentProductColor.price}₪
                </span>

                {currentProductColor.discountPrice && (
                  <span className="ml-1 text-lg text-gray-500 line-through">
                    {currentProductColor.discountPrice}₪
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        {product.reveiws && (
          <Container className="rtl mt-5">
            <h4 className="mb-5">חוות דעת הלקוחות:</h4>
            <Grid>
              {product.reveiws.map((ele, i) => (
                <Grid.Col span={{ base: 12, xs: 6, md: 4 }} key={'review-' + i}>
                  <ReviewCard review={ele.review} />
                </Grid.Col>
              ))}
            </Grid>
          </Container>
        )}
      </>
    );
}
