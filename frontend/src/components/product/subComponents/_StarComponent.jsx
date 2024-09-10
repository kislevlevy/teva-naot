// Imports:
import React from 'react';

import { mdiStar, mdiStarOutline } from '@mdi/js';
import Icon from '@mdi/react';

// Component:
export default function StarComponent({ rating, reveiws }) {
  const base5 = rating / 2;
  const getArray = (num) => Array(Math.trunc(num)).fill('');

  return (
    <div className="m-2 mr-5 flex items-center justify-center">
      {getArray(base5 + (base5 % 1 === 0 ? 0 : 1)).map((_, i) => (
        <Icon key={'fullstar_' + i} color="#E98F65" path={mdiStar} size={0.75} />
      ))}
      {getArray(5 - base5).map((_, i) => (
        <Icon key={'star_' + i} color="#E98F65" path={mdiStarOutline} size={0.75} />
      ))}
      {reveiws && (
        <span className="mx-1 text-xs font-medium text-gray-400">( {reveiws} )</span>
      )}
    </div>
  );
}
