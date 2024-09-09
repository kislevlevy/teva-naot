import React, { useState } from 'react';
import { Modal } from 'flowbite-react';
import StarComponent from './subComponents/_StarComponent';
import ProductGallery from './subComponents/_ProductGallery';
import Icon from '@mdi/react';
import { mdiCloseThick } from '@mdi/js';

export default function ProductModal({ productModalId, setProductModalId }) {
  const images = [
    'https://www.tevanaot.co.il/media/catalog/product/cache/0d1eeda344e585470b8d983c25fb14e2/1/0/101101-382-01_1_11.jpg',
    'https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
    'https://images.unsplash.com/photo-1432462770865-65b70566d673?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
    'https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80',
    'https://images.unsplash.com/photo-1682407186023-12c70a4a35e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2832&q=80',
  ];
  const [activeImg, setActiveImg] = useState(
    'https://www.tevanaot.co.il/media/catalog/product/cache/0d1eeda344e585470b8d983c25fb14e2/1/0/101101-382-01_1_11.jpg',
  );

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
          <div className="h-full">
            <div className="my-2 w-full h-[50px] flex rounded-md">
              <ProductGallery {...{ setActiveImg, activeImg, images }} />
            </div>
          </div>
          <div className="p-2 rtl flex flex-col ml-5">
            <div className="flex items-center">
              <p className="text-xs font-medium   text-gray-400">כפכפים לנשים</p>
              <StarComponent rating={5} reveiws={50} />
            </div>

            <h3 className="text-right text-xl font-medium">שחר נשים</h3>

            <p className="text-sm mt-1">
              דגם אייקוני בעל שתי רצועות קדמיות ושני אבזמים להתאמה ולאחיזה מושלמת של
              כף הרגל. עשוי עור איטלקי איכותי, נושם וכולל את רפידת הנוחות האנטומית של
              טבע נאות המקנה תחושת גמישות ורכות מלטפת בכל צעד, בולמת זעזועים ותומכת
              בכל חלקי כף הרגל מהבוהן ועד העקב, וסוליית EVA עשויה גומי מוקצף לבלימת
              זעזועים ולמניעת החלקה. מיוצר בישראל בעבודת יד.
            </p>

            <div className="self-end mt-10">
              <span className="mr-1 font-bold text-emerald-500">429.00₪</span>
              <span className="ml-1 text-xs text-gray-500 line-through">
                449.00₪
              </span>
            </div>
            <div>
              <h4>צבע</h4>
              <div className="flex">
                {Array(15)
                  .fill('')
                  .map(() => (
                    <div className="w-5 h-5 bg-black mx-0.5"></div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
