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
  const [details, setDetails] = useState();

  const { data, isSuccess, isLoading, isError } = useGetProductsQuery(filterStr);

  useEffect(() => {
    let arr = [];
    setMinMaxObj(null);
    setCategoriesArr([]);
    if (categoriesArr.length > 0) arr.push(`category=${categoriesArr.join(',')}`);
    if (minMaxObj) {
      const { price, size } = minMaxObj;
      if (Array.isArray(price) && price.length === 2)
        arr.push(`price[gte]=${price[0]}`, `price[lte]=${price[1]}`);

      if (size) arr.push(`availableSizes=${size}`);
    }
    if (arr.length > 0) setFilterStr(`?${arr.join('&')}`);
    if (isSuccess) setDetails(data.data.data);
  }, [categoriesArr, minMaxObj]);

  return (
    <Grid container rowSpacing={1} columnSpacing={1}>
      <Grid width="250px">
        {details && (
          <ShopFilter {...{ setMinMaxObj, setCategoriesArr, data: details }} />
        )}
      </Grid>
      <Grid size="grow">
        {details && (
          <ShopTooltip
            isDetailed={isDetailed}
            setIsDetailed={setIsDetailed}
            results={details.results}
          />
        )}

        {isSuccess && (
          <ProductList isDetailed={isDetailed} productsGroupArr={data.data.docs} />
        )}

        {details && details.results > 5 && (
          <div className="w-full flex flex-col items-center my-2">
            <Pagination
              layout="pagination"
              currentPage={currentPage}
              totalPages={details.results / 5}
              onPageChange={(val) => setCurrentPage(val)}
              nextLabel=""
              previousLabel=""
              showIcons
            />
          </div>
        )}
      </Grid>
    </Grid>
  );
}
