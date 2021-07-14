import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

function Form(props) {
  const { createdAt: userParam } = useParams();
  const [editing, setEditing] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [shrink1, setShrink1] = useState(false);
  const [shrink2, setShrink2] = useState(false);
  const [shrink3, setShrink3] = useState(false);
  const [shrink4, setShrink4] = useState(false);

  useEffect(() => {
    if (userParam) {
      const fetchData = async () => {
        try {
          const res = await fetch(`/api/users/${userParam}`);
          const data = await res.json();
          setFormState({
            name: data[0].Users,
            email: data[0].email,
            phone: data[0].phone,
            address: data[0].address,
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
      setEditing(true);
    }
    // if (formState.name.length > 0) setShrink1(true);
  }, [userParam]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const postData = async () => {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });
    };
    postData();

    setFormState({ name: '', email: '', phone: '', address: '' });
    props.setValue(1);
  };

  const updateUser = async (createdAt, name) => {
    // const res = await fetch(`/api/users/${createdAt}/${name}`);
    console.log('updating');
  };

  return (
    <>
      {' '}
      <Container maxWidth='sm'>
        <Grid
          container
          direction='column'
          justifyContent='space-evenly'
          alignItems='center'
          style={{ height: '400px', width: '555px' }}
        >
          <TextField
            fullWidth
            id='filled-basic'
            label='Name'
            variant='filled'
            value={formState.name}
            onChange={(event) =>
              setFormState({ ...formState, name: event.target.value })
            }
            onSelect={() => setShrink1(true)}
            // InputLabelProps={{ shrink: shrink1 }}
          />
          <TextField
            fullWidth
            id='filled-basic'
            label='Email'
            variant='filled'
            value={formState.email}
            onChange={(event) =>
              setFormState({ ...formState, email: event.target.value })
            }
            onSelect={() => setShrink2(true)}
            // InputLabelProps={{ shrink: shrink2 }}
          />
          <TextField
            fullWidth
            id='filled-basic'
            label='Phone'
            variant='filled'
            value={formState.phone}
            onChange={(event) =>
              setFormState({ ...formState, phone: event.target.value })
            }
            onSelect={() => setShrink3(true)}
            // InputLabelProps={{ shrink: shrink3 }}
          />
          <TextField
            fullWidth
            id='filled-basic'
            label='Address'
            variant='filled'
            value={formState.address}
            onChange={(event) =>
              setFormState({ ...formState, address: event.target.value })
            }
            onSelect={() => setShrink4(true)}
            // InputLabelProps={{ shrink: shrink4 }}
          />
        </Grid>
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          style={{ width: '400px', margin: '0 auto' }}
        >
          {editing ? (
            <Button variant='contained' color='primary' onClick={updateUser}>
              SAVE
            </Button>
          ) : (
            <Button
              variant='contained'
              color='primary'
              onClick={handleFormSubmit}
            >
              SAVE
            </Button>
          )}

          <Link to='/' style={{ textDecoration: 'none' }}>
            <Button color='secondary'>DELETE</Button>
          </Link>
        </Grid>
      </Container>
    </>
  );
}

export default Form;
