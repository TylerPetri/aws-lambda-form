import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';

import Form from '../Form/form';
import List from '../List/list';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={2}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const listUsers = () => {
    setValue(1);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' style={{ width: 'max-content' }}>
        <Tabs value={value} onChange={handleChange}>
          <Tab
            label='CREATE USER'
            {...a11yProps(0)}
            style={{ width: '400px', maxWidth: '400px' }}
          />
          <Tab
            label='LIST USERS'
            {...a11yProps(1)}
            style={{ width: '400px', maxWidth: '400px' }}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Form />
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          style={{ width: '400px', margin: '0 auto' }}
        >
          <Button variant='contained' color='primary' onClick={listUsers}>
            SAVE
          </Button>
          <Button color='secondary'>DELETE</Button>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List />
      </TabPanel>
    </div>
  );
}
