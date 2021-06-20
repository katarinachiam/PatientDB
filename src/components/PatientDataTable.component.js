import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    backgroundColor: '#dde7ee',
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);


export default function PatientDataTable() {
  const [patData, setPatData] = useState([])
  console.log(patData)
  const classes = useStyles();

  useEffect(() => {
    console.log("hello")
    axios.get('http://hapi.fhir.org/baseR4/Patient?birthdate=lt2021-06-19&_count=30&_pretty=true')
      .then(response => {
        setPatData(response.data.entry);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])
  
  const ageList = (patData.map((row) => {
      var today = new Date();
      var birthDate = new Date(row.resource.birthDate);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate;
      if (m<0 || (m == 0 & today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }))

  var total_age = 0; 
  const entries = ageList.map((age) => (total_age += age));
  const tot_age = entries[entries.length - 1]
  const avg_age = tot_age/entries.length;


  return (
    <Box m={5} pt={10} className={classes.container}>
        <Box pb={5} className={classes.container}>
        <h2>Average Age of Patients: {avg_age}</h2>
        <h2>Total Number of Patients: {ageList.length}</h2>
        </Box>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <StyledTableCell>Patient ID</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Date&nbsp;of&nbsp;Birth</StyledTableCell>
                <StyledTableCell align="center">Gender</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {patData.map((row) => (
                <StyledTableRow key={row.resource.id}>
                <TableCell component="th" scope="row">{row.resource.id}</TableCell>
                <TableCell align="center">{row.resource.name[0].given[0]+" "+row.resource.name[0].family}</TableCell>
                <TableCell align="center">{row.resource.birthDate}</TableCell>
                <TableCell align="center">{row.resource.gender}</TableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </Box> 
  );
}