// Imports:
import React, { useEffect, useState } from 'react';

import { Button, Select } from '@mantine/core';
import Icon from '@mdi/react';
import { mdiGrid, mdiFormatListText } from '@mdi/js';

// Component:
export default function ShopTooltip({
  isDetailed,
  setIsDetailed,
  results,
  setSortBy,
}) {
  useEffect(() => {}, [results]);
  const [sort, setSort] = useState('');

  useEffect(() => {
    switch (sort) {
      case 'מחיר':
        setSortBy('price');
        break;
      case 'דירוג':
        setSortBy('-ratingsAvg');
        break;
      case 'פופולאריות':
        setSortBy('-sold');
        break;
    }
  }, [sort]);

  return (
    <div className="flex justify-between items-center bg-[#f9fafb] p-2 my-2 rounded-lg align-middle">
      <div className="flex items-center">
        <Button
          onClick={() => setIsDetailed(false)}
          className="w-fit p-1 mr-1"
          color={isDetailed ? '#F9FAFB' : '#75B197'}
        >
          <Icon path={mdiGrid} size={1} color={isDetailed ? 'black' : 'white'} />
        </Button>
        <Button
          onClick={() => setIsDetailed(true)}
          className="w-fit p-1 mr-2"
          color={isDetailed ? '#75B197' : '#F9FAFB'}
        >
          <Icon
            path={mdiFormatListText}
            size={1}
            color={isDetailed ? 'white' : 'black'}
          />
        </Button>

        {results === 1 && <h4 className="rtl">נמצאה תוצאה אחת!</h4>}
        {results === 0 && <h4 className="rtl">לא נמצאו תוצאות</h4>}
        {results > 1 && <h4 className="rtl">נמצאו {results} תוצאות עבורך!</h4>}
      </div>
      <div>
        <Select
          value={sort}
          onChange={setSort}
          data={['מחיר', 'דירוג', 'פופולאריות']}
          placeholder="מיין לפי"
          className="w-24 rtl"
          size="xs"
        />
      </div>
    </div>
  );
}
