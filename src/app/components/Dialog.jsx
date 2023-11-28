import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import {
  Icon,
} from "@mui/material";
export default function AlertDialog({actionButtonhandler, open, handleClose }) {
  return (
    <>
<Dialog
  open={open}
  onClose={handleClose}
  aria-labelledby="alert-dialog-title"
  aria-describedby="alert-dialog-description"
>
  <DialogContent fullWidth>
  <DialogContentText id="alert-dialog-description" style={{ fontWeight: 'bold' }}>
  Are you sure you want to delete this item?
</DialogContentText>
  </DialogContent>
  <DialogActions>
  <Button onClick={handleClose}  color="primary"style={{ color: '#173853' }}>
    Cancel
  </Button>
  <Button onClick={actionButtonhandler} color="primary" style={{ color: 'red' }} autoFocus>
    Delete
  </Button>
</DialogActions>
</Dialog>

    </>
  );
}