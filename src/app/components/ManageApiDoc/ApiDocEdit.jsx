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
import handleFileInputChange from '../../helpers/helper'; // Adjust the import path
import Autocomplete from '@mui/material/Autocomplete';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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

function ApiDocEdit({ handleClose, open, editedItem }) {
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('accessToken');
  const [apiResponse, setApiResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState([]);
  const [header, setHeader] = useState('');
  const [request, setRequest] = useState('');
  const [response, setResponse] = useState('');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [example, setExample] = useState('');

  const [formData, setFormData] = useState({
            title: '',
            method: '',
            menu_name: '',
            url: '',
            arrange: '',
            header: '',
            request: '',
            response: '',
            description: '',
            details: '',
            example: '',
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
    const endpoint = `${BASE_URL}/api/api_documentation/api_documentation/update`;
    let em = [];


    try {
      const data = {
        id: formData.id,
        title: formData.title,
        method: formData.method,
        menu_name: formData.menu_name,
        url: formData.url,
        arrange: formData.arrange,    
        header: header,
        request: request,
        details: details,
        response: response,
        description: description,
        example: example,
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
   
   
    setFormData({
      id: editedItem.id,
      title: editedItem.title,
      method: editedItem.method,
      menu_name: editedItem.menu_name,
      url: editedItem.url,
      arrange: editedItem.arrange,     
      status: editedItem.status,

})
setHeader(editedItem.header)
setRequest(editedItem.request)
setResponse(editedItem.details)
setDescription(editedItem.response)
setDetails(editedItem.description)
setExample(editedItem.example)

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
          <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
              <Grid container spacing={3}>
              <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <FormControl size="small" fullWidth>
                    <InputLabel>Method</InputLabel>
                    <Select
                      name="method"
                      onChange={handleChange}
                      value={formData.method}
                    >
                      <MenuItem value="GET">GET</MenuItem>
                      <MenuItem value="Post">Post</MenuItem>
                      <MenuItem value="PUT">PUT</MenuItem>
                      <MenuItem value="Delete">Delete</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>    

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
                  <TextField fullWidth
                    type="text"
                    name="menu_name"
                    label="Menu Name"
                    size="small"
                    onChange={handleChange}
                    value={formData.menu_name}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField fullWidth
                    type="text"
                    name="url"
                    label="URL"
                    size="small"
                    onChange={handleChange}
                    value={formData.url}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                  <TextField fullWidth
                    type="number"
                    name="arrange"
                    label="Arrange"
                    size="small"
                    onChange={handleChange}
                    value={formData.arrange}
                    validators={["required"]}
                    errorMessages={["this field is required"]}
                  />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 1 }}>
                <Typography variant="subtitle1" style={{ fontWeight:'bold' }}>Header</Typography>
                <ReactQuill fullWidth style={{ height:"100px"}} 
                value={header} onChange={setHeader}  theme="snow" />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 3 }}>
                <Typography variant="subtitle1" style={{ fontWeight:'bold' }}>Request</Typography>
                <ReactQuill fullWidth style={{ height:"100px"}} 
                value={request} onChange={setRequest}  theme="snow" />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 3 }}>
                <Typography variant="subtitle1" style={{ fontWeight:'bold' }}>Response</Typography>
                <ReactQuill fullWidth style={{ height:"100px"}} 
                value={response} onChange={setResponse}  theme="snow" />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 3 }}>
                <Typography variant="subtitle1" style={{ fontWeight:'bold' }}>Description</Typography>
                <ReactQuill fullWidth style={{ height:"100px"}} 
                value={description} onChange={setDescription}  theme="snow" />
                </Grid>
                
                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 3 }}>
                <Typography variant="subtitle1" style={{ fontWeight:'bold' }}>Details</Typography>
                <ReactQuill fullWidth style={{ height:"100px"}} 
                value={details} onChange={setDetails}  theme="snow" />
                </Grid>

                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 3 }}>
                <Typography variant="subtitle1" style={{ fontWeight:'bold' }}>Example</Typography>
                <ReactQuill fullWidth style={{ height:"100px"}} 
                 value={example} onChange={setExample}  theme="snow" />
                </Grid>
         
              </Grid>

              <Button  style={{ marginTop: 60 }} color="primary" variant="contained"
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

export default ApiDocEdit;
