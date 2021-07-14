import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Tabs from './Components/Tabs/tabs';

function App() {
  return (
    <>
      <Router>
        <Grid
          container
          direction='column'
          justifyContent='center'
          alignItems='center'
        >
          <Route exact path='/' component={Tabs} />
        </Grid>
      </Router>
    </>
  );
}

export default App;
