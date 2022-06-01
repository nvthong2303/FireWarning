import React from 'react';
import Nav from '../../components/Nav';
import HomeHeader from '../../components/HomeHeader';
import HomeMain from '../../components/HomeMain';
import { Box, Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      height: '100%',
      overflow: 'hidden'
    }
  }));

function Home() {
  const classes = useStyles();

    return (
      <div className={classes.root}>
        <HomeHeader/>
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'start' }}>
          <div style={{ width: '15%', height: '100%' }}>
            <Nav />
          </div>
          <div style={{ width: '85%', height: '100%' }}>
            <HomeMain />
          </div>
        </div>
    </div>
    );
}

export default Home;