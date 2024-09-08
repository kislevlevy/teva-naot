import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import ShopFilter from './ShopFilter';
import ProductList from '../product/ProductList';
import ShopTooltip from './ShopTooltip';

export default function Shop() {
  const [isDetailed, setIsDetailed] = useState(false);

  return (
    <Grid container rowSpacing={1} columnSpacing={1}>
      <Grid size={3} maxWidth="250px">
        <ShopFilter />
      </Grid>
      <Grid size={9}>
        <ShopTooltip isDetailed={isDetailed} setIsDetailed={setIsDetailed} />
        <ProductList isDetailed={isDetailed} />
      </Grid>
    </Grid>
  );
}
