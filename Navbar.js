import * as React from 'react';
import { styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { AccountCircle, Add, Delete, TableBarOutlined, Edit, ContentCopy, Dashboard, DirectionsCarFilledOutlined, ExpandMore, LogoutOutlined, PersonAddAlt1Outlined, ViewComfy } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary, Button, Menu, MenuItem } from '@mui/material';
import { bgcolor } from '@mui/system';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import InventoryIcon from '@mui/icons-material/Inventory';



const drawerWidth = 240;


 const openedMixin = (theme) => ({
   width: drawerWidth,
   transition: theme.transitions.create('width', {
     easing: theme.transitions.easing.sharp,
     duration: theme.transitions.duration.enteringScreen,
   }),
   overflowX: 'hidden',
 });

 const closedMixin = (theme) => ({
   transition: theme.transitions.create('width', {
     easing: theme.transitions.easing.sharp,
     duration: theme.transitions.duration.leavingScreen,
   }),
   overflowX: 'hidden',
   width: `calc(${theme.spacing(7)} + 1px)`,
   [theme.breakpoints.up('sm')]: {
     width: `calc(${theme.spacing(8)} + 1px)`,
   },
 });

 const DrawerHeader = styled('div')(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'flex-end',
   padding: theme.spacing(0, 1),
   // necessary for content to be below app bar
   ...theme.mixins.toolbar,
 }));


 const AppBar = styled(MuiAppBar, {
   shouldForwardProp: (prop) => prop !== 'open',
 })(({ theme, open }) => ({
   zIndex: theme.zIndex.drawer + 1,
   transition: theme.transitions.create(['width', 'margin'], {
     easing: theme.transitions.easing.sharp,
     duration: theme.transitions.duration.leavingScreen,
   }),
   ...(open && {
     marginLeft: drawerWidth,
     width: `calc(100% - ${drawerWidth}px)`,
     transition: theme.transitions.create(['width', 'margin'], {
       easing: theme.transitions.easing.sharp,
       duration: theme.transitions.duration.enteringScreen,
     }),
   }),
 }));

 const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
   ({ theme, open }) => ({
     width: drawerWidth,
     flexShrink: 0,
     whiteSpace: 'nowrap',
     boxSizing: 'border-box',
     ...(open && {
       ...openedMixin(theme),
       '& .MuiDrawer-paper': openedMixin(theme),
     }),
     ...(!open && {
       ...closedMixin(theme),
       '& .MuiDrawer-paper': closedMixin(theme),
     }),
   }),
 );

export default function MiniDrawer() {

  var navi= useNavigate();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function logout(){
    localStorage.removeItem('adminlogin');
navi("/AdminL1");
  }

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{flexGrow:1}}>
            Dasboard
          </Typography>

          <Button
                    aria-controls={open1 ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open1 ? 'true' : undefined}
                    onClick={handleClick}
                    color="inherit"
                >
                    <AccountCircle/>
                    </Button>
                    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open1}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
      




        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
        <Link  to="/AdminL1" className="link">
            <ListItemButton
              
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  // 
                 
                }}
              >
                <LogoutOutlined /> 
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            </Link>
          
        </List>
        
        <List>
        <Link  to="/Drivers" className="link">
            <ListItemButton
          
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                
              }}
            >
              <ListItemIcon color='primary'
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  
                 
                }}
              >
                <PersonAddAlt1Outlined/>
              </ListItemIcon>
              <ListItemText  sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
         </Link>
        </List>
        <Divider/>





{/* Car icon for add and edit cars */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMore />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <DirectionsCarFilledOutlined/>
        </AccordionSummary>
        <AccordionDetails>

        <List>
        <Link  to="/Cars" className="link">
            <ListItemButton
          
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  
                 
                }}
              >
                <Add/>
              </ListItemIcon>
              <ListItemText primary='Add Cars' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
         </Link>
         </List>

         <List>
        <Link  to="/Cars" className="link">
            <ListItemButton
          
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  
                 
                }}
              >
                <ViewComfy/>
              </ListItemIcon>
              <ListItemText primary='Manage Cars' sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
         </Link>
         </List>


        </AccordionDetails>
      </Accordion>
<Divider/>
<List>
        <Link  to="/View" className="link">
            <ListItemButton
              
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  // 
                 
                }}
              >
                <InventoryIcon /> 
              </ListItemIcon>
              <ListItemText sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
            </Link>
          
        </List>
        <Divider />
        <List>
        <Link  to="/Form" className="link">
            <ListItemButton
          
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                  
                 
                }}
              >
                <ContentCopy/>
              </ListItemIcon>
              <ListItemText  sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
         </Link>
        </List> 
        <Divider />
        


      </Drawer>

      <Box component="main" >
        <DrawerHeader />
      </Box>
    </>
  );
              }