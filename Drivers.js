import { Button, Card, CardContent, Grid, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import { AccountCircleOutlined } from '@mui/icons-material';
import { CardHeader, TextField, Avatar, form, FormGroup } from '@mui/material';
import firebase from 'firebase';
import { db } from '../../Firebase';
import Navbar from "./Navbar";

function Drivers() {

    const steps = ['Personal Details', 'Professional Details'];

    const [acstep, setAcstep] = useState(0);



    const [globid, setglobid] = useState();

    const [getname, setname] = useState('');

    const [next, setnext] = useState(false);
    const [back, setback] = useState(false);
    const [forms, showforms] = useState(true);
    function PersonalDetails(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var drn = data.get('dn');
        var drage = data.get('da'); //driver age
        var drdob = data.get('db'); //dob
        var dradd = data.get('add'); //address
        var drcon = data.get('dc'); //contact
        db.collection('driver').add({
            Name: drn,
            Age: drage,
            DOB: drdob,
            Address: dradd,
            Contact: drcon,
        }).then((succ) => {

            console.log(succ.id);
            alert('Personal Details Added \n Now Add Professional details');
            setAcstep(1);
            setglobid(succ.id);

        }).catch((err) => {
            console.log(err);
            alert('Sorry, something went wrong');
            //showforms(true);
        })
    }

      function ProDetails(e){
            e.preventDefault();
            var data=new FormData(e.currentTarget);
            var dli=data.get('dl');
            var exp=data.get('de');

            db.collection('driver').doc(globid).update({
                License:dli,
                Experience:exp
            }).then((succ) => {
                alert('hi');
            })
    }


    return (
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

                        {/* <form onSubmit={PersonalDetails}> */}

                            {acstep == 0 && (
                                <form onSubmit={PersonalDetails}>
                                <CardContent>
                                    <FormGroup>
                                        <TextField type={"text"} size="small" name="dn" label="Driver Name" required />
                                    </FormGroup>
                                    <br />
                                    <FormGroup>
                                        <TextField type={"number"} size="small" name="da" label="Driver-Age" required />
                                    </FormGroup>
                                    <br />
                                    <FormGroup>
                                        <TextField type={"text"} size="small" name="db" label="Driver DOB" required />
                                    </FormGroup>
                                    <br />
                                    <FormGroup>
                                        <TextField type={"text"} size="small" name="add" label="Driver Address" required />
                                    </FormGroup>
                                    <br />

                                    <FormGroup>
                                        <TextField type={"text"} size="small" name="dc" label="Driver Contact" required />
                                    </FormGroup>
                                    <br />
                                    <FormGroup>
                                        <Button type="submit" variant="contained">Add</Button>
                                    </FormGroup>
                                </CardContent>
                                </form>
                            )}{acstep == 1 && (
                                <form onSubmit={ProDetails}>
                                <CardContent>
                                    <CardHeader avatar={
                                        <Avatar sx={{ bgcolor: 'royalblue' }}><AccountCircleOutlined /></Avatar>}
                                        title="AddDriver" />
                        
                                    <FormGroup>
                                        <br />
                                        <TextField type={"text"} size="small" name="dl" label="Driver's License " />
                                    </FormGroup>
                                    <br />
                                    <FormGroup>
                                        <TextField type={"text"} size="small" name="de" label="Driver Experience" />
                                    </FormGroup>
                                    <br />
                                    <FormGroup>
                                        <Button type="submit" variant="contained">Add</Button>
                                    </FormGroup>
                                    <br />
                                </CardContent>
                                </form>
                            )}
                            {/* {acstep == 2 && (
                          <p>hello1</p> */}
                            {/* )} */}
                            {/* {acstep > 0 && (
                                <Button onClick={decrement}>Previous</Button>
                            )} */}
                            {/* {acstep} */}
                            {/* {steps.length-1} */}
                            {/* //step.length=3 */}
                            {/* {(acstep == steps.length - 1) && (
                                <Button type='submit' variant="contained" style={{ float: 'right' }}>Add Driver</Button>
                            )} */}

                        {/* </form> */}


                    </CardContent>
                </Card>

            </Grid>


        </Grid>
    )
}
export default Drivers;
