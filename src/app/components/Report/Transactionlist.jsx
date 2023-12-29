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

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& TableCell": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

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
      printWindow.document.write('<html><head><title>Print</title></head><body>');
      printWindow.document.write('<table>' + tableRef.current.innerHTML + '</table>');
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
      printWindow.close();
    }
  };
  const [open, setOpen] = React.useState(false);
  const [editedItem, setEditedItem] = React.useState("");
  const [deletedItemId, setDeletedItemId] = React.useState();

  const tableRef = useRef(null);


  const [currencys, setCurrencys] = useState([]);
  const [cardss, setcardss] = useState([
   
  ]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);

 


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

 

  useEffect(() => {
    geTableCellata();
   
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
        <SimpleCard title="Payment Gateway Table">
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

export default Transactionlist;