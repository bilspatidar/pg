import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Span } from "app/components/Typography";
import { ValidatorForm } from "react-material-ui-form-validator";
import { TextField, Grid, Select, MenuItem, Icon, FormControl, InputLabel, } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { BASE_URL } from '../../config';
import CustomSnackbar from '../CustomSnackbar';
import Loading from "../MatxLoading";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  bgcolor: 'background.paper',
  border: '1px solid #fff',
  boxShadow: 24,
  p: 4,
};

function CurrencyEdit({ handleClose, open, editedItem }) {
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('accessToken');
  const [apiResponse, setApiResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState([]);
  const [formData, setFormData] = useState({
    currency_name: '',
    currency_code: '',
    status: '',
  });
  // const refreshTable = () => {
  //   //setTableData(tableData);
  //   tableData();
  // }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = `${BASE_URL}/api/currency/currency/update`;
    let em = [];


    try {
      const data = {
        id: formData.id,
        currency_name: formData.currency_name,
        currency_code: formData.currency_code,
        status: formData.status,

      };

      const res = await fetch(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
        headers: new Headers({
          // "ngrok-skip-browser-warning": true,
          "token": token,
          'Content-Type': 'application/json'
        }),
      });


      if (res.status === 200) {
        const responseData = await res.json();
        ///toast.success(responseData.message);
        console.log(responseData.message)
        //setTableData(tableData);
        let obj = { bgType: "success", message: `${responseData.message}` };
        em.push(obj);
      } else {


        const errorData = await res.json();
        //toast(errorData.message);
        let obj = { bgType: "error", message: `${errorData.message}` };

        em.push(obj);
        // bgtype = 'error';
        if (errorData.error) {
          for (const key in errorData.error) {
            if (errorData.error.hasOwnProperty(key)) {
              const errorMessages = errorData.error[key].join(', '); // Combine multiple error messages if any
              //toast.error(`${key}: ${errorMessages}`);
              let obj = { bgType: "error", message: `${key}: ${errorMessages}` };
              // em.push(`${key}: ${errorMessages}`);
              em.push(obj);


            }
          }
          console.log(em)

          console.log(errorMsg)

        }

      }
    } catch (error) {
      console.log(error)
      let obj = { bgType: "error", message: `${error.message}` };

      em.push(obj);

    }
    setErrorMsg(em)
    setLoading(false);
  };

  useEffect(() => {
    console.log(editedItem)
    setFormData({
      id: editedItem.id,
      currency_name: editedItem.currency_name,
      currency_code: editedItem.currency_code,
      status: editedItem.status,



    })
  }, [editedItem])


  return (
    <>
      {
        errorMsg && errorMsg.length > 0 && errorMsg.map((error, index) => (
          <div key={index}>
            <CustomSnackbar
              message={
                <ul>
                  {errorMsg.map((error, index) => (
                    <li key={index} className={index === 0 ? 'first-li-error-msg' : 'li-error-msg'}>{error.message} </li>
                  ))}
                </ul>
              }
              severity={errorMsg[0].bgType}
              autoHideDuration={4000}
              onClose={() => setErrorMsg([])}
            />
          </div>
        ))
      }

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Button
            onClick={handleClose} // Add this onClick handler to close the modal
            style={{ position: 'absolute', top: '1px', right: '0px' }}
            color="primary"
          >
            <HighlightOffOutlinedIcon fontSize='large' />
          </Button>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit Form
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <ValidatorForm className="custom-form-control" onSubmit={handleSubmit} onError={() => null}>
              <TextField
                fullWidth
                type="hidden"
                name="id"
                label="Id"
                size="small"
                onChange={handleChange}
                value={formData.id}
                style={{ display: 'none' }}
              />
              <Grid container spacing={3}>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>

                  <TextField fullWidth
                    type="text"
                    name="currency_name"
                    label="Currency Name"
                    size="small"
                    onChange={handleChange}
                    value={formData.currency_name}
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField fullWidth
                    type="text"
                    name="currency_code"
                    label="Currency Code"
                    size="small"
                    value={formData.currency_code}
                    onChange={handleChange}
                    validators={["required"]}
                    errorMessages={["This field is required"]}
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <FormControl size="small" fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      name="status"
                      onChange={handleChange}
                      value={formData.status}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Deactive">Deactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Button disabled={loading}
                style={{ marginTop: 30 }}
                color="primary"
                variant="contained"
                type="submit"
                size="small"
              >
                <Icon>send</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
              </Button>
            </ValidatorForm>
          </Typography>
        </Box>
      </Modal>
    </>
  );
}

export default CurrencyEdit;
