// Imports:
import React, { useEffect, useState } from 'react';

import { Pagination } from 'flowbite-react';
import Grid from '@mui/material/Grid2';

import { useGetProductsQuery } from '../../slices/api/apiProductsSlices';

import ProductList from '../product/ProductList';
import ShopFilter from './_ShopFilter';
import ShopTooltip from './_ShopTooltip';
import Error from '../../pages/Error';

const exampledata = { price: [50, 500], size: [35, 50] };

// Component:
export default function Shop() {
  const [isDetailed, setIsDetailed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStr, setFilterStr] = useState(null);
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [minMaxObj, setMinMaxObj] = useState(null);

  const { data, isSuccess, isLoading, isError } = useGetProductsQuery(filterStr);

  useEffect(() => {
    let arr = [];
    if (categoriesArr.length > 0) arr.push(`category=${categoriesArr.join(',')}`);
    if (minMaxObj) {
      const { price, size } = minMaxObj;
      if (Array.isArray(price) && price.length === 2)
        arr.push(`price[gte]=${price[0]}`, `price[lte]=${price[1]}`);

      if (size) arr.push(`availableSizes=${size}`);
    }
    setMinMaxObj(null);
    setCategoriesArr([]);
    if (arr.length > 0) setFilterStr(`?${arr.join('&')}`);
  }, [categoriesArr, minMaxObj]);

  return (
    <Grid container rowSpacing={1} columnSpacing={1}>
      <Grid width="250px">
        <ShopFilter {...{ setMinMaxObj, setCategoriesArr, data: exampledata }} />
      </Grid>
      <Grid size="grow">
        <ShopTooltip
          isDetailed={isDetailed}
          setIsDetailed={setIsDetailed}
          results={data?.results}
        />

        {isSuccess && (
          <ProductList isDetailed={isDetailed} productsGroupArr={data.data.docs} />
        )}

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
