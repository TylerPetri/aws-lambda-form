import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useEffect } from 'react';

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
        <Box p={1}>
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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState();
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') setValue(0);
    if (location.pathname === '/list') setValue(1);
    if (location.pathname.includes('/edit/')) setValue(0);
  }, [location]);

  function toPage(page) {
    history.push(page);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position='static' style={{ width: 'max-content' }}>
        <Tabs value={value} onChange={() => handleChange}>
          <Tab
            label='CREATE USER'
            onClick={() => toPage('/')}
            style={{ width: '400px', maxWidth: '400px' }}
            className='navTab'
          />
          <Tab
            label='LIST USERS'
            onClick={() => toPage('/list')}
            style={{ width: '400px', maxWidth: '400px' }}
            className='navTab'
          />
        </Tabs>
      </AppBar>
    </div>
  );
}
