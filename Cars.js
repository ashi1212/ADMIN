import { Box, Button, Card, CardContent, Grid, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import { AccountCircleOutlined, DirectionsCarOutlined } from '@mui/icons-material';
import {CardHeader,TextField,Avatar,form,FormGroup } from '@mui/material';
import firebase from 'firebase';
import { product,storageRef } from '../../Firebase';
import Navbar from "./Navbar";

function Cars(){

    const steps = ['Car Type','Car Details'];

    const [acstep, setAcstep] = useState(0);

    const [globid,setglobid]=useState();
    const[getname,setname]=useState('');

    const [image, setimage] = useState();

    const[next,setnext]=useState(false);

    function Cartype(e){
        e.preventDefault();
        var data=new FormData(e.currentTarget);
        var carname=data.get('cn');
        // var cartype=data.get('ct')
        product.doc(carname).set({
            Carname:carname
        }).then((succ)=>{
           alert('Now Add more about the car');
           setname(carname);
           setglobid(carname);
           setAcstep(1);
    }).catch((err)=>{
        console.log(err);
            alert('Sorry, something went wrong');
            
    })
}

  function CarDetails(e){
        e.preventDefault();
        var data=new FormData(e.currentTarget);
        var cbr=data.get('cb'); //car
        var cclr=data.get('cc'); 
        var cartype=data.get('ct'); 
        var caram=data.get('ca'); 
        var carp=data.get('cp'); 
        var chassis=data.get('cch'); 
        var crc=data.get('rc');  
        var carname=data.get('cn');

var uploadTask = storageRef.ref().child('images/'+carname).put(image);


uploadTask.on('state_changed', 
  (snapshot) => {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case firebase.storage.TaskState.PAUSED: // or 'paused'
        console.log('Upload is paused');
        break;
      case firebase.storage.TaskState.RUNNING: // or 'running'
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    
  }, 
  () => {

    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      console.log('File available at', downloadURL);

      product.doc(globid).update({
        Carbrand:cbr,
        Color:cclr,
        Type:cartype,
        CarAmount:caram,
        CarNoPlate:carp,
        Chasisno:chassis,
        RC:crc,
        Pics:downloadURL
    }).then((succ)=>{
        alert('data added')
    })
    });
  }
);
}
  

    return(
        <Grid container>

            <Navbar/>

            <Grid lg={12} sx={{p:10}}>

                <Card>
                    <CardContent>
                        <Stepper activeStep={acstep}>
                            {steps.map((row) => (
                                <Step key={row}>
                                    <StepLabel>{row}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        {/* {steps.length} */}

                       
                        {acstep == 0 && (
                       <form onSubmit={Cartype}>
                       <CardContent>
                       <CardHeader avatar={
                               <Avatar sx={{bgcolor:'royalblue'}}><DirectionsCarOutlined/></Avatar>}
                               title="Add Car Type"/>
                       <FormGroup>
                    <TextField type={"text"}  size="small"  name="cn" placeholder="Enter Car Name" required/>
                        </FormGroup>
                        <br/>
                      <FormGroup>
                      
                          <Button type="submit" variant="contained">Add</Button>
                      </FormGroup>
                      <br/>
                      
                       </CardContent>
                       </form>
                    //               
                        )}{acstep == 1 && (
                            <form onSubmit={CarDetails}>
                                          <CardContent>
                                    <CardHeader avatar={
                                        <Avatar sx={{ bgcolor: 'royalblue' }}><AccountCircleOutlined /></Avatar>}
                                        title="AddDriver" />
                                   <FormGroup>
                               <TextField type={"text"} disabled value={getname}  size="small" name="cn" label="Car Name" required/>
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
                                   <Button type={"submit"}>Finish</Button>
                                  </CardContent>
                                  </form>
                      )}
                      

                    </CardContent>
                </Card>

            </Grid>            

        </Grid>

    )
}
export default Cars;
