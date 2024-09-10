// Imports:
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  mdiChevronLeft,
  mdiHeartOutline,
  mdiHome,
  mdiShoppingOutline,
} from '@mdi/js';
import Icon from '@mdi/react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import BreadcrumbsLink from '@mui/material/Link';
import BreadcrumbsTypography from '@mui/material/Typography';
import { Grid, Skeleton, Container } from '@mantine/core';

import StarComponent from '../components/product/subComponents/_StarComponent';
import ProductGallery from '../components/product/subComponents/_ProductGallery';
import ReviewCard from '../components/reviews/_ReviewCard';

// Component:
export default function ProductPage() {
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
  const review = {
    user: {
      profileImg:
        'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
      fullName: 'Kislev Levy',
    },
    createdAt: new Date('09-03-2024'),
    rating: 5,
    review:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure quam, ratione ducimus alias velit nobis quo quaerat aperiam minima magnam?',
  };

  const [currentProduct, setCurrentProduct] = useState(products[0]);
  const [currentSize, setCurrentSize] = useState('');
  const [activeImg, setActiveImg] = useState(products[0].images[0]);

  return (
    <>
      <div className="flex justify-between m-5 flex-col md:flex-row">
        <div className="my-2 h-full w-full md:w-1/2">
          <ProductGallery
            classNames=" h-[320px]"
            {...{ setActiveImg, activeImg, images: currentProduct.images }}
          />
        </div>
        <div className="w-full md:w-1/2 p-5 flex flex-col rtl">
          <div className="flex items-center">
            <div className="mb-4">
              <Breadcrumbs
                separator={<Icon path={mdiChevronLeft} size={1} />}
                maxItems={4}
              >
                <BreadcrumbsLink color="inherit">
                  <Link to="/">
                    <div className="hover:text-[#64b496]">
                      <Icon
                        path={mdiHome}
                        size={1}
                        className="cursor-pointer text-inherit"
                      />
                    </div>
                  </Link>
                </BreadcrumbsLink>

                <BreadcrumbsLink
                  underline="hover"
                  color="inherit"
                  className="cursor-pointer"
                >
                  <div>כפכפים</div>
                </BreadcrumbsLink>
                <BreadcrumbsLink
                  underline="hover"
                  color="inherit"
                  className="cursor-pointer"
                >
                  <div>כפכפים לנשים</div>
                </BreadcrumbsLink>

                <BreadcrumbsTypography>
                  <div>שחר נשים</div>
                </BreadcrumbsTypography>
              </Breadcrumbs>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-right text-xl font-medium">שחר נשים</h3>
            <StarComponent rating={5} reveiws={50} />
          </div>

          <p className="text-sm mt-1">
            דגם אייקוני בעל שתי רצועות קדמיות ושני אבזמים להתאמה ולאחיזה מושלמת של כף
            הרגל. עשוי עור איטלקי איכותי, נושם וכולל את רפידת הנוחות האנטומית של טבע
            נאות המקנה תחושת גמישות ורכות מלטפת בכל צעד, בולמת זעזועים ותומכת בכל
            חלקי כף הרגל מהבוהן ועד העקב, וסוליית EVA עשויה גומי מוקצף לבלימת זעזועים
            ולמניעת החלקה. מיוצר בישראל בעבודת יד.
          </p>
          <div className="mt-2">
            <h4>צבעים:</h4>
            <div className="flex flex-wrap">
              {products.map((ele, i) => (
                <div
                  onClick={() => {
                    setCurrentProduct(products[i]);
                    setActiveImg(products[i].images[0]);
                  }}
                  key={`thumbnail-${i}`}
                  className={`w-6 h-6 border-2 mx-0.5 hover:brightness-90 cursor-pointer ${currentProduct._id === ele._id ? 'border-gray-600' : 'border-gray-300'}`}
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
              {Object.keys(currentProduct.sizes).map((key) => (
                <div
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
              <span className="mr-1 font-bold text-emerald-500 text-2xl">
                {currentProduct.price}₪
              </span>

              {currentProduct.discountPrice && (
                <span className="ml-1 text-lg text-gray-500 line-through">
                  {currentProduct.discountPrice}₪
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <Container className="rtl mt-5">
        <h4 className="mb-5">חוות דעת הלקוחות:</h4>
        <Grid>
          <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
            <ReviewCard review={review} />
          </Grid.Col>{' '}
          <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
            <ReviewCard review={review} />
          </Grid.Col>{' '}
          <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
            <ReviewCard review={review} />
          </Grid.Col>{' '}
          <Grid.Col span={{ base: 12, xs: 6, md: 4 }}>
            <ReviewCard review={review} />
          </Grid.Col>
        </Grid>
      </Container>

      <div></div>
    </>
  );
}
