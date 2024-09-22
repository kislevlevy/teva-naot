import{ useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Grid from '@mui/material/Grid2';
import { Container } from '@mui/material';

import CheckoutTable from '../components/checkout/_CheckoutTable';
import CheckoutSummery from '../components/checkout/_ChackoutSummery';
import Shipping from '../components/checkout/subComponents/_Shipping';

export default function Checkout() {


  return (
    <Container className="rtl min-h-max bg-gray-100">
      <Grid container spacing={2} padding={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <CheckoutTable setPriceBeforeTax={setPriceBeforeTax} />
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
