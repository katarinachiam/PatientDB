import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ContactsIcon from '@material-ui/icons/Contacts';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  linkFormat: {
      textDecoration: "None",
      color: "white",
  }
}));

const MenuBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ background: '#1c5b90' }}> {/*SeamlessMD colour*/}
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <ContactsIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            HADI FHIR Patient Table
          </Typography>
          <Button color="inherit">Applicant: Katarina Chiam</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default MenuBar;