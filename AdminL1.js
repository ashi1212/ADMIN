import React, {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ChatTwoTone } from '@mui/icons-material';
import firebase from 'firebase';
import { db } from '../../Firebase';
import { useNavigate } from 'react-router-dom';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        Welcome Admin
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function AdminL1() {

    const [checkOTP, setcheckOTP] = useState(false);

    const [OTPData, setOTPData] = useState();
      var path=useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log({
        var email = data.get('email');
        var password = data.get('password');
        // });

        db.collection('Admin').doc('admin').get().then((succ) => {
            if(succ.data().Email != email){
                alert('Please check your Email');
            }else if(succ.data().Password != password){
                alert('Please check your Password');
            }else{
                // otp generate

                var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

                const phoneNumber = succ.data().Phone;

                firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                    .then((confirmationResult) => {
                        console.log('yes');
                        setOTPData(confirmationResult);
                        setcheckOTP(true);
                        
                    }).catch((error) => {
                        console.log('no');
                    });

            }
        })




    };


    const handleOTP = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        // console.log({

            const code = data.get('otp');
            OTPData.confirm(code).then((result) => {
              const user = result.user;
              console.log('yes');
              console.log(user);
              path('/Dashboard')
            }).catch((error) => {
                console.log('no');
            });


    }



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />



{checkOTP ? (



<Box
sx={{
  marginTop: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}}
>
<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
  <ChatTwoTone />
</Avatar>
<Typography component="h1" variant="h5">
  Enter OTP
</Typography>
<Box component="form" onSubmit={handleOTP} noValidate sx={{ mt: 1 }}>
  <TextField
    margin="normal"
    required
    fullWidth
    id="otp"
    label="Enter OTP"
    name="otp"
    autoFocus
    type={'number'}
  />
  <Button
    type="submit"
    fullWidth
    
    variant="contained"
    sx={{ mt: 3, mb: 2 }}
  >
    Move ahead!
  </Button>
</Box>
</Box>






) : (








    <Box
    sx={{
      marginTop: 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}
  >
    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
      <LockOutlinedIcon />
    </Avatar>
    <Typography component="h1" variant="h5">
      Sign in
    </Typography>
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Sign In
      </Button>

      <div id='recaptcha-container'></div>

    </Box>
  </Box>




)}


        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
