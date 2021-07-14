import React from 'react';
import { Grid } from '@material-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';
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
          <Route exact path='/edit/:createdAt' component={Tabs} />
        </Grid>
      </Router>
    </>
  );
}

export default App;
