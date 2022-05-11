import {Table, TableHead, TableRow,TableBody,TableCell,Grid } from "@mui/material";
import React from "react";

function Page(){
return(
    <>
    
        <Grid container>
        <Table container>
        <Table>
        <TableHead>
            <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Name</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                <TableCell>
            Ashmeet
                </TableCell>
                <TableCell>
            Ashmeet
                </TableCell>
                <TableCell>
            Ashmeet
                </TableCell>
                <TableCell>
            Ashmeet
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
        </Table>
        </Grid>
    </>
)
}
export default Page;