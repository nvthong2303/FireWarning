import React from 'react';
import Nav from '../../components/Nav';
import HomeHeader from '../../components/HomeHeader';
import { makeStyles } from '@material-ui/core';
import Config from '../../components/Config'

const useStyles = makeStyles(theme => ({
    root: {
      height: '100%',
      overflow: 'hidden'
    }
  }));

function Setting() {
  const classes = useStyles();

    return (
    <div className={classes.root}>
        <HomeHeader/>
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'start' }}>
          <div style={{ width: '15%', height: '100%' }}>
            <Nav />
          </div>
          <div style={{ width: '85%', height: '100%' }}>
            <Config />
          </div>
        </div>
    </div>
    );
}

export default Setting;