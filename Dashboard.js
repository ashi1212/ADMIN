import { Grid } from '@mui/material';
import React from 'react';
import Chart from 'chart.js/auto';
import { Bar, Bubble, Doughnut, Line, PolarArea, Radar } from 'react-chartjs-2';
import Navbar from '../ADMIN/Navbar'
import Form from './Form';
// import Drivers from '/Drivers';

function Dashboard(){

    const datas = {
        labels : ['bmw','audi','Jaguar'],
        datasets: [{
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)'],
          label:'Cars',
          data: [10,50,60]
        }]
      }

    return(
        <>
        <Navbar/>
        <Grid container>
            <Grid lg={4}>
            <Bar data={datas} height={100} />
            </Grid>
            <Grid lg={4}>
            <Line data={datas} height={100} />
            </Grid>
            <Grid lg={4}>
            <Doughnut data={datas} height={100} />
            </Grid>
            <Grid lg={4}>
            <Bubble data={datas} height={500} />
            </Grid>
            <Grid lg={4}>
            <PolarArea data={datas} height={100} />
            </Grid>
            <Grid lg={4}>
            <Radar data={datas} height={100} />
            </Grid>
            </Grid>
        </>
    )
}

export default Dashboard;