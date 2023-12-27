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
import handleFileInputChange from '../../helpers/helper'; // Adjust the import path
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  Button,
  Container,
  TextField,
  Grid,
  Icon,
  InputLabel,
  MenuItem,
  TextareaAutosize,
  FormControl,
  Select,
  


} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";

import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
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

function ContactUs({ handleClose, open, editedItem }) {
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('accessToken');
  const [apiResponse, setApiResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState([]);
  const [imageData, setImageData] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    status: '',
  });

  // const refreshTable = () => {
  //   //setTableData(tableData);
  //   tableData();
  // }
   const handleFileChange = (e) => {
     
        
    handleFileInputChange(e,setImageData);

  };

  const getUsersDetails = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/pages/pages/6`,
        {
          method: "GET",
          headers: new Headers({
            "token": token,
            'Content-Type': 'application/json'
          }),
        });
      const { data } = await res.json();
      console.log(data[0])
      setFormData({
      
        title: data[0].title,
        mobile: data[0].mobile,
        image: data[0].image,
        status: data[0].status,
        contact_no: data[0].contact_no,
        alt_contact_no: data[0].alt_contact_no,
        email: data[0].email,
        address1: data[0].address1,
        address2: data[0].address2,
        map_link: data[0].map_link,
      })
   
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
    const endpoint = `${BASE_URL}/api/pages/pages/update/6`;
    let em = [];


    try {
      const data = {
        id: "6",
        title: formData.title,
       
        image: imageData,
        status: formData.status,
        contact_no: formData.contact_no,
        alt_contact_no:formData.alt_contact_no,
        email: formData.email,
        address1: formData.address1,
        address2: formData.address2,
        map_link: formData.map_link,
   
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
    getUsersDetails();
  }, [])



  return (
    <>
       <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: 'Contact Us ', path: '/Manageweb/ContactUs ' },
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
          <SimpleCard title="About Form">
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
              <Grid container spacing={3}>
              <TextField
                    type="hidden"
                    name="id"
                  
                    style={{ display: 'none' }}
                    onChange={handleChange}
                    value={formData.id}
                 
                  />
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField fullWidth
                    type="text"
                    name="title"
                    label="Title"
                    size="small"
                    onChange={handleChange}
                    value={formData.title}
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
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                    
          <TextField
              type="file"
              name="image"
              label="Image"
              size="small"
              onChange={handleFileChange}
         
              // validators={["required"]}
              // errorMessages={["this field is required"]}
            /> 
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField fullWidth
                    type="text"
                    name="contact_no"
                    label="Contact NO"
                    size="small"
                    onChange={handleChange}
                    value={formData.contact_no}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField fullWidth
                    type="text"
                    name="alt_contact_no"
                    label="Alt Contact No"
                    size="small"
                    onChange={handleChange}
                    value={formData.alt_contact_no}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
          
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField fullWidth
                    type="email"
                    name="email"
                    label="Email "
                    size="small"
                    onChange={handleChange}
                    value={formData.email}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 1 }}>
  <TextareaAutosize
    minRows={3} // You can adjust the number of rows as needed
    maxRows={6} // You can adjust the number of rows as needed
    placeholder="Address 1"
    name="address1"
    aria-label="Address 1"
    onChange={handleChange}
    value={formData.address1}
    style={{ width: '100%', padding: '8px', resize: 'vertical' }}
    required // Add your validation logic here if needed
  />
</Grid>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 1 }}>
  <TextareaAutosize
    minRows={3} // You can adjust the number of rows as needed
    maxRows={6} // You can adjust the number of rows as needed
    placeholder="Address 2"
    name="address2"
    aria-label="Address 2"
    onChange={handleChange}
    value={formData.address2}
    style={{ width: '100%', padding: '8px', resize: 'vertical' }}
    required // Add your validation logic here if needed
  />
</Grid>

<Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 1 }}>
  <TextareaAutosize
    minRows={3} // You can adjust the number of rows as needed
    maxRows={6} // You can adjust the number of rows as needed
    placeholder="map_link "
    name="map_link"
    aria-label="Map Link "
    onChange={handleChange}
    value={formData.map_link}
    style={{ width: '100%', padding: '8px', resize: 'vertical' }}
    required // Add your validation logic here if needed
  />
</Grid>
              </Grid>

              <Button  style={{ marginTop: 60 }} color="primary" variant="contained"
                type="submit">
                <Icon>send</Icon>
                <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
              </Button>
            </ValidatorForm>

          </SimpleCard>
        </Stack>
      </Container>
    </>
  );
}

export default ContactUs;
