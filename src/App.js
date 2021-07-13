import { Grid } from '@material-ui/core';
import Tabs from './Components/Tabs/tabs';

function App() {
  return (
    <>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
      >
        <Tabs />
      </Grid>
    </>
  );
}

export default App;
