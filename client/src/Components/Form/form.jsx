import React, { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';

function Form() {
  const { createdAt: userParam } = useParams();
  const [editing, setEditing] = useState(false);
  const [formState, setFormState] = useState({
    id: 0,
    name: '',
    email: '',
    phone: '',
    address: '',
    createdAt: 0,
  });
  const [reqName, setReqName] = useState(false);
  const [reqEmail, setReqEmail] = useState(false);
  const [reqPhone, setReqPhone] = useState(false);
  const [reqAddress, setReqAddress] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (userParam) {
      const fetchData = async () => {
        try {
          const res = await fetch(`/api/users/${userParam}`);
          const data = await res.json();
          setFormState({
            id: data[0].id,
            name: data[0].Users,
            email: data[0].email,
            phone: data[0].phone,
            address: data[0].address,
            createdAt: data[0].createdAt,
          });
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
      setEditing(true);
    }
  }, [userParam]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (
      formState.name &&
      formState.email &&
      formState.phone &&
      formState.address
    ) {
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

      setFormState({
        id: 0,
        name: '',
        email: '',
        phone: '',
        address: '',
        createdAt: 0,
      });
      history.push('/list');
    } else {
      if (formState.name === '') {
        setReqName(true);
      } else {
        setReqName(false);
      }
      if (formState.email === '') {
        setReqEmail(true);
      } else {
        setReqEmail(false);
      }
      if (formState.phone === '') {
        setReqPhone(true);
      } else {
        setReqPhone(false);
      }
      if (formState.address === '') {
        setReqAddress(true);
      } else {
        setReqAddress(false);
      }
    }
  };

  const updateUser = async (event) => {
    event.preventDefault();
    if (
      formState.name &&
      formState.email &&
      formState.phone &&
      formState.address
    ) {
      const postData = async () => {
        const res = await fetch(
          `/api/users/${formState.createdAt}/${userParam}`,
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formState),
          }
        );
      };
      postData();

      setFormState({
        id: 0,
        name: '',
        email: '',
        phone: '',
        address: '',
        createdAt: 0,
      });
      history.push('/list');
    } else {
      if (formState.name === '') {
        setReqName(true);
      } else {
        setReqName(false);
      }
      if (formState.email === '') {
        setReqEmail(true);
      } else {
        setReqEmail(false);
      }
      if (formState.phone === '') {
        setReqPhone(true);
      } else {
        setReqPhone(false);
      }
      if (formState.address === '') {
        setReqAddress(true);
      } else {
        setReqAddress(false);
      }
    }
  };

  const deleteUser = async (event) => {
    event.preventDefault();

    const deletion = async () => {
      const res = await fetch(
        `/api/users/${formState.createdAt}/${userParam}`,
        {
          method: 'DELETE',
        }
      );
    };
    await deletion();
    history.push('/list');
  };

  const clearForm = async (event) => {
    setFormState({
      id: 0,
      name: '',
      email: '',
      phone: '',
      address: '',
      createdAt: 0,
    });
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
          {editing ? (
            <TextField
              fullWidth
              disabled
              id='filled-basic'
              label='Name'
              variant='filled'
              value={formState.name}
            />
          ) : (
            <TextField
              fullWidth
              error={reqName ? true : false}
              id='filled-basic'
              label='Name'
              variant='filled'
              value={formState.name}
              onChange={(event) =>
                setFormState({ ...formState, name: event.target.value })
              }
            />
          )}
          <TextField
            fullWidth
            error={reqEmail ? true : false}
            id='filled-basic'
            label='Email'
            variant='filled'
            value={formState.email}
            onChange={(event) =>
              setFormState({ ...formState, email: event.target.value })
            }
          />
          <TextField
            fullWidth
            error={reqPhone ? true : false}
            id='filled-basic'
            label='Phone'
            variant='filled'
            value={formState.phone}
            onChange={(event) =>
              setFormState({ ...formState, phone: event.target.value })
            }
          />
          <TextField
            fullWidth
            error={reqAddress ? true : false}
            id='filled-basic'
            label='Address'
            variant='filled'
            value={formState.address}
            onChange={(event) =>
              setFormState({ ...formState, address: event.target.value })
            }
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

          {editing ? (
            <Button color='secondary' onClick={deleteUser}>
              DELETE
            </Button>
          ) : (
            <Button color='secondary' onClick={clearForm}>
              DELETE
            </Button>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default Form;
