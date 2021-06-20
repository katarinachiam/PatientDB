import Grid from '@material-ui/core/Grid';

import MenuBar from "./components/MenuBar.component";
import PatientDataTable from "./components/PatientDataTable.component";


export default function App() {

  return (
    <div>
      <MenuBar/>
      <Grid container spacing={2}> 
        <Grid item xs={2}/>
        <Grid item xs={8}> 
          <PatientDataTable/>
        </Grid>
        <Grid item xs={2}/>
      </Grid> 
    </div> 
  );
}
