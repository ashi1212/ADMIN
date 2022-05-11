import React,{useState,useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Navbar from "./Navbar";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import E from '@mui/icons-material/Edit';
import { Button,Box,Fab, Checkbox } from '@mui/material';
import firebase from 'firebase';
import {product} from '../../Firebase'
import { CheckBox } from '@mui/icons-material';
// function createData(name, Brand, Color, Type, Rent,Carnp,Chassisno,RC,PICS) {
//   return { name, Brand, Color, Type, Rent,Carnp,Chassisno,RC,PICS};
// }

// const rows = [
//   createData('Baleno', 'Maruti','White','Suv', 400,'PB-10-HD-7198',123456789,123456789),
//   createData('Ertica', 'Maruti', 'White','SUV', 430,'PB-10-HD-7198',123456789,123456789),
//   createData('Brio','Honda', 'White','SUV', 600,'PB-10-HD-7198',123456789,123456789),
//   createData('Etios','Toyata','White','SUV', 403,'PB-10-HD-7198',123456789,123456789),
//   createData('Innova','Toyata', 'White','SUV', 390,'PB-10-HD-7198',123456789,123456789),
// ];




export default function View() {

  const[data,setdata]=useState([]);
function Fetch(e){
  product.onSnapshot((succ)=>{
    const ar=[];
    succ.forEach((succc)=>{
      ar.push(succc);
    })
    setdata(ar);
  })

}
useEffect(()=>{
  Fetch();
})
  
function delpro(x){
      product.doc(x).delete();
      // storageRef.refFromURL(x.data().Image).delete();
      alert('Product Deleted');    
  }


  function Edit(e){
    e.preventDefault();
    var data=new FormData(e.currentTarget);
    product.doc(name).get().then((succ)=>{

    })

  }
  return (
    <>
    <Navbar/>
    <Fab color='primary' style={{position:'fixed', right:'20px', bottom:'20px'}} onClick={Edit}>
            <E/>
        </Fab>

    <Box lg={6}
    sx={{
      width:1000,
      height:1000,
      justifyContent:'center',ml:20,mt:10}} 
    >
    <TableContainer lg={5} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Cars-Name</TableCell>
            <TableCell align="right">Car-brand</TableCell>
            <TableCell align="right">Car-color&nbsp;</TableCell>
            <TableCell align="right">Car-type&nbsp;</TableCell>
            <TableCell align="right">Rent Amount&nbsp;</TableCell>
            <TableCell align="right">Car number plate&nbsp;</TableCell>
            <TableCell align="right">Chassis&nbsp;</TableCell>
            <TableCell align="right">Rc number&nbsp;</TableCell>
            <TableCell align="right">Pics&nbsp;</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell component="th" scope="row">
              </TableCell> */}
              <TableCell align="right">{row.data().Carname}</TableCell>
              <TableCell align="right">{row.data().Carbrand}</TableCell>
              <TableCell align="right">{row.data().Color}</TableCell>
              <TableCell align="right">{row.data().Type}</TableCell>
              <TableCell align="right">{row.data().CarAmount}</TableCell>
              <TableCell align="right">{row.data().CarNoPlate}</TableCell>
              <TableCell align="right">{row.data().Chasisno}</TableCell>
              <TableCell align="right">{row.data().RC}</TableCell>
              <TableCell align="right"><img src={row.data().Pic} height="100px"/></TableCell>
              <TableCell><Button
               onClick={()=>delpro(row.id)}
              >
                 <DeleteOutlineIcon/></Button></TableCell>
                 <TableCell>
                   <Checkbox onClick={Edit1}/>
                   </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </>
  );
}
