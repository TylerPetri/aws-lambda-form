import { FormControl, InputLabel, Input, Grid } from '@material-ui/core';

import './form.css';

function form() {
  return (
    <>
      <Grid
        container
        direction='column'
        justifyContent='space-evenly'
        alignItems='center'
        style={{ height: '400px' }}
      >
        <FormControl className='formInputBox'>
          <InputLabel htmlFor='my-input'>Name</InputLabel>
          <Input id='my-input' />
        </FormControl>
        <FormControl className='formInputBox'>
          <InputLabel htmlFor='my-input'>Email</InputLabel>
          <Input id='my-input' />
        </FormControl>
        <FormControl className='formInputBox'>
          <InputLabel htmlFor='my-input'>Phone Number</InputLabel>
          <Input id='my-input' />
        </FormControl>
        <FormControl className='formInputBox'>
          <InputLabel htmlFor='my-input'>Address</InputLabel>
          <Input id='my-input' />
        </FormControl>
      </Grid>
    </>
  );
}

export default form;
