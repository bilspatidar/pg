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
import MerchantEdit from './MerchantEdit';

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

function Merchant() {
  const token = localStorage.getItem('accessToken');
  const [apiResponse, setApiResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState([]);


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

  const { logout } = useAuth();

  const history = useNavigate();
  const [categories, setCategories] = useState([]);
  const [Countries, setCountries] = useState([]);

  const [cities, setcities] = useState([]);
  const [businesstypes, setBusinesstypes] = useState([]);

  const [subcategories, setsubcategories] = useState([]);
  const [States, setState] = useState([]);




  const [formData, setFormData] = useState({

    name: '',
    email: '',
    mobile: '',
    password: '',
    confirm_password: '',
    company_name: '',
    postal_code: '',
    country_id: '',
    state_id: '',
    city_id: '',
    street_address: '',
    street_address2: '',
    business_type_id: '',
    business_category_id: '',
    business_subcategory_id: '',
    skypeID: '',
    websiteURL: '',
    business_registered: '',



  });
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCity = async () => {
    const endpoint = `${BASE_URL}/api/city/parent_city/${formData.state_id}`;

    try {
      const response = await fetch(endpoint, {
        method: "get",
        headers: new Headers({
          //   "ngrok-skip-browser-warning": true,
          "token": token
        }),
      })

      const { data } = await response.json();
      setcities(data);
    } catch (error) {
      console.log(error)
    }
  }
  const fetchState = async () => {
    console.log(formData.country_id)
    const endpoint = `${BASE_URL}/api/state/parent_state/${formData.country_id}`;

    try {
      const response = await fetch(endpoint, {
        method: "get",
        headers: new Headers({
          //   "ngrok-skip-browser-warning": true,
          "token": token
        }),
      })

      const { data } = await response.json();
      setState(data);
    } catch (error) {
      console.log(error)
    }
  }
  const fetchCountries = async () => {
    const endpoint = `${BASE_URL}/api/country/country_list`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: new Headers({
          //   "ngrok-skip-browser-warning": true,
          "token": token
        }),
      })

      const { data } = await response.json();
      setCountries(data);
    } catch (error) {
      console.log(error)
    }
  }

  const fetchBusinesstype = async () => {
    const endpoint = `${BASE_URL}/api/business_type/business_type_list`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: new Headers({
          // "ngrok-skip-browser-warning": true,
          "token": token
        }),
      })

      const { data } = await response.json();
      setBusinesstypes(data);
    } catch (error) {
      console.log(error)
    }
  }
  const fatchsubcategories = async () => {
    const endpoint = `${BASE_URL}/api/sub_category/parent_sub_category/${formData.business_category_id}`;

    try {
      const response = await fetch(endpoint, {
        method: "GET",
        headers: new Headers({
          // "ngrok-skip-browser-warning": true,
          "token": token
        }),
      })

      const { data } = await response.json();
      setsubcategories(data);
    } catch (error) {
      console.log(error)
    }
  }
  const fatchcategories = async () => {
    const endpoint = `${BASE_URL}/api/category/category_list`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: new Headers({
          // "ngrok-skip-browser-warning": true,
          "token": token
        }),
      })

      const { data } = await response.json();
      setCategories(data);
    } catch (error) {
      console.log(error)
    }
  }

  
  //Get Data from API 
  async function geTableCellata(name, status,business_type_id,business_category_id,business_subcategory_id,from_date,to_date) {
    const endpoint = `${BASE_URL}/api/user/merchant_list`;
  
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
      if (business_type_id) {
        body.business_type_id = business_type_id;
      }
      if (business_category_id) {
        body.business_category_id = business_category_id;
      }
      if (business_subcategory_id) {
        body.business_subcategory_id = business_subcategory_id;
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
    business_type_id:'',
    business_category_id:'',
    business_subcategory_id:'',
   
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
    const { name, status,business_type_id,business_category_id,business_subcategory_id, from_date, to_date } = filterFormData; // Destructure from_date and to_date from filterFormData
    await geTableCellata(name, status,business_type_id,business_category_id,business_subcategory_id, from_date, to_date);
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
    const endpoint = `${BASE_URL}/api/user/merchant/add`;
    let em = [];

    try {
      const data = {
        name: formData.name,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
        confirm_password: formData.confirm_password,
        company_name: formData.company_name,
        postal_code: formData.postal_code,
        country_id: formData.country_id,
        state_id: formData.state_id,
        city_id: formData.city_id,
        street_address: formData.street_address,
        street_address2: formData.street_address2,
        business_type_id: formData.business_type_id,
        business_category_id: formData.business_category_id,
        business_subcategory_id: formData.business_subcategory_id,
        skypeID: formData.skypeID,
        websiteURL: formData.websiteURL,
        business_registered: formData.business_registered
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
            email: '',
            mobile: '',
            password: '',
            confirm_password: '',
            company_name: '',
            postal_code: '',
            country_id: '',
            state_id: '',
            city_id: '',
            street_address: '',
            street_address2: '',
            business_type_id: '',
            business_category_id: '',
            business_subcategory_id: '',
            skypeID: '',
            websiteURL: '',
            business_registered: '',
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
    fetchBusinesstype();
    fatchcategories();
    fetchCountries();
  }, []);

  useEffect(() => {
    if (formData.country_id !== '') {
    fetchState();
    }
  }, [formData.country_id])

  useEffect(() => {
    if (formData.state_id !== '') {
    fetchCity();
    }
  }, [formData.state_id])

  useEffect(() => {
    if (formData.business_category_id !== '') {
      fatchsubcategories();
    }
  }, [formData.business_category_id])

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
    console.log()
    setLoading(true);
    const endpoint = `${BASE_URL}/api/user/merchant/${deletedItemId}`;
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
          <Breadcrumb routeSegments={[{ name: 'Manage Merchant', path: '/ManageMerchant/merchant ' },
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
          <SimpleCard title="Merchant Form">


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
                    name="email"
                    label="Email"
                    size="small"
                    onChange={handleChange}
                    value={formData.email}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField
                    type="text"
                    name="password"
                    label="Password "
                    size="small"
                    onChange={handleChange}
                    value={formData.password}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField
                    type="text"
                    name="confirm_password"
                    label="Confirm Password"
                    size="small"
                    onChange={handleChange}
                    value={formData.confirm_password}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField
                    type="text"
                    name="company_name"
                    label="Company Name"
                    size="small"
                    onChange={handleChange}
                    value={formData.company_name}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField
                    type="text"
                    name="postal_code"
                    label="Postal Code"
                    size="small"
                    onChange={handleChange}
                    value={formData.postal_code}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <Autocomplete
                    options={Countries}
                    getOptionLabel={(country) => country.name}
                    value={Countries.find((country) => country.id === formData.country_id) || null}
                    onChange={(event, newValue) => {
                      handleChange({
                        target: {
                          name: 'country_id',
                          value: newValue ? newValue.id : '', // assuming id is a string or number
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Country Name"
                        required
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <Autocomplete
                    options={States}
                    getOptionLabel={(state) => state.name}
                    value={States.find((state) => state.id === formData.state_id) || null}
                    onChange={(event, newValue) => {
                      handleChange({
                        target: {
                          name: 'state_id',
                          value: newValue ? newValue.id : '', // assuming id is a string or number
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="State Name"
                        required
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <Autocomplete
                    options={cities}
                    getOptionLabel={(city) => city.name}
                    value={cities.find((city) => city.id === formData.city_id) || null}
                    onChange={(event, newValue) => {
                      handleChange({
                        target: {
                          name: 'city_id',
                          value: newValue ? newValue.id : '', // assuming id is a string or number
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="City Name"
                        required
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <Autocomplete
                    options={businesstypes}
                    getOptionLabel={(businesstype) => businesstype.name}
                    value={businesstypes.find((businesstype) => businesstype.id === formData.business_type_id) || null}
                    onChange={(event, newValue) => {
                      handleChange({
                        target: {
                          name: 'business_type_id',
                          value: newValue ? newValue.id : '', // assuming id is a string or number
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Business Type"
                        required
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <Autocomplete
                    options={categories}
                    getOptionLabel={(category) => category.name}
                    value={categories.find((category) => category.id === formData.business_category_id) || null}
                    onChange={(event, newValue) => {
                      handleChange({
                        target: {
                          name: 'business_category_id',
                          value: newValue ? newValue.id : '', // assuming id is a string or number
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category Name"
                        required
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <Autocomplete
                    options={subcategories}
                    getOptionLabel={(subcategory) => subcategory.name}
                    value={subcategories.find((subcategory) => subcategory.id === formData.business_subcategory_id) || null}
                    onChange={(event, newValue) => {
                      handleChange({
                        target: {
                          name: 'business_subcategory_id',
                          value: newValue ? newValue.id : '', // assuming id is a string or number
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Sub Category"
                        required
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField
                    type="text"
                    name="skypeID"
                    label="Skype ID"
                    size="small"
                    onChange={handleChange}
                    value={formData.skypeID}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField
                    type="text"
                    name="websiteURL"
                    label="Website Url"
                    size="small"
                    onChange={handleChange}
                    value={formData.websiteURL}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField
                    type="mobile"
                    name="mobile"
                    label="Mobile "
                    size="small"
                    onChange={handleChange}
                    value={formData.mobile}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField
                    type="date"
                    name="business_registered"
                    label="Business Registered"
                    size="small"
                    onChange={handleChange}
                    value={formData.business_registered}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>


                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField
                    type="text"
                    name="street_address"
                    label="Street Address"
                    size="small"
                    onChange={handleChange}
                    value={formData.street_address}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>

                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField
                    type="text"
                    name="street_address2"
                    label="Street Address 2"
                    size="small"
                    onChange={handleChange}
                    value={formData.street_address2}
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
        <SimpleCard title="Merchant Table">
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
                    options={businesstypes}
                    getOptionLabel={(businesstype) => businesstype.name}
                    value={businesstypes.find((businesstype) => businesstype.id === filterFormData.business_type_id) || null}
                    onChange={(event, newValue) => {
                      handleFilterFormChange({
                        target: {
                          name: 'business_type_id',
                          value: newValue ? newValue.id : '', // assuming id is a string or number
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Business Type"
                       
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </Grid>


                <Grid item xs={12} md={3}>
                  <Autocomplete
                    options={categories}
                    getOptionLabel={(category) => category.name}
                    value={categories.find((category) => category.id === filterFormData.business_category_id) || null}
                    onChange={(event, newValue) => {
                      handleFilterFormChange({
                        target: {
                          name: 'business_category_id',
                          value: newValue ? newValue.id : '', // assuming id is a string or number
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Category Name"
                       
                        fullWidth
                        size="small"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <Autocomplete
                    options={subcategories}
                    getOptionLabel={(subcategory) => subcategory.name}
                    value={subcategories.find((subcategory) => subcategory.id === filterFormData.business_subcategory_id) || null}
                    onChange={(event, newValue) => {
                      handleFilterFormChange({
                        target: {
                          name: 'business_subcategory_id',
                          value: newValue ? newValue.id : '', // assuming id is a string or number
                        },
                      });
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Sub Category"
                        required
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
                  <TableCell align="center">users_id  </TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Mobile </TableCell>
                  <TableCell align="center">User Type </TableCell>
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
                      <TableCell align="center">{item.users_id}</TableCell>
                      <TableCell align="center">{item.email}</TableCell>
                      <TableCell align="center">{item.mobile}</TableCell>
                      <TableCell align="center">{item.user_type}</TableCell>
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
                        <MerchantEdit editedItem={editedItem} handleClose={handleClose} open={open} />
                        <DeleteOutlineTwoToneIcon onClick={() => handleDeleteModalOpen(item.users_id)} fontSize="small" style={{ color: '#ff0000' }}>
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

export default Merchant;