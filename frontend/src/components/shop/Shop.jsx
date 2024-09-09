import React, { useState } from 'react';
import Grid from '@mui/material/Grid2';
import ShopFilter from './ShopFilter';
import ProductList from '../product/ProductList';
import ShopTooltip from './ShopTooltip';
import { Pagination } from 'flowbite-react';

export default function Shop() {
  const [isDetailed, setIsDetailed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Grid container rowSpacing={1} columnSpacing={1}>
      <Grid width="250px">
        <ShopFilter />
      </Grid>
      <Grid size="grow">
        <ShopTooltip isDetailed={isDetailed} setIsDetailed={setIsDetailed} />
        <ProductList isDetailed={isDetailed} />
        <div className="w-full flex flex-col items-center my-2">
          <Pagination
            layout="pagination"
            currentPage={currentPage}
            totalPages={10}
            onPageChange={(val) => setCurrentPage(val)}
            nextLabel=""
            previousLabel=""
            showIcons
          />
        </div>
      </Grid>
    </Grid>
  );
}
