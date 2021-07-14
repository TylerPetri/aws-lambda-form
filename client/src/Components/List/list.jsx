import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/users');
      const jsonData = await res.json();
      const data = jsonData.sort((a, b) =>
        a.createdAt < b.createdAt ? 1 : -1
      );
      setUsers([...data]);
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [users]);

  function edit() {
    props.setValue(0);
  }

  async function deleteUser(name, createdAt) {
    const deletion = async () => {
      const res = await fetch(`/api/users/${createdAt}/${name}`, {
        method: 'DELETE',
      });
    };
    await deletion();
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
      {users.map((user) => (
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
                to={`/edit/${user.Users}`}
                style={{ textDecoration: 'none' }}
              >
                <Button
                  variant='outlined'
                  color='primary'
                  style={{ marginLeft: '10px' }}
                  onClick={() => edit}
                >
                  EDIT
                </Button>
              </Link>
              <Button
                variant='outlined'
                color='secondary'
                style={{ marginLeft: '10px' }}
                onClick={() => deleteUser(user.Users, user.createdAt)}
              >
                DELETE
              </Button>
            </div>
          </Grid>
        </>
      ))}
    </Grid>
  );
}
