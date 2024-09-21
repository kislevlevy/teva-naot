import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Grid from '@mui/material/Grid2';
import { Container } from '@mui/material';

import CheckoutTable from '../components/checkout/_CheckoutTable';
import CheckoutSummery from '../components/checkout/_ChackoutSummery';
import Shipping from '../components/checkout/subComponents/_Shipping';

const products = [
  {
    name: 'שחר נשים',
    _id: 1,
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
    _id: 2,
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

export default function Checkout() {
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const currentUser = useSelector((state) => state.userState.user);
  useEffect(() => {
    if (!currentUser || !currentUser._id) navigate('/signup');
  }, [currentUser]);

  return (
    <Container className="rtl min-h-max bg-gray-100">
      <Grid container spacing={2} padding={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <CheckoutTable {...{ products }} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Shipping
            {...{ address, setAddress, city, setCity, postalCode, setPostalCode }}
          />
          <CheckoutSummery {...{ products }} />
        </Grid>
      </Grid>
    </Container>
  );
}
