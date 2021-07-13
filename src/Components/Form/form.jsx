import { FormControl, InputLabel, Input, Grid } from '@material-ui/core';
import FormBTN from '../Buttons/formBTN';

function form() {
  return (
    <>
      <Grid
        container
        direction='column'
        justifyContent='space-around'
        alignItems='center'
      >
        <FormControl>
          <InputLabel htmlFor='my-input'>Name</InputLabel>
          <Input id='my-input' aria-describedby='my-helper-text' />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='my-input'>Email</InputLabel>
          <Input id='my-input' aria-describedby='my-helper-text' />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='my-input'>Phone Number</InputLabel>
          <Input id='my-input' aria-describedby='my-helper-text' />
        </FormControl>
        <FormControl>
          <InputLabel htmlFor='my-input'>Address</InputLabel>
          <Input id='my-input' aria-describedby='my-helper-text' />
        </FormControl>
        <FormBTN />
      </Grid>
    </>
  );
}

export default form;
