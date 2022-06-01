import React from 'react';
import FormLogin from '../../components/FormLogin';
import Banner from '../../components/Banner';
import { Box, Grid } from '@material-ui/core';
import Footer from '../../components/Footer';

function Login() {

    return (
        <Box style={{ width: '100%', height: '100%' }}>
            <Grid container spacing={0} sx={{ maxHeight: '600px' }}>
                <Grid item xs={8}>
                    <Banner />
                </Grid>
                <Grid item xs={4}>
                    <FormLogin />
                </Grid>
                <Grid item xs={12}>
                    <Footer />
                </Grid>
            </Grid>
        </Box>
    );
}

export default Login;