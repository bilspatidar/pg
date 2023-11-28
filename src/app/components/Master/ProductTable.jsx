import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function ProductTable({tableData }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1600 }} aria-label="caption table">
        
        <TableHead>
          <TableRow>
          <TableCell align="center">Sr no.</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Image Url </TableCell>
            <TableCell align="center">User Id</TableCell>
            <TableCell align="center">Category Name</TableCell>
            <TableCell align="center">Weight</TableCell>
            <TableCell align="center">Other Weight</TableCell>
            <TableCell align="center">Other Price</TableCell>
            <TableCell align="center">Makig Price </TableCell>
            <TableCell align="center">Barcode</TableCell>
            <TableCell align="center">Unit Id</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="left">Option</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {tableData
            .map((item, index) => (
              <TableRow key={index}>
            <TableCell align="left">{index + 1}</TableCell>
            <TableCell align="center">{item.name}</TableCell>
            <TableCell align="center">{item.price} </TableCell>
            <TableCell align="center">{item.description}</TableCell>
            <TableCell align="center">{item.quantity}</TableCell>
            <TableCell align="center">{item.image_url}</TableCell>
            <TableCell align="center">{item.user_id}</TableCell>
            <TableCell align="center">{item.category_id}</TableCell>
            <TableCell align="center">{item.sub_category_id} </TableCell>
            <TableCell align="center">{item.weight}</TableCell>
            <TableCell align="center">{item.other_weight}</TableCell>
            <TableCell align="center">{item.other_price}</TableCell>
            <TableCell align="center">{item.making_charge}</TableCell>
            <TableCell align="center">{item.barcode}</TableCell>
            <TableCell align="center">{item.unit_id}</TableCell>
            <TableCell align="right">{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
