import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Grid, IconButton } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { uuid } from 'uuidv4';
import TextField from '@material-ui/core/TextField';
// import env from '../../env.json';

import spinner from '../../assets/spinner.gif';
import './form.css';
import { useStoreContext } from '../../utils/GlobalStore';

function Form() {
  const { id: userParam } = useParams();
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
  const [query, setQuery] = useState('Toronto, On');
  const [showMap, setShowMap] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [editLoad, setEditLoad] = useState(false);
  const [_, dispatch] = useStoreContext();

  const history = useHistory();

  useEffect(() => {
    if (userParam) {
      setIsLoaded(true);
      const fetchData = async () => {
        try {
          const res = await fetch(
            `https://o06bkgr364.execute-api.us-east-2.amazonaws.com/api/users/?id=${userParam}`
          );
          const data = await res.json();
          setFormState({
            id: data.Items[0].id,
            name: data.Items[0].Users,
            email: data.Items[0].email,
            phone: data.Items[0].phone,
            address: data.Items[0].address,
            createdAt: data.Items[0].createdAt,
          });
          setIsLoaded(false);
        } catch (error) {
          console.log(error);
        }
      };
      // fetchData();
      setEditing(true);
    }
  }, [userParam]);

  const postData = async () => {
    formState.id = uuid();
    await fetch(
      'https://o06bkgr364.execute-api.us-east-2.amazonaws.com/api/users',
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

  const updateData = async () => {
    await fetch(
      `https://o06bkgr364.execute-api.us-east-2.amazonaws.com/api/users`,
      {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      }
    );
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (
      formState.name &&
      formState.email &&
      formState.phone &&
      formState.address
    ) {
      editing ? updateData() : postData();

      setFormState({
        id: 0,
        name: '',
        email: '',
        phone: '',
        address: '',
        createdAt: 0,
      });
      dispatch({ type: 'DELAY_ON' });
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
      setEditLoad(true);
      await fetch(
        `https://o06bkgr364.execute-api.us-east-2.amazonaws.com/api/users/?ca=${formState.createdAt}&id=${userParam}`,
        {
          method: 'DELETE',
        }
      );
    };
    await deletion();
    setEditLoad(false);
    history.push('/list');
  };

  const clearForm = async () => {
    setFormState({
      id: 0,
      name: '',
      email: '',
      phone: '',
      address: '',
      createdAt: 0,
    });
  };

  function searchAddress() {
    if (formState.address === query) {
      !showMap ? setShowMap(true) : setShowMap(false);
    }
    if (formState.address.length > 1 && formState.address != query) {
      setShowMap(true);
      setQuery(formState.address.replace(/ /g, '+'));
    }
    if (formState.address === '') {
      setReqAddress(true);
    } else {
      setReqAddress(false);
    }
  }

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
          {editLoad ? (
            <img
              src={spinner}
              alt='loading-animation'
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

          {isLoaded ? (
            <img
              src={spinner}
              alt='loading-animation'
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
            InputProps={{
              endAdornment: (
                <IconButton onClick={searchAddress}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          style={{ width: '400px', margin: '0 auto' }}
        >
          <Button
            variant='contained'
            color='primary'
            onClick={handleFormSubmit}
          >
            SAVE
          </Button>
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
        <div
          className={showMap ? 'map' : 'active'}
          style={{ height: showMap ? '333px' : '0' }}
        >
          <iframe
            style={{
              width: '500px',
              height: '333px',
              border: '0',
              borderRadius: '10px',
              transition: '1s',
              overflow: 'hidden',
              opacity: showMap ? '1' : '0',
              visibility: showMap ? 'visible' : 'hidden',
              marginTop: showMap ? '0' : '50px',
            }}
            loading='lazy'
            allowfullscreen
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.API_KEY}
                  &q=${query}`}
          ></iframe>
        </div>
      </Container>
    </>
  );
}

export default Form;
