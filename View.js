import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom'
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
import { Button,Box,Fab, Checkbox, TextField,CardContent,CardHeader,FormGroup,Avatar } from '@mui/material';
import firebase from 'firebase';
// import { product} from '../../Firebase';
import {product} from '../../Firebase'
import { CheckBox,AccountCircleOutlined} from '@mui/icons-material';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Form from './Form';





export default function View() {
 
  // const[getname,setname]=useState('');

  const [image, setimage] = useState();

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const[data,setdata]=useState([]);
  // const [getname,setname]=useState('');
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
const [names,setnames] = useState('');
    const [brand,setbrand] = useState('');
    const [color,setcolor] = useState('');
    const [type,settype] = useState('');
    const [rent,setrent] = useState('');
    const [np,setnp] = useState('');
    const [chassis,setchassis] = useState('');
    const [rc,setrc] = useState('');
    // const [type,settype] = useState('');


function delpro(x){
      product.doc(x).delete();
      // storageRef.refFromURL(x.data().Image).delete();
      alert('Product Deleted');    
  }

const[check,setcheck]=useState(false);
var a=useNavigate();
  function Edit1(e){
    setcheck(true);
  var path='/View?uid'+e;
  a(path);
    
    }
    var id=new URLSearchParams(window.location.search).get('uid');
// function getData(){
// if(id)
// }
  
  return (
    <>
    <Navbar/>
    <Fab color='primary' onClick={Edit1} style={{position:'fixed', right:'20px', bottom:'20px'}}>
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
                { check && (<TableCell>
                   <Checkbox onClick={handleOpen}/>
                   </TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
 <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form onSubmit={getData}>
                                          <CardContent>
                                    <CardHeader avatar={
                                        <Avatar sx={{ bgcolor: 'royalblue' }}><AccountCircleOutlined /></Avatar>}
                                        title="AddDriver" />
                                   <FormGroup>
                               <TextField type={"text"}  value={names}  size="small" name="cn" label="Car Name" required/>
                                   </FormGroup>
                                   <br/>
                                   <FormGroup>
                               <TextField type={"text"}  size="small" name="cb" label="Car-brand" required/>
                                   </FormGroup>
                                   <br/>
                                   <FormGroup>
                               <TextField type={"text"}  size="small" name="cc" label="Car-color" required/>
                                   </FormGroup>
                                   <br/>
                                   <FormGroup>
                               <TextField type={"text"}  size="small" name="ct" label="Car-Type" required/>
                                   </FormGroup>
                                   
                                   <br/>
                                  <FormGroup>
                               <TextField type={"number"}  size="small" name="ca" label="Caramount" required/>
                                   </FormGroup>
                                   <br/>
                                   
                                   <FormGroup>
                               <TextField type={"text"}  size="small" name="cp" label="Car-no-plate" required/>
                                   </FormGroup>
                                   <br/>
                                   <FormGroup>
                               <TextField type={"text"}  size="small" name="cch" label="Chasis-Number" required/>
                                   </FormGroup>
                                   <br/>
                                   <FormGroup>
                               <TextField type={"text"}  size="small" name="rc" label="Rc-Number" required/>
                                   </FormGroup>
                                   <br/>
                                   <TextField onChange={(e) => setimage(e.target.files[0])} type={'file'} name='image' fullWidth size='small' />
                                   <Button type={"submit"}>Update</Button>
                                  </CardContent>
                                  </form>
        </Box>
      </Modal>


    </>
  );
}
