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
// import PaymentgatewayEdit from './PaymentgatewayEdit';

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

function Transactionlist() {
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


  const [merchants, setMerchants] = useState([]);
  const [payments, setpayments] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

 
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

      const { data } = await response.json();
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

      const { data } = await response.json();
      setpayments(data);
    } catch (error) {
      console.log(error)
    }
  }

  //Get Data from API 

  async function geTableCellata( status,transaction_datetime,merchant_id,payment_id) {
    const endpoint = `${BASE_URL}/api/transaction/transaction_list`;
  
    try {
      const body = {};
   
      if (status) {
        body.status = status;
      }
      if (transaction_datetime) {
        body.transaction_datetime = transaction_datetime;
      }
    
      if (merchant_id) {
        body.merchant_id = merchant_id;
      }
      if (payment_id) {
        body.payment_id = payment_id;
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
   
    status: '',
    transaction_datetime: '', 
    merchant_id: '',
    payment_id:'',
  
   
  });
  
  const handleFilterFormChange = (e) => {
    const { name, value } = e.target; // Extract 'name' from e.target
    setFilterFormData({
      ...filterFormData,
      [name]: value,
    });
  };
  const handleFilterFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const {  status, transaction_datetime, merchant_id, payment_id } = filterFormData;
    await geTableCellata( status, transaction_datetime, merchant_id, payment_id);
  };

 

  useEffect(() => {
    geTableCellata();
    fetchCategories();
    fetchPayments();
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
        <SimpleCard title="Transaction List ">
        <ValidatorForm className="filterForm" onSubmit={handleFilterFormSubmit} data-form-identifier="filter_form">
            <Grid container spacing={2}>
   
             
            
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
  options={payments}
  getOptionLabel={(payment) => payment.name}
  value={
    payments.find((payment) => payment.id === filterFormData.payment_id) ||
    null
  }
  onChange={(event, newValue) => {
    handleFilterFormChange({
      target: {
        name: 'payment_id',
        value: newValue ? newValue.id : '', // assuming id is a string or number
      },
    });
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Payment Name"

      fullWidth
      size="small"
    />
  )}
/>
</Grid>
<Grid item xs={12} md={3}>

<Autocomplete
  options={merchants}
  getOptionLabel={(merchant) => merchant.name}
  value={
    merchants.find((merchant) => merchant.users_id === filterFormData.merchant_id) ||
    null
  }
  onChange={(event, newValue) => {
    handleFilterFormChange({
      target: {
        name: 'merchant_id',
        value: newValue ? newValue.users_id : '', // assuming id is a string or number
      },
    });
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Merchant Name"

      fullWidth
      size="small"
    />
  )}
/>
</Grid>


             
              <Grid item xs={12} md={3}>
              <TextField
    id="filterFour"
    type="date"
    label="Transaction Datetime"
    variant="outlined"
    size="small"
    fullWidth
    name="transaction_datetime"
    value={filterFormData.transaction_datetime}
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

            <StyledTable id="dataTable" ref={tableRef} sx={{ minWidth: 6000 }} 
            aria-label="caption table" >

              <TableHead>

                <TableRow>
                  <TableCell align="left">Sr no.</TableCell>
                  <TableCell align="center">Token</TableCell>
                  <TableCell align="center">Payment Transaction Id </TableCell>
                  <TableCell align="center">Merchant Transaction Id</TableCell>
                  <TableCell align="center">Amount </TableCell>
                  <TableCell align="center">Fee</TableCell>
                  <TableCell align="center">Merchant Fee </TableCell>
                  <TableCell align="center">Merchant Id</TableCell>
                  <TableCell align="center">Mid </TableCell>
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Last Name </TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Phone </TableCell>
                  <TableCell align="center">Currency</TableCell>
                  <TableCell align="center">Address </TableCell>
                  <TableCell align="center">City</TableCell>
                  <TableCell align="center">State </TableCell>
                  <TableCell align="center">Country</TableCell>
                  <TableCell align="center">Callbackurl </TableCell>
                  <TableCell align="center">RequestMode</TableCell>
                  <TableCell align="center">Cardnumber </TableCell>
                  <TableCell align="center">Cardholdername</TableCell>
                  <TableCell align="center">Expiry month</TableCell>
                  <TableCell align="center">Expiry year</TableCell>
                  <TableCell align="center">Cardcvv</TableCell>
                  <TableCell align="center">CardType</TableCell>
                  <TableCell align="center">Payment Id</TableCell>
                  <TableCell align="center">Initiated Datetime</TableCell>
                  <TableCell align="center">Redirect Datetime</TableCell>
                  <TableCell align="center">Callback Datetime</TableCell>
                  <TableCell align="center">Webhook Datetime</TableCell>
                  <TableCell align="center">Transaction Datetime</TableCell>
                  <TableCell align="center">Message</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="right">Option</TableCell>

                </TableRow>
              </TableHead>

              <TableBody>
                {tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="center">{item.token}</TableCell>
                      <TableCell align="center">{item.payment_transaction_id}</TableCell>
                      <TableCell align="center">{item.merchant_transaction_id}</TableCell>
                      <TableCell align="center">{item.amount}</TableCell>
                      <TableCell align="center">{item.fee}</TableCell>
                      <TableCell align="center">{item.merchant_fee}</TableCell>
                      <TableCell align="center">{item.merchant_id}</TableCell>
                      <TableCell align="center">{item.mid}</TableCell>
                    
                      <TableCell align="center">{item.firstname}</TableCell>
                      <TableCell align="center">{item.lastname}</TableCell>
                      <TableCell align="center">{item.email}</TableCell>
                      <TableCell align="center">{item.phone}</TableCell>
                      <TableCell align="center">{item.currency}</TableCell>
                      <TableCell align="center">{item.address}</TableCell>
                      <TableCell align="center">{item.city}</TableCell>
                      <TableCell align="center">{item.state}</TableCell>
                      <TableCell align="center">{item.country}</TableCell>
                      <TableCell align="center">{item.callbackurl}</TableCell>
                      <TableCell align="center">{item.requestMode}</TableCell>
                      <TableCell align="center">{item.cardnumber}</TableCell>
                      <TableCell align="center">{item.cardholdername}</TableCell>
                      <TableCell align="center">{item.expirymonth}</TableCell>
                      <TableCell align="center">{item.expiryyear}</TableCell>
                      <TableCell align="center">{item.cardcvv}</TableCell>
                      <TableCell align="center">{item.cardType}</TableCell>
                      <TableCell align="center">{item.payment_id}</TableCell>
                      <TableCell align="center">{item.initiated_datetime}</TableCell>
                      <TableCell align="center">{item.redirect_datetime}</TableCell>
                      <TableCell align="center">{item.callback_datetime}</TableCell>
                      <TableCell align="center">{item.webhook_datetime}</TableCell>
                      <TableCell align="center">{item.transaction_datetime}</TableCell>
                      <TableCell align="center">{item.message}</TableCell>
                      
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
                        {/* <PaymentgatewayEdit editedItem={editedItem} handleClose={handleClose} open={open} /> */}
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
              sx={{ px: 2, minWidth: 6000 }}
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

export default Transactionlist;