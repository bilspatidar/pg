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

function PaymentgatewayEdit({ handleClose, open, editedItem }) {
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('accessToken');
  const [apiResponse, setApiResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState([]);
  const [currencys, setCurrencys] = useState([]);
  const [cardss, setcardss] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    short_name: '',
    live_api: '',
    live_secret: '',
    test_api: '',
    test_secret: '',
    live_url: '',
    test_url: '',
    daily_limit: '',
    minLimit: '',
    maxLimit: '',
    methodName: '',
    currency: [],
    cards: [],
    blocked_country:'',
  });
  // const refreshTable = () => {
  //   //setTableData(tableData);
  //   tableData();
  // }
  const fetchCurrency = async () => {
    const endpoint = `${BASE_URL}/api/currency/currency`;
  
    try {
      const response = await fetch(endpoint, {
        method: "GET",
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
    const endpoint = `${BASE_URL}/api/card/card`;
  
    try {
      const response = await fetch(endpoint, {
        method: "GET",
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "currency" || name === "cards") {
      setFormData({
        ...formData,
        [name]: typeof value === 'string' ? value.split(',') : value,
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = `${BASE_URL}/api/Paymentgateway/payment_gateway/update`;
    let em = [];


    try {
      const data = {
        id: formData.id,
        name: formData.name,
        short_name: formData.short_name,
        live_api: formData.live_api,
        live_secret: formData.live_secret,
        test_secret: formData.test_secret,
        test_api: formData.test_api,
        live_url: formData.live_url,
        test_url: formData.test_url,
        daily_limit: formData.daily_limit,
        minLimit: formData.minLimit,
        maxLimit: formData.maxLimit,
        methodName: formData.methodName,
        currency: formData.currency,
        cards: formData .cards,
        blocked_country:formData .blocked_country,
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
   
    let cardss = editedItem.cards;
    let creditCardArray = cardss?.split(',');

    
    let currency = editedItem.currency;
    let CurrencyArray = currency?.split(',');
    console.log(CurrencyArray)
   
    setFormData({
      id: editedItem.id,
    name: editedItem.name,
        short_name: editedItem.short_name,
        live_api: editedItem.live_api,
        live_secret: editedItem.live_secret,
        test_secret: editedItem.test_secret,
        test_api: editedItem.test_api,
        live_url: editedItem.live_url,
        test_url: editedItem.test_url,
        daily_limit: editedItem.daily_limit,
        minLimit: editedItem.minLimit,
        maxLimit: editedItem.maxLimit,
        methodName: editedItem.methodName,
        currency: CurrencyArray,
        currency: CurrencyArray || [], 
        cards: creditCardArray || [], 
        blocked_country:editedItem .blocked_country,
       status: editedItem.status,

    })
 
  }, [editedItem]);

  useEffect(() => {
   
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
                  <TextField
                    type="text"
                    name="name"
                    label="Name"
                    size="small"
                    onChange={handleChange}
                    value={formData.name}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField
                    type="text"
                    name="short_name"
                    label="short Name"
                    size="small"
                    onChange={handleChange}
                    value={formData.short_name}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField
                    type="text"
                    name="live_api"
                    label="Live Api"
                    size="small"
                    onChange={handleChange}
                    value={formData.live_api}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField
                    type="text"
                    name="live_secret"
                    label="Live Secret"
                    size="small"
                    onChange={handleChange}
                    value={formData.live_secret}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField
                    type="text"
                    name="test_api"
                    label="Test Api"
                    size="small"
                    onChange={handleChange}
                    value={formData.test_api}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField
                    type="text"
                    name="test_secret"
                    label="Test_Secret"
                    size="small"
                    onChange={handleChange}
                    value={formData.test_secret}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField
                    type="text"
                    name="live_url"
                    label="Live Url"
                    size="small"
                    onChange={handleChange}
                    value={formData.live_url}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField
                    type="text"
                    name="test_url"
                    label="Test Url"
                    size="small"
                    onChange={handleChange}
                    value={formData.test_url}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField
                    type="number"
                    name="daily_limit"
                    label="Daily Limit"
                    size="small"
                    onChange={handleChange}
                    value={formData.daily_limit}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField
                    type="number"
                    name="minLimit"
                    label="Min Limit"
                    size="small"
                    onChange={handleChange}
                    value={formData.minLimit}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField
                    type="number"
                    name="maxLimit"
                    label="Max Limit"
                    size="small"
                    onChange={handleChange}
                    value={formData.maxLimit}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField
                    type="text"
                    name="methodName"
                    label="Method Name"
                    size="small"
                    onChange={handleChange}
                    value={formData.methodName}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                <FormControl fullWidth size="small">
  <InputLabel>Currency</InputLabel>
  <Select
    name="currency"
    onChange={handleChange}
    value={formData.currency} // Make sure formData.currency is an array
    multiple // Enable multiple selections
  >
    {currencys.map((currency) => (
      <MenuItem key={currency.id} value={currency.currency_code}>
        {currency.currency_name}-{currency.currency_code}
      </MenuItem>
    ))}
  </Select>
</FormControl>
</Grid>

<Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
  <FormControl fullWidth size="small">
    <InputLabel>Cards</InputLabel>
    <Select
      name="cards"
      onChange={handleChange}
      value={formData.cards} // Ensure the value corresponds to formData.cards
      multiple
    >
      {cardss.map((card) => (
        <MenuItem key={card.id} value={card.name}>
          {card.name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>


                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField
                    type="text"
                    name="blocked_country"
                    label="Blocked Country"
                    size="small"
                    onChange={handleChange}
                    value={formData.blocked_country}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
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
              <Button 
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

export default PaymentgatewayEdit;
