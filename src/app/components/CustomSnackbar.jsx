import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CustomSnackbar = ({ message, severity, autoHideDuration, onClose }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, [message, severity]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Snackbar anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }} open={open} autoHideDuration={autoHideDuration} onClose={handleClose}>
      <div>
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
      </div> 
    </Snackbar>
  );
};

export default CustomSnackbar;
