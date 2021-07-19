import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import spinner from '../../assets/spinner.gif';
import { useStoreContext } from '../../utils/GlobalStore';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function AlignItemsList(props) {
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);
  const [deleteLoad, setDelLoad] = useState(false);
  const [users, setUsers] = useState([]);
  const [{ loadDelay }, dispatch] = useStoreContext();

  const fetchData = async () => {
    try {
      const res = await fetch(
        'https://o06bkgr364.execute-api.us-east-2.amazonaws.com/api/users'
      );
      const jsonData = await res.json();
      const items = jsonData.Items;
      const data = items.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
      setUsers([...data]);
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (loadDelay) {
      setTimeout(function () {
        fetchData();
        dispatch({ type: 'DELAY_OFF' });
      }, 1000);
    } else {
      fetchData();
    }
  }, []);

  async function deleteUser(createdAt, id) {
    const deletion = async () => {
      setDelLoad(true);
      await fetch(
        `https://o06bkgr364.execute-api.us-east-2.amazonaws.com/api/users/?ca=${createdAt}&id=${id}`,
        {
          method: 'DELETE',
        }
      );
    };
    await deletion();
    setDelLoad(false);
    fetchData();
  }

  return (
    <Grid
      container
      direction='column'
      justifyContent='space-around'
      alignItems='center'
      style={{ maxWidth: '800px' }}
    >
      {deleteLoad ? (
        <img
          src={spinner}
          style={{
            margin: '100px auto',
            height: '77px',
            width: '77px',
            position: 'absolute',
            top: '0',
            zIndex: '10',
          }}
        />
      ) : (
        <></>
      )}

      {!isLoaded ? (
        <img
          src={spinner}
          style={{ margin: '50px', height: '77px', width: '77px' }}
        />
      ) : (
        users.map((user) => (
          <>
            <Grid
              container
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              style={{ padding: '10px', width: '80%' }}
            >
              <List className={classes.root}>
                <ListItem alignItems='flex-start'>
                  <ListItemText
                    primary={user.Users}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component='span'
                          variant='body2'
                          className={classes.inline}
                          color='textPrimary'
                        >
                          {user.email} - {user.phone}
                        </Typography>
                        <br></br>
                        {user.address}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant='inset' component='li' />
              </List>
              <div>
                <Link
                  to={`/edit/${user.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Button
                    variant='outlined'
                    color='primary'
                    style={{ marginLeft: '10px' }}
                  >
                    EDIT
                  </Button>
                </Link>
                <Button
                  variant='outlined'
                  color='secondary'
                  style={{ marginLeft: '10px' }}
                  onClick={() => deleteUser(user.createdAt, user.id)}
                >
                  DELETE
                </Button>
              </div>
            </Grid>
          </>
        ))
      )}
    </Grid>
  );
}
