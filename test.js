
import { Box, Button, Card, CardContent, Fab, Grid, LinearProgress, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { db, storageRef } from '../Firebase';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Category, Delete, ProductionQuantityLimits } from '@mui/icons-material';

function test(){
    const navi = useNavigate();

    const [user,setuser] = useState([]);
    function userl(){
        db.collection('Allproducts').orderBy('Name','asc')
        .onSnapshot((succ) => {
            var ar = [];
            succ.forEach((succc) => {
                ar.push(succc);
            })
            setuser(ar);
        })
    }

    useEffect(() => {
        userl();
    }, [])

    const [open, setOpen] = useState(false);

    const openmodal = () => setOpen(true);
    const closemodal = () => setOpen(false);

    const [open2, setOpen2] = useState(false);

    const openmodal2 = () => setOpen2(true);
    const closemodal2 = () => setOpen2(false);

    const [image, setimage] = useState();

    const [loading,setloading] = useState(0);


    console.log(image);
    const [loading2,setloading2] = useState(0);


    const addcategory = (e) => {
        setloading2(1);
        e.preventDefault();
        var data = new FormData(e.currentTarget);

        db.collection('category').add({
            categoryName:data.get('category')
        }).then((succ) => {
            e.target.reset();
            alert('Category Added');
            setloading2(0);
        })


    }

    const [allcat, setallcat] = useState([]);
    function showcat(){
        db.collection('category').orderBy('categoryName','asc').onSnapshot((succ) => {
            var ar = [];
            succ.forEach((succc) => {
                ar.push(succc);
            })
            setallcat(ar);
        })
    }
    useEffect(() => {
        showcat();
    }, [])

    const addproduct = (e) => {
        setloading(1);
        e.preventDefault();
        var data = new FormData(e.currentTarget);


        // image upload start


        var name = data.get('name');

        var uploadTask = storageRef.ref().child('images/'+name).put(image);

        uploadTask.on('state_changed', 
          (snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            setloading(progress);

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

                
                db.collection('Allproducts').add({
                    Name:data.get('name'),
                    Category:data.get('category'),
                    MRP:data.get('mrp'),
                    Price:data.get('price'),
                    Qty: data.get('qty'),
                    Image: downloadURL,
                }).then((succ) => {
                    setloading(0);
                    e.target.reset();
                    setimage(null);
                    alert('Product Added');
                })

            });
          }
        );
        // image upload ends

    }

    function delpro(x){
        if(window.confirm('Do you want to delete')){
            db.collection('Allproducts').doc(x.id).delete();
            storageRef.refFromURL(x.data().Image).delete();
            alert('Product Deleted');    
        }
    }

    return(
        <>
        <Navbar/>        

        <Fab onClick={openmodal} color='primary' style={{position:'fixed', right:'20px', bottom:'20px'}}>
            <ProductionQuantityLimits/>
        </Fab>

        <Fab onClick={openmodal2} color='primary' style={{position:'fixed', left:'20px', bottom:'20px'}}>
            <Category/>
        </Fab>


        <Modal open={open2} onClose={closemodal2}>
            <Box>
            <Grid container>
            <Grid md={4} style={{margin:'auto', marginTop:'100px'}}>
                <Card>
                    <CardContent>
                        <form onSubmit={addcategory}>
                        <CardContent>
                            <TextField type={'text'} name='category' label='Product Category' fullWidth size='small' />
                        </CardContent>
                        {loading2 <= 0 ? (
                            <Button type='submit' variant='contained' color='primary'>Add Category</Button>
                        ) : (
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress variant="determinate" value={10} />
                            </Box>
                        )}





                        </form>
                    </CardContent>
                </Card>
            </Grid>
            </Grid>
            </Box>
        </Modal>









        <Modal open={open} onClose={closemodal}>
            <Box>
            <Grid container>
            <Grid md={4} style={{margin:'auto', marginTop:'10px'}}>
                <Card>
                    <CardContent>
                        <form onSubmit={addproduct}>
                        <CardContent>
                            <select name='category' className='form-control'>
                                {allcat.map((row) => (
                                    <option>{row.data().categoryName}</option>
                                ))}
                            </select>
                        </CardContent>
                        <CardContent>
                            <TextField type={'text'} name='name' label='Product Name' fullWidth size='small' />
                        </CardContent>
                        <CardContent>
                            <TextField type={'number'} name='mrp' label='Product MRP' fullWidth size='small' />
                        </CardContent>
                        <CardContent>
                            <TextField type={'number'} name='price' label='Product Price' fullWidth size='small' />
                        </CardContent>
                        <CardContent>
                            <TextField type={'number'} name='qty' label='Product Qty' fullWidth size='small' />
                        </CardContent>
                        <CardContent>
                            <TextField onChange={(e) => setimage(e.target.files[0])} type={'file'} name='image' fullWidth size='small' />
                        </CardContent>

                        {loading <= 0 ? (
                            <Button type='submit' variant='contained' color='primary'>Add Product</Button>
                        ) : (
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress variant="determinate" value={10} />
                            </Box>
                        )}





                        </form>
                    </CardContent>
                </Card>
            </Grid>
            </Grid>
            </Box>
        </Modal>





        <Grid lg={10} style={{margin:'auto'}}>
            <Card>
                <CardContent>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>MRP</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Orders</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {user.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.data().Name}</TableCell>
                                    <TableCell>{row.data().MRP}</TableCell>
                                    <TableCell>{row.data().Price}</TableCell>
                                    <TableCell>{row.data().Qty}</TableCell>
                                    <TableCell><img src={row.data().Image} height='100px'/></TableCell>
                                    <TableCell>
                                        <Button onClick={() => delpro(row)}><Delete/></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>




                </CardContent>
            </Card>
        </Grid>


        </>
    )
}

