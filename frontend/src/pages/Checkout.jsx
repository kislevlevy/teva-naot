import React from 'react';

import Grid from '@mui/material/Grid2';
import { Container } from '@mui/material';

import CheckoutTable from '../components/checkout/_CheckoutTable';
import CheckoutSummery from '../components/checkout/_ChackoutSummery';

export default function Checkout() {
  const products = [
    {
      name: 'שחר נשים',
      price: 429,
      discountPrice: 499,
      sizes: {
        37: 1,
        39: 2,
      },
      color: 'חום',
      images: [
        'https://res.cloudinary.com/drxtaxnkr/image/upload/v1726394499/0d8ae73f-7db3-4e7f-b8a4-71335252d781.png',
      ],
    },
    {
      name: 'רותם נשים',
      price: 449,
      sizes: {
        35: 1,
      },
      color: 'לבן',
      images: [
        'https://res.cloudinary.com/drxtaxnkr/image/upload/v1726394499/0d8ae73f-7db3-4e7f-b8a4-71335252d781.png',
      ],
    },
  ];

  return (
    <Container className="rtl min-h-max bg-gray-100">
      <Grid container spacing={2} padding={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <CheckoutTable {...{ products }} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} w>
          <CheckoutSummery {...{ products }} />
        </Grid>
      </Grid>
    </Container>
  );
}
