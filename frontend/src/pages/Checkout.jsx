import{ useState } from 'react';

import Grid from '@mui/material/Grid2';
import { Container } from '@mui/material';

import CheckoutTable from '../components/checkout/_CheckoutTable';
import CheckoutSummery from '../components/checkout/_ChackoutSummery';
import CheckoutShipping from '../components/checkout/_CheckoutShipping';

export default function Checkout() {

const [PriceBeforeTax,setPriceBeforeTax]=useState(0)
  return (
    <Container className="rtl min-h-max bg-gray-100">
      <Grid container spacing={2} padding={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <CheckoutTable setPriceBeforeTax={setPriceBeforeTax} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CheckoutShipping />
          <CheckoutSummery PriceBeforeTax={PriceBeforeTax} />
        </Grid>
      </Grid>
    </Container>
  );
}
