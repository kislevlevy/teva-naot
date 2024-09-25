import React, { useEffect } from 'react';

import Grid from '@mui/material/Grid2';

import LoginSection from '../components/auth/_LoginSection';
import SignupSection from '../components/auth/_SignupSection';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.userState.user);

  useEffect(() => {
    if (currentUser?._id) navigate('/');
  }, [currentUser]);

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
