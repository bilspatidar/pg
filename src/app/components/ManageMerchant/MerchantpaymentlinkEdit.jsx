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
import Autocomplete from '@mui/material/Autocomplete';

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

function MerchantpaymentlinkEdit({ handleClose, open, editedItem }) {
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('accessToken');
  const [apiResponse, setApiResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState([]);
  const [currencys, setCurrencys] = useState([]);
  const [cardss, setcardss] = useState([]);
  const [merchants, setMerchants] = useState([]);
  const [payments, setpayments] = useState([]);
  const [formData, setFormData] = useState({
  
    mid: '',
    merchant_id: '',
    payment_id: '',
    currency: '',
    cards: '',
    serial_no: '',
    status:'',
  });
  // const refreshTable = () => {
  //   //setTableData(tableData);
  //   tableData();
  // }
  const fetchCurrency = async () => {
    const endpoint = `${BASE_URL}/api/currency/currency_list`;
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: new Headers({
          "token": token
        }),
      });
  
      const { data } = await response.json();
      setCurrencys(data); // Update the state variable with fetched data
      return data; // Return the data
    } catch (error) {
      console.log(error);
      return []; // Return empty array if error occurs
    }
  };
  const fetchCard = async () => {
    const endpoint = `${BASE_URL}/api/card/card_list`;
  
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: new Headers({
          "token": token
        }),
      });
  
      const { data } = await response.json();
      setcardss(data); // Update the state variable with fetched data
      return data; // Return the data
    } catch (error) {
      console.log(error);
      return []; // Return empty array if error occurs
    }
  };

  const fetchCategories = async () => {
    const endpoint = `${BASE_URL}/api/user/merchant_list`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: new Headers({
        //   "ngrok-skip-browser-warning": true,
          "token": token
        }),  
      })

      const {data} = await response.json();
      setMerchants(data);
    } catch (error) {
      console.log(error)
    }
  }
  const fetchPayments = async () => {
    const endpoint = `${BASE_URL}/api/Paymentgateway/payment_gateway_list`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: new Headers({
        //   "ngrok-skip-browser-warning": true,
          "token": token
        }),  
      })

      const {data} = await response.json();
      setpayments(data);
    } catch (error) {
      console.log(error)
    }
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = `${BASE_URL}/api/user/merchant_payment_link/update`;
    let em = [];


    try {
      const data = {
        id: formData.id,
        mid: formData.mid,
        merchant_id: formData.merchant_id,
        payment_id:formData.payment_id,
        currency: formData.currency,
        cards: formData.cards,
        serial_no: formData .serial_no,
       
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
      mid: editedItem.mid,
      serial_no:editedItem.serial_no,
      merchant_id: editedItem.merchant_id,
      payment_id:editedItem.payment_id,
      currency:editedItem.currency,
      cards:editedItem.cards,
       status: editedItem.status,

    })
 
  }, [editedItem]);

  useEffect(() => {
    fetchCategories();
    fetchPayments();
    fetchCurrency();
    fetchCard();
  }, []);

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
          <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
              <Grid container spacing={3}>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField fullWidth
                    type="text"
                    name="mid"
                    label="MID"
                    size="small"
                    onChange={handleChange}
                    value={formData.mid}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12} sx={{ mt: 1 }}>
                      
                       <TextField fullWidth
                    type="number"
                    name="serial_no"
                    label="Serial No"
                    size="small"
                    onChange={handleChange}
                    value={formData.serial_no}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                    </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                
              <Autocomplete
              options={merchants}
              getOptionLabel={(merchant) => merchant.name}
              value={
                merchants.find((merchant) => merchant.users_id === formData.merchant_id) ||
                null
              }
              onChange={(event, newValue) => {
                handleChange({  
                  target: {
                    name:'merchant_id',
                    value: newValue ? newValue.users_id : '', // assuming id is a string or number
                  },
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Merchant Name"
                  required  // Add required attribute to validate
                  fullWidth
                  size="small"
                />
              )}
            />
            </Grid>
            <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                
                <Autocomplete
                options={payments}
                getOptionLabel={(payment) => payment.name}
                value={
                    payments.find((payment) => payment.id === formData.payment_id) ||
                  null
                }
                onChange={(event, newValue) => {
                  handleChange({  
                    target: {
                      name:'payment_id',
                      value: newValue ? newValue.id : '', // assuming id is a string or number
                    },
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Payment Name"
                    required  // Add required attribute to validate
                    fullWidth
                    size="small"
                  />
                )}
              />
              </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <FormControl fullWidth size="small">
              
                  <Autocomplete
                          options={currencys}
                          getOptionLabel={(currency) => `${currency.currency_name}-${currency.currency_code}`}
                          value={
                            currencys.find((currency) => currency.currency_code === formData.currency) ||
                            null
                          }
                          onChange={(event, newValue) => {
                            handleChange( {
                              target: {
                                name: 'currency',
                                value: newValue ? newValue.currency_code : '', // assuming id is a string or number
                              },
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="currency Name"
                              required
                              fullWidth
                              size="small"
                            />
                          )}
                        />
                 </FormControl>
             </Grid>

               
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <FormControl fullWidth size="small">
              
                  <Autocomplete
                          options={cardss}
                          getOptionLabel={(card) => `${card.name}`}
                          value={
                            cardss.find((card) => card.name === formData.cards) ||
                            null
                          }
                          onChange={(event, newValue) => {
                            handleChange( {
                              target: {
                                name: 'cards',
                                value: newValue ? newValue.name : '', // assuming id is a string or number
                              },
                            });
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="card Name"
                              required
                              fullWidth
                              size="small"
                            />
                          )}
                        />
                 </FormControl>
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

              <Button  style={{ marginTop: 30 }} color="primary" variant="contained"
                type="submit">
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

export default MerchantpaymentlinkEdit;
