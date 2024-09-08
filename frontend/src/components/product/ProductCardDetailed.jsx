import {
  mdiEyeOutline,
  mdiHeartOutline,
  mdiShoppingOutline,
  mdiStar,
  mdiStarOutline,
} from '@mdi/js';
import Icon from '@mdi/react';
import { Button, Card } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import hoverFunc from '../../utils/hover';

import '../../styles/modules/hover.css';

export default function ProductCardDetailed() {
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    hoverFunc();
  }, []);

  return (
    <Card className="m-1 w-full">
      <div className="flex justify-between">
        <div className="relative">
          <div
            className="img_producto_container rounded-xl border-2 border-slate-200 w-1/3 h-full"
            data-scale="1.6"
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <a
              className="dslc-lightbox-image img_producto"
              target="_self"
              style={{
                backgroundImage:
                  'url(https://www.tevanaot.co.il/media/catalog/product/cache/0d1eeda344e585470b8d983c25fb14e2/1/0/101101-382-01_1_11.jpg)',
              }}
            ></a>
          </div>

          <div className="absolute inset-0 top-auto left-auto m-2">
            <Icon
              className="hover:bg-zinc-200 hover:cursor-pointer rounded-full border-[1px] border-slate-300 bg-zinc-100 p-2"
              path={mdiShoppingOutline}
              size={1.5}
              color="green"
            />
          </div>
          {isHover && (
            <div
              className="absolute top-0 m-1"
              onMouseEnter={() => setIsHover(true)}
            >
              <Icon
                className="hover:bg-zinc-200 hover:cursor-pointer rounded-full border-[1px] border-slate-300 bg-zinc-100 p-2 mb-1"
                path={mdiHeartOutline}
                size={1.5}
                color="green"
              />
              <Icon
                className="hover:bg-zinc-200 hover:cursor-pointer rounded-full border-[1px] border-slate-300 bg-zinc-100 p-2"
                path={mdiEyeOutline}
                size={1.5}
                color="green"
              />
            </div>
          )}
        </div>
        <div className="p-2 rtl flex flex-col ml-5">
          <div className="flex items-center">
            <p className="text-xs font-medium   text-gray-400">כפכפים לנשים</p>
            <div className="m-2 mr-5 flex items-center">
              <Icon color="#E98F65" path={mdiStar} size={0.75} />
              <Icon color="#E98F65" path={mdiStar} size={0.75} />
              <Icon color="#E98F65" path={mdiStar} size={0.75} />
              <Icon color="#E98F65" path={mdiStar} size={0.75} />
              <Icon color="#E98F65" path={mdiStarOutline} size={0.75} />
              <span className="ml-1 text-xs font-medium text-gray-400">( 7 )</span>
            </div>
          </div>

          <h3 className="text-right text-xl font-medium">שחר נשים</h3>

          <p className="text-sm mt-1">
            דגם אייקוני בעל שתי רצועות קדמיות ושני אבזמים להתאמה ולאחיזה מושלמת של כף
            הרגל. עשוי עור איטלקי איכותי, נושם וכולל את רפידת הנוחות האנטומית של טבע
            נאות המקנה תחושת גמישות ורכות מלטפת בכל צעד, בולמת זעזועים ותומכת בכל
            חלקי כף הרגל מהבוהן ועד העקב, וסוליית EVA עשויה גומי מוקצף לבלימת זעזועים
            ולמניעת החלקה. מיוצר בישראל בעבודת יד.
          </p>

          <div className="self-end mt-10">
            <span className="mr-1 font-bold text-emerald-500">429.00₪</span>
            <span className="ml-1 text-xs text-gray-500 line-through">449.00₪</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
