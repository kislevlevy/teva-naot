import { Card } from 'flowbite-react';
import React from 'react';

import Icon from '@mdi/react';
import { mdiShoppingOutline, mdiStar, mdiStarOutline } from '@mdi/js';

export default function ProductCartSimple() {
  return (
    <Card className="max-w-sm">
      <div className="relative">
        <img
          alt="Lemone"
          src="/img/שחר נשים.jpg"
          className="rounded-xl border-[1px] border-slate-300"
        />
        <div className="absolute inset-0 flex translate-y-[92%] justify-center">
          <Icon
            className="rounded-full border-[1px] border-slate-300 bg-zinc-100 p-2"
            path={mdiShoppingOutline}
            size={1.5}
            color="green"
          />
        </div>
      </div>
      <div className="p-2">
        <p className="text-center text-xs font-medium   text-gray-400">
          כפכפים לנשים
        </p>

        <div className="m-2 flex justify-center align-middle">
          <Icon color="#E98F65" path={mdiStar} size={0.75} />
          <Icon color="#E98F65" path={mdiStar} size={0.75} />
          <Icon color="#E98F65" path={mdiStar} size={0.75} />
          <Icon color="#E98F65" path={mdiStar} size={0.75} />
          <Icon color="#E98F65" path={mdiStarOutline} size={0.75} />
          <span className="ml-1 text-xs font-medium text-gray-400">( 7 )</span>
        </div>

        <h3 className="text-center text-lg font-medium">שחר נשים</h3>

        <div className="text-center">
          <span className="mr-1 font-bold text-emerald-500">429.00₪</span>
          <span className="ml-1 text-xs text-gray-500 line-through">449.00₪</span>
        </div>
      </div>
    </Card>
  );
}
