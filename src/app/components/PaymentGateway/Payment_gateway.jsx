import React, { useRef, JWTAuthContext } from 'react'
import { BASE_URL } from '../../config';
import { Stack } from '@mui/material';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import ModeTwoToneIcon from '@mui/icons-material/ModeTwoTone';
import Dialog from "../Dialog";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Style.css';
import CustomSnackbar from '../CustomSnackbar';
import Loading from "../MatxLoading";
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';

import useAuth from 'app/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  InputLabel,
  MenuItem,
  Grid,
  Icon,
  TablePagination,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  FormControl,
  Autocomplete,
  Select,

} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";

import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import PaymentgatewayEdit from './PaymentgatewayEdit';

const TextField = styled(TextValidator)(() => ({
  width: "100%",

}));
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const Small = styled('small')(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  overflow: 'hidden',
  background: bgcolor,
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}));
const StyledTable = styled(Table)`
  width: 100%;
  margin-bottom: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;

function Payment_gateway() {
  const token = localStorage.getItem('accessToken');
  const [apiResponse, setApiResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState([]);
  const { logout } = useAuth();

  const history = useNavigate();

  const handlePrint = () => {
    if (tableRef.current) {
      const printWindow = window.open('', '', 'width=1000,height=1000');
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
            <style>
              /* Define your CSS styles here */
              table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 20px;
              }
              th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #f2f2f2;
              }
              body {
                overflow-y: scroll; /* Enable vertical scrolling */
              }
            </style>
          </head>
          <body>
            <div style="overflow-x:auto;">
              <table>${tableRef.current.innerHTML}</table>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }
  };
  const [open, setOpen] = React.useState(false);
  const [editedItem, setEditedItem] = React.useState("");
  const [deletedItemId, setDeletedItemId] = React.useState();

  const tableRef = useRef(null);


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
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currencys, setCurrencys] = useState([]);
  const [cardss, setcardss] = useState([
   
  ]);


  const fetchCurrency = async () => {
    const endpoint = `${BASE_URL}/api/currency/currency_list`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: new Headers({
          // "ngrok-skip-browser-warning": true,
          "token": token
        }),
      })

      const { data } = await response.json();
      setCurrencys(data);
    } catch (error) {
      console.log(error)
    }
  }
  const fetchCard = async () => {
    const endpoint = `${BASE_URL}/api/card/card_list`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: new Headers({
          // "ngrok-skip-browser-warning": true,
          "token": token
        }),
      })

      const { data } = await response.json();
      setcardss(data);
    } catch (error) {
      console.log(error)
    }
  }


  //Get Data from API 

  async function geTableCellata(name, status,from_date,to_date,currency,card) {
    const endpoint = `${BASE_URL}/api/Paymentgateway/payment_gateway_list`;
  
    try {
      const body = {};
      if (name) {
        body.name = name;
      }
      if (status) {
        body.status = status;
      }
      if (from_date) {
        body.from_date = from_date;
      }
      if (to_date) {
        body.to_date = to_date;
      }
      if (currency) {
        body.currency = currency;
      }
      if (card) {
        body.card = card;
      }
      const res = await fetch(endpoint, {
        method: "POST",
        headers: new Headers({
          "token": token,
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(body)
      });
  
      const data = await res.json();
      if (res.status !== 401) {
        setTableData(data.data);
      }
      if (res.status === 401 && data.message === "Token Time Expire.") {
        await logout();
        history("session/signin");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  }

  const [filterFormData, setFilterFormData] = useState({
    name: '',
    status: '',
    from_date: '', 
    to_date: '',
    currency:'',
    card: '',
   
  });
  const handleFilterFormChange = (e) => {
    const { name, value } = e.target;
    setFilterFormData({
      ...filterFormData,
      [name]: value,
    });
  };
 

  const handleFilterFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, status, from_date, to_date, currency, card } = filterFormData;
    await geTableCellata(name, status, from_date, to_date, currency, card);
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
    const endpoint = `${BASE_URL}/api/Paymentgateway/payment_gateway/add`;
    let em = [];

    try {
      const data = {
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
        blocked_country:formData .blocked_country
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
        geTableCellata();
        ///toast.success(responseData.message);
        console.log(responseData.message)
        setFormData(
          {
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
          }
        )
        let obj = { bgType: "success", message: `${responseData.message}` };

        em.push(obj);
      } else {


        const errorData = await res.json();
        //toast(errorData.message);
        let obj = { bgType: "error", message: `${errorData.message}` };

        em.push(obj);
        // bgtype = 'error';
        if (errorData.errors) {
          for (const key in errorData.errors) {
            if (errorData.errors.hasOwnProperty(key)) {
              let errorMessage = errorData.errors[key];

              // Check if error message is an array
              if (Array.isArray(errorMessage)) {
                errorMessage = errorMessage.join(', '); // Combine multiple error messages if it's an array
              }
              let obj = { bgType: "error", message: `${errorMessage}` };
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
    geTableCellata();
    fetchCurrency();
    fetchCard();
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const handleOpen = (item) => {
    setEditedItem(item)
    setOpen(true);
  }

  const handleClose = () => {
    geTableCellata();
    setOpen(false);
  }


  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

  const handleDeleteModalOpen = (id) => {
    setDeletedItemId(id)
    setOpenDeleteModal(true);
  };

  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false);

  };

  const deleteItem = async () => {
    setLoading(true);
    const endpoint = `${BASE_URL}/api/Paymentgateway/payment_gateway/${deletedItemId}`;
    let em = [];
    try {
      const data = {
        id: deletedItemId,
      };

      const res = await fetch(endpoint, {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: new Headers({
          // "ngrok-skip-browser-warning": true,
          "token": token,
          'Content-Type': 'application/json'
        }),
      });
      console.log(res)
      const data_res = await res.json();
      if (data_res.status == true) {
        geTableCellata();
        let obj = { bgType: "success", message: `${data_res.message}` };
        em.push(obj);
      }
      else {
        let obj = { bgType: "error", message: `${data_res.message}` };
        em.push(obj);
      }
    } catch (error) {
      //let obj = { bgType: "error", message: `${res.message}` };
      console.log(error)

    }

    setErrorMsg(em)
    setLoading(false);
    handleDeleteModalClose()
  }


  return (
    <>

      <div className='componentLoader'>  {loading ? (<Loading />) : ("")} </div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: 'Payment Gateway', path: '/PaymentGateway/Payment_gateway ' },
          { name: 'Form' }]} />
        </Box>
        {
          errorMsg && errorMsg?.length > 0 && errorMsg.map((error, index) => (
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


        <Stack spacing={3}>
          <SimpleCard title="Payment Gateway Form">


            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
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
              
                  <Autocomplete
                    multiple
                    options={currencys}
                    getOptionLabel={(currency) => `${currency.currency_name}-${currency.currency_code}`}
                    value={currencys?.filter((currency) => formData?.currency.includes(currency.currency_code))}
                    onChange={(event, newValues) => {
                    handleChange({
                    target: {
                    name: 'currency',
                    value: newValues.map((newValue) => newValue.currency_code),
                 },
                });
                }}
                    renderInput={(params) => (
                <TextField
                   {...params}
                   label="Currency"
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
                    multiple
                    options={cardss}
                    getOptionLabel={(card) => `${card.name}`}
                    value={cardss?.filter((card) => formData?.cards.includes(card.name))}
                    onChange={(event, newValues) => {
                    handleChange({
                    target: {
                    name: 'cards',
                    value: newValues.map((newValue) => newValue.name),
                 },
                });
                }}
                    renderInput={(params) => (
                <TextField
                   {...params}
                   label="Cards"
                   fullWidth
                   size="small"
                />
                 )}
                />
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



              </Grid>

              <Button disabled={loading} style={{ marginTop: 30 }} color="primary" variant="contained"
                type="submit">
                <Icon>send</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
              </Button>
            </ValidatorForm>

          </SimpleCard>
        </Stack>
      </Container>
      <Container>
        <SimpleCard title="Payment Gateway List">
        <ValidatorForm className="filterForm" onSubmit={handleFilterFormSubmit} data-form-identifier="filter_form">
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
              <TextField
    id="filterOne"
    label="Name"
    variant="outlined"
    size="small"
    fullWidth
    name="name"
    value={filterFormData.name}
    onChange={handleFilterFormChange}
  />
              </Grid>
            
                <Grid item xs={12} md={3}>
                <FormControl size="small" fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                     id="filterTwo"
                      name="status"
                      onChange={handleFilterFormChange}
                      value={filterFormData.status}
                    >
                      <MenuItem value="Active">Active</MenuItem>
                      <MenuItem value="Deactive">Deactive</MenuItem>
                    </Select>
                  </FormControl>

                  </Grid>

                
             <Grid item xs={12} md={3}>
  <Autocomplete
    options={currencys}
    getOptionLabel={(currency) => currency.currency_name}
    value={currencys.find((currency) => currency.id === filterFormData.currency) || null}
    onChange={(event, newValue) => {
      handleFilterFormChange({
        target: {
          name: 'currency',
          value: newValue ? newValue.currency_code : '', // assuming id is a string or number
        },
      });
    }}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Currency Name"
      
        fullWidth
        size="small"
      />
    )}
  />
</Grid>
           

             <Grid item xs={12} md={3}>
                  <Autocomplete
                    options={cardss}
                    getOptionLabel={(card) => card.name}
                    value={cardss.find((card) => card.id === filterFormData.card) || null}
                    onChange={(event, newValue) => {
                      handleFilterFormChange({
                    target: {
                    name: 'card',
                    value: newValue ? newValue.name : '', // assuming id is a string or number
                 },
                   });
                      }}
                    renderInput={(params) => (
                   <TextField
                      {...params}
                      label="Card Name"
                    
                     fullWidth
                     size="small"
                            />
                 )}
                   />
            </Grid>




                  <Grid item xs={12} md={3}>
              <TextField
    id="filterThree"
    type="date"
    label="From Date"
    variant="outlined"
    size="small"
    fullWidth
    name="from_date"
    value={filterFormData.from_date}
    onChange={handleFilterFormChange}
  />
              </Grid>
              <Grid item xs={12} md={3}>
              <TextField
    id="filterFour"
    type="date"
    label="To Date"
    variant="outlined"
    size="small"
    fullWidth
    name="to_date"
    value={filterFormData.to_date}
    onChange={handleFilterFormChange}
  />
              </Grid>
            
              <Grid item xs={12} md={2}>
                <Button color="primary" variant="contained" type="submit">
                  <Icon>send</Icon>
                  <Span sx={{ pl: 1, textTransform: "capitalize" }}>Search</Span>
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm >

          <Box width="100%" overflow="auto" mt={2}>
            <Button

              variant="contained"
              // color="primary"
              onClick={() => handlePrint()}
              style={{
                backgroundColor: '#2A0604', // Set the desired darker color
                color: 'white',
                height: 30,
                marginBottom: 10,
              }}
            >
              Print

            </Button>

            <StyledTable id="dataTable" ref={tableRef} sx={{ minWidth: 600 }} aria-label="caption table" >

              <TableHead>

                <TableRow>
                  <TableCell align="left">Sr no.</TableCell>
                  <TableCell align="center"> Name</TableCell>
                  <TableCell align="center">Daily Limit  </TableCell>
                  <TableCell align="center">Min Limit</TableCell>
                  <TableCell align="center">Max Limit </TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="right">Option</TableCell>

                </TableRow>
              </TableHead>

              <TableBody>
                {tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="center">{item.name}</TableCell>
                      <TableCell align="center">{item.daily_limit}</TableCell>
                      <TableCell align="center">{item.minLimit}</TableCell>
                      <TableCell align="center">{item.maxLimit}</TableCell>
                      <TableCell align="center">
                        <Small className={item.status === 'Active' ? 'green_status' : 'red_status'
                        }>
                          {item.status}
                        </Small>
                      </TableCell>

                      <TableCell align="right">


                        <ModeTwoToneIcon fontSize="small" style={{ color: '#173853' }}
                          onClick={() => handleOpen(item)}>
                          <Icon>edit</Icon>
                        </ModeTwoToneIcon>
                        <PaymentgatewayEdit editedItem={editedItem} handleClose={handleClose} open={open} />
                        <DeleteOutlineTwoToneIcon onClick={() => handleDeleteModalOpen(item.id)} fontSize="small" style={{ color: '#ff0000' }}>
                          <Icon>delete</Icon>
                        </DeleteOutlineTwoToneIcon>
                        <Dialog actionButtonhandler={deleteItem} open={openDeleteModal} handleClose={handleDeleteModalClose} />
                      </TableCell>

                    </TableRow>
                  ))}
              </TableBody>

            </StyledTable>

            <TablePagination
              sx={{ px: 2 }}
              page={page}
              component="div"
              rowsPerPage={rowsPerPage}
              count={tableData?.length}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 15, 25, 50]}
              onRowsPerPageChange={handleChangeRowsPerPage}
              nextIconButtonProps={{ "aria-label": "Next Page" }}
              backIconButtonProps={{ "aria-label": "Previous Page" }}
            />
          </Box>
        </SimpleCard>
      </Container>

      <ToastContainer
        style={{ minWidth: "360px", width: "auto", maxWidth: "500px" }}
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        color="red"
      />
    </>
  )
}

export default Payment_gateway;