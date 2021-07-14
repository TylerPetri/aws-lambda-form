import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

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

export default function AlignItemsList() {
  const classes = useStyles();
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
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
    fetchData();
  }, []);

  async function test() {
    const res = await fetch('/api/users');
    const jsonData = await res.json();
    console.log(jsonData);
  }

  return (
    <Grid
      container
      direction='column'
      justifyContent='space-around'
      alignItems='center'
    >
      <button onClick={test}>testtest</button>
      {users.map((user) => (
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
                    {user.email}
                  </Typography>
                  {user.phone} - {user.address}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant='inset' component='li' />
        </List>
      ))}
    </Grid>
  );
}
