// Imports:
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import { Pagination } from 'flowbite-react';
import Grid from '@mui/material/Grid2';

import { useGetProductsQuery } from '../slices/api/apiProductsSlices';

import ProductList from '../components/product/ProductList';
import ShopFilter from '../components/shop/_ShopFilter';
import ShopTooltip from '../components/shop/_ShopTooltip';
import { unslugify } from '../utils/slugify';

const initialDetails = {
  prices: { min: 0, max: 1000 },
  sizes: { min: 0, max: 0 },
  results: 0,
};

// Component:
export default function Shop() {
  const [filterObj, setFilterObj] = useState(null);
  const { data, isSuccess } = useGetProductsQuery(filterObj || '');

  const [products, setProducts] = useState(null);
  const [details, setDetails] = useState(initialDetails);
  const [isDetailed, setIsDetailed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [category, setCategory] = useState('');
  const [minMaxObj, setMinMaxObj] = useState(null);
  const [sortBy, setSortBy] = useState('');

  const { slug = '' } = useParams();
  const query = useLocation();

  useEffect(() => {
    setCurrentPage(1);
    setMinMaxObj(null);
    setSortBy('');
    setCategory('');
    setProducts(null);

    let arr = [];
    const q = new URLSearchParams(query.search).get('q');

    if (slug) {
      arr.push(`category=${unslugify(slug).replaceAll(' ', '%20')}`);
    }
    if (q) {
      arr.push(`q=${q}`);
    }
    arr.length === 0 ? setFilterObj(null) : setFilterObj(`?${arr.join('&')}`);
  }, [slug, query.search]);

  useEffect(() => {
    let arr = [];

    if (category) arr.push(`category=${category.replaceAll(' ', '%20')}`);

    if (minMaxObj) {
      const { price, size } = minMaxObj;
      if (Array.isArray(price) && price.length === 2)
        arr.push(`price[gte]=${price[0]}`, `price[lte]=${price[1]}`);
      if (size) arr.push(`availableSizes=${size}`);
    }

    if (currentPage > 1) arr.push(`page=${currentPage}`);
    if (sortBy) arr.push(`sort=${sortBy}`);

    arr.length === 0 ? setFilterObj(null) : setFilterObj(`?${arr.join('&')}`);
  }, [category, minMaxObj, currentPage, sortBy]);

  useEffect(() => {
    if (isSuccess && data.data.docs.length > 0) {
      setDetails(data.data.data);
      setProducts(data.data.docs);
    } else if (isSuccess && data.data.docs.length == 0) {
      setDetails(initialDetails);
      setProducts(null);
    }
  }, [isSuccess, data]);

  return (
    <Grid container rowSpacing={1} columnSpacing={1}>
      <Grid width="250px">
        {details && (
          <ShopFilter {...{ setMinMaxObj, setCategory, data: details, slug }} />
        )}
      </Grid>
      <Grid size="grow">
        {details && (
          <ShopTooltip
            {...{ setSortBy, isDetailed, setIsDetailed, results: details.results }}
          />
        )}

        {products && (
          <ProductList isDetailed={isDetailed} productsGroupArr={products} />
        )}

        {details && details.results > 5 && (
          <div className="w-full flex flex-col items-center my-2">
            <Pagination
              layout="pagination"
              currentPage={currentPage}
              totalPages={Math.ceil(details.results / 5)}
              onPageChange={setCurrentPage}
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
