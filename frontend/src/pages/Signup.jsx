import React from 'react';

import Grid from '@mui/material/Grid2';

import LoginSection from '../components/auth/_LoginSection';
import SignupSection from '../components/auth/_SignupSection';
import { Container } from '@mui/material';

export default function Signup() {
  return (
    <Container className="rtl min-h-max bg-gray-100">
      <Grid container spacing={1}>
        <Grid size={{ xs: 12, md: 8 }} w>
          <SignupSection />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <LoginSection />
        </Grid>
      </Grid>
    </Container>
  );
}
