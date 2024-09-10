// Imports:
import React, { useState } from 'react';

import { Pagination } from 'flowbite-react';
import Grid from '@mui/material/Grid2';

import { useGetProductsGroupQuery } from '../../slices/api/apiProductsGroupSlices';

import ProductList from '../product/ProductList';
import ShopFilter from './_ShopFilter';
import ShopTooltip from './_ShopTooltip';
import Error from '../../pages/Error';

// Component:
export default function Shop() {
  const [isDetailed, setIsDetailed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isSuccess, isLoading, isError } = useGetProductsGroupQuery();

  console.log(data);

  if (isError) return <Error />;
  if (isLoading) return <h2>Loading...</h2>;

  if (isSuccess)
    return (
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid width="250px">
          <ShopFilter />
        </Grid>
        <Grid size="grow">
          <ShopTooltip
            isDetailed={isDetailed}
            setIsDetailed={setIsDetailed}
            results={data.results}
          />
          <ProductList isDetailed={isDetailed} productsGroupArr={data.data.docs} />
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
