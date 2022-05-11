import { Card,CardContent,Avatar, TextField,Button, CardHeader } from "@mui/material";
import { Box } from "@mui/system";
import { ShoppingBagRounded } from "@mui/icons-material";
import React from "react";
import Navbar from "./Navbar";


function Form()
{
    return(
   <>
   <Navbar/>
   <Box ClassName="form-group"> 
       <Card>
       <CardHeader avatar={
                    <Avatar sx={{bgcolor:'royalblue'}}><ShoppingBagRounded/></Avatar>}
                    title="Add Product"
                    />
         <CardContent>
             <Form>
        <TextField label="Car-Name"  name="cn"  size='medium' required  type={'text'}/><br/><br/>
        <TextField label="Car-Price" name="cp"  size='medium' required type={'number'}/>
        <br/><br/>
       <Button variant="contained" color="primary">SUBMIT</Button>
       </Form>
        </CardContent>
        
       </Card>
   </Box>
   </>
    )
}


export default Form;