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
import firebase from 'firebase';
import { db } from '../../Firebase';
import {useNavigate} from  'react-router-dom';


const theme = createTheme();
export default function SignUp() {
  const navi = useNavigate();
  const [checklogin, setChecklogin] = useState(false);
  const [checkOTP, setcheckOTP] = useState(false);
  const [checkSign,setSign]=useState(false);
  const [OTPData, setOTPData] = useState();

  //function for register 
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstname = data.get('firstName');
    const lastname = data.get('lastName');
    console.log('');
    const email= data.get('email');
    const password = data.get('password');
    const pn=data.get('Contact');
    // const users = db.collection('signup').doc(email);
    db.collection('signup').doc(email).onSnapshot((succ) => {
        if(succ.exists){
          if(email === succ.data().Email){
            alert('You are Successfully registered');
            setChecklogin(true);
            console.log(checklogin);
          }
        }else{
            db.collection('signup').doc(email).set({
              Fname:firstname,
              Lname:lastname,
              Email: email,
              Password: password,
              Phone:pn
            }).then((succ) => {
              setSign(true);
              var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
            const phoneNumber = succ.data().Phone;
            console.log(phoneNumber);
            firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                .then((confirmationResult) => {
                  console.log('yes');
                    setOTPData(confirmationResult);
                    setcheckOTP(true);
                }).catch((error) => {
                    // console.log('no');
                });
            })
        }
    }) 
     

  };
// function OTP(event){
//   event.preventDefault();
//   var data=new FormData(event.currentTarget);
//   var phoneNumber =data.get('Contact');
//   var appVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
//               // otp
//             console.log(phoneNumber);
//             firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier).then((confirmationResult) => {
//                   console.log('yes');
//                     setOTPData(confirmationResult);
//                     setcheckOTP(true);
//                     checklogin(true);
                    
//             })
// }
 
  // function for checking login
  function handleLogin(e) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    db.collection('signup').doc(email).onSnapshot((succ) => {
      //email and password checking
      if(succ.exists){
              const em = succ.data().Email;
              const pas = succ.data().Password
              if(email === em && password === pas){
                localStorage.setItem('Navbar', em);
                navi('Navbar');
              }else{
                alert('Please enter correct email and password');
              }
      }else{
        alert('please register yourself first');
        setChecklogin(false);
      }
    })
  }

  return (
    <>
    {checklogin ? (<>
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
          <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2" onClick={() => setChecklogin(false)}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>


    </>) : (<>
      <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Contact"
                  label="Contact"
                  type="tel"
                  id="Contact"
                  autoComplete="new-password"
                />
              </Grid>
             
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Link href="#" variant="body2" onClick={() => setChecklogin(true)}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {checkSign ?(<>
        <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>

            <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="otp"
                  name="otp"
                  required
                  fullWidth
                  id="otp"
                  label="otp"
                  autoFocus
                />
            </Grid>
            </Grid>
            </Box>
            </>):(<><p>Enter the otp again</p></>)}
      </Container>
      
    </ThemeProvider>
    </>)}
    
    </>
  );
}
