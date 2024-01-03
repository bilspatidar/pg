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
  width: '80%',
  bgcolor: 'background.paper',
  border: '1px solid #fff',
  boxShadow: 24,
  p: 4,
  overflow:'scroll',
  height: "90%"
};

function MerchantEdit({ handleClose, open, editedItem }) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [Countries, setCountries] = useState([]);

  const [cities, setcities] = useState([]);
  const [businesstypes, setBusinesstypes] = useState([]);

  const [subcategories, setsubcategories] = useState([]);
  const [States, setState] = useState([]);

  const token = localStorage.getItem('accessToken');
  const [apiResponse, setApiResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState([]);
  const [formData, setFormData] = useState({
    users_id:'',
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
    status:'',
  });
  // const refreshTable = () => {
  //   //setTableData(tableData);
  //   tableData();
  // }

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

      const {data} = await response.json();
      setcities(data);
    } catch (error) {
      console.log(error)
    }
  }
  const fetchState = async () => {
    const endpoint = `${BASE_URL}/api/state/parent_state/${formData.country_id}`;

    try {
      const response = await fetch(endpoint, {
        method: "get",
        headers: new Headers({
        //   "ngrok-skip-browser-warning": true,
          "token": token
        }),  
      })

      const {data} = await response.json();
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

      const {data} = await response.json();
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
    const endpoint = `${BASE_URL}/api/user/merchant/update`;
    let em = [];


    try {
      const data = {
        users_id: formData.users_id,
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
        business_registered: formData.business_registered,
        status:formData.status,
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
    fetchBusinesstype();
   
    fatchcategories();
    fetchCountries();
   

    console.log(editedItem)
    setFormData({
     users_id: editedItem.users_id,
     
      name: editedItem.name,
      email: editedItem.email,
      mobile: editedItem.mobile,
      password: editedItem.password,
      confirm_password: editedItem.confirm_password,
      company_name: editedItem.company_name,
      postal_code: editedItem.postal_code,
      country_id: editedItem.country_id,
      state_id: editedItem.state_id,
      city_id: editedItem.city_id,
      street_address: editedItem.street_address,
      street_address2: editedItem.street_address2,
      business_type_id: editedItem.business_type_id,
      business_category_id: editedItem.business_category_id,
      business_subcategory_id: editedItem.business_subcategory_id,
      skypeID: editedItem.skypeID,
      websiteURL: editedItem.websiteURL,
      business_registered: editedItem.business_registered,
      status:editedItem.status,


    })
  }, [editedItem])
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
                name="users_id"
                label="users_id"
                size="small"
                onChange={handleChange}
                value={formData.users_id}
                style={{ display: 'none' }}
              />
              <Grid container spacing={3}>
              <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField fullWidth
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
                  <TextField fullWidth
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
                  <TextField fullWidth
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
                  <TextField fullWidth
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
                  <TextField fullWidth
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
                  <TextField fullWidth
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
                      label="Category Name "
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
                  <TextField fullWidth
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
                  <TextField fullWidth
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
                  <TextField fullWidth
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
                  <TextField fullWidth
                    type="text"
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
                  <TextField fullWidth
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
                  <TextField fullWidth
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

export default MerchantEdit;
