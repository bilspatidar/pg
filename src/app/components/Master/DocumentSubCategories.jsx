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
  Autocomplete,
  FormControl,
  Select,


} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";

import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import DocumentSubCategoriesEdit from './DocumentSubCategoriesEdit';

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

function DocumentSubCategories() {
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

  const [documentcategories, setdocumentcategories] = useState([]);
  const [formData, setFormData] = useState({

    document_category_id: '',
    name: '',

    // status: '',
  });
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);



  const fetchCategories = async () => {
    const endpoint = `${BASE_URL}/api/document_category/document_category_list`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: new Headers({
          //   "ngrok-skip-browser-warning": true,
          "token": token
        }),
      })

      const { data } = await response.json();
      setdocumentcategories(data);
    } catch (error) {
      console.log(error)
    }
  }

  //Get Data from API 
  async function geTableCellata(name, status,document_category_id) {
    const endpoint = `${BASE_URL}/api/document_subcategory/document_subcategory_list`;
  
    try {
      const body = {};
      if (name) {
        body.name = name;
      }
      if (status) {
        body.status = status;
      }
      if (document_category_id) {
        body.document_category_id = document_category_id;
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
    document_category_id:'',
    // Add other fields related to the Filter Form here
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
    const { name,status,document_category_id } = filterFormData;
    await geTableCellata(name,status,document_category_id);
  };


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
    const endpoint = `${BASE_URL}/api/document_subcategory/document_subcategory/add`;
    let em = [];


    try {
      const data = {
        document_category_id: formData.document_category_id,
        name: formData.name,

        // status:formData.status,

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
            document_category_id: '',
            name: '',
            // status: '',

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
    fetchCategories();
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
    const endpoint = `${BASE_URL}/api/document_subcategory/document_subcategory/${deletedItemId}`;
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
          <Breadcrumb routeSegments={[{ name: 'Document Sub Categories', path: '/master/DocumentSubCategories ' },
          { name: 'Form' }]} />
        </Box>
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


        <Stack spacing={3}>
          <SimpleCard title="Document Sub Categories Form">


            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
              <Grid container spacing={3}>

                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField
                    type="text"
                    name="name"
                    label=" Name"
                    size="small"
                    onChange={handleChange}
                    value={formData.name}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>


                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <Autocomplete
                    options={documentcategories}
                    getOptionLabel={(document_category) => document_category.name}
                    value={documentcategories.find((document_category) => document_category.id === formData.document_category_id) || null}
                    onChange={(event, newValue) => {
                      handleChange({
                        target: {
                          name: 'document_category_id',
                          value: newValue ? newValue.id : '', // assuming id is a string or number
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Document Category Name"
                        required
                        fullWidth
                        size="small"
                      />
                    )}
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
        <SimpleCard title="Document Sub Categories Table">
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
                  <Autocomplete
                    options={documentcategories}
                    getOptionLabel={(document_category) => document_category.name}
                    value={documentcategories.find((document_category) => document_category.id === filterFormData.document_category_id) || null}
                    onChange={(event, newValue) => {
                      handleFilterFormChange({
                        target: {
                          name: 'document_category_id',
                          value: newValue ? newValue.id : '', // assuming id is a string or number
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Document Category Name"
                       
                        fullWidth
                        size="small"
                      />
                    )}
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
                  <TableCell align="center">Document Category Name</TableCell>
                  <TableCell align="center"> Name  </TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="right">Option</TableCell>

                </TableRow>
              </TableHead>

              <TableBody>
                {tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item, index) => (
                    <TableRow key={index}>
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="center">{item.category_name}</TableCell>
                      <TableCell align="center">{item.name}</TableCell>

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
                        <DocumentSubCategoriesEdit editedItem={editedItem} handleClose={handleClose} open={open} />
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

export default DocumentSubCategories;