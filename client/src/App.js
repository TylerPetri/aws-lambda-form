import React from 'react';
import { Grid } from '@material-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Tabs from './Components/Tabs/tabs';
import Form from './Components/Form/form';
import List from './Components/List/list';

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
          <Tabs />
          <Route exact path='/' component={Form} />
          <Route path='/list' component={List} />
          <Route path='/edit/:createdAt' component={Form} />
        </Grid>
      </Router>
    </>
  );
}

export default App;
