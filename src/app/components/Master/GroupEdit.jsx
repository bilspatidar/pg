import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Span } from "app/components/Typography";
import { ValidatorForm } from "react-material-ui-form-validator";
import { TextField, Grid, Select, MenuItem, Icon, FormControl, InputLabel, } from '@mui/material';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import {BASE_URL} from './../../config';
import CustomSnackbar from '../CustomSnackbar';
import Loading from "../MatxLoading";
import handleFileInputChange from '../../helpers/helper'; // Adjust the import path


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

function GroupEdit({ handleClose, open, editedItem }) {
  const [loading, setLoading] = useState(true);
  const [imageData, setImageData] = useState('');

  const token = localStorage.getItem('accessToken');
  const [apiResponse, setApiResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState([]);
  const [formData, setFormData] = useState({
        
        branch_id: '',
        user_id: '',
        name: '',
        max_limit: '',
        max_member: '',
        emi_date: '',
        address: '',
        location: '',
        address: '',
        image: '',
        status: '',
       
    
    });
// const refreshTable = () => {
//   //setTableData(tableData);
//   tableData();
// }
const [branchs, setBranchs] = useState([]);
const [members, setMembers] = useState([]);

const fetchBranchs = async () => {
  const endpoint = `${BASE_URL}/branch/index`;

  try {
    const response = await fetch(endpoint, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": true,
        "token": token
      }),  
    })

    const {data} = await response.json();
    setBranchs(data);
  } catch (error) {
    console.log(error)
  }
}
const fetchMembers = async () => {
 const endpoint = `${BASE_URL}/member/index`;

  try {
    const response = await fetch(endpoint, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": true,
        "token": token
      }),  
    })

    const {data} = await response.json();
    setMembers(data);
  } catch (error) {
    console.log(error)
  }
}


const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
          ...formData,
          [name]: value
        })
      }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = `${BASE_URL}/group/update`;
   let em = [];
   
   
    try {
      const data = {
        id: formData.id,
        branch_id: formData.branch_id,
        user_id: formData.user_id,
        name: formData.name,
        max_limit: formData.max_limit,
        max_member: formData.max_member,
        emi_date: formData.emi_date,
        address: formData.address,
        location: formData.location,
        address: formData.address,
        status: formData.status,
        image: imageData,
      };
  
      const res = await fetch(endpoint, {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: new Headers({
          "ngrok-skip-browser-warning": true,
          "token": token,
          'Content-Type': 'application/json'
        }),
      });
      

      if (res.status === 200) {
        const responseData = await res.json();
        ///toast.success(responseData.message);
        console.log(responseData.message)
        //setTableData(tableData);
        let obj = {bgType: "success", message:`${responseData.message}`};
        em.push(obj);
      } else {

       
        const errorData = await res.json();
        //toast(errorData.message);
        let obj = {bgType: "error", message:`${errorData.message}`};

        em.push(obj);
        // bgtype = 'error';
       if (errorData.error) { 
          for (const key in errorData.error) {
            if (errorData.error.hasOwnProperty(key)) {
              const errorMessages = errorData.error[key].join(', '); // Combine multiple error messages if any
              //toast.error(`${key}: ${errorMessages}`);
              let obj = {bgType: "error", message: `${key}: ${errorMessages}`};
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
      let obj = {bgType: "error", message:`${error.message}`};

       em.push(obj);

    }
    setErrorMsg(em)
    setLoading(false);
  };

  const handleFileChange = (e) => {
     
        
    handleFileInputChange(e,setImageData);

  };

  useEffect(() => {
    
    console.log(editedItem)
    fetchBranchs();
    fetchMembers();
    setFormData({
      id: editedItem.id,
      name: editedItem.name,
      max_limit: editedItem.max_limit,
      max_member: editedItem.max_member,
      emi_date: editedItem.emi_date,
      address: editedItem.address,
      location: editedItem.location,
      address: editedItem.address,
      status: editedItem.status,
      // image: imageData,
    })
    setImageData(editedItem.image)

  }, [editedItem])
  
  return (
    <>
     {
        errorMsg && errorMsg.length > 0 && errorMsg.map((error, index)=>(
          <div key={index}>
<CustomSnackbar
        message={
          <ul> 
            {errorMsg.map((error, index) => (
              <li key={index} className={index === 0 ? 'first-li-error-msg' : 'li-error-msg'}>{error.message} </li>
            ))}
          </ul>
        }
        severity={ errorMsg[0].bgType }
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
      <FormControl fullWidth size="small">
        <InputLabel>Branch Name *</InputLabel>
        <Select
          name="branch_id"
          onChange={handleChange}
          value={formData.branch_id}
          required
        >
          {/* Map over branchs to generate MenuItem components */}
          {branchs.map((branch) => (
            <MenuItem key={branch.id} value={branch.id}>
              {branch.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
    <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
      <FormControl fullWidth size="small">
        <InputLabel>Group Leader *</InputLabel>
        <Select
          name="user_id"
          onChange={handleChange}
          value={formData.user_id}
          required
        >
          {/* Map over branchs to generate MenuItem components */}
          {members.map((member) => (
            <MenuItem key={member.id} value={member.id}>
              {member.first_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
            <TextField fullWidth
              type="text"
              name="name"
              size="small"
              label="Name"
              onChange={handleChange}
              value={formData.name} 
              validators={["required"]}
              errorMessages={["this field is required"]}
            /> 
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
            <TextField fullWidth
              type="number"
              name="max_member"
              label="Max Limit"
              size="small"
              value={formData.max_limit} 
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            /> 
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
            <TextField fullWidth
              type="number"
              name="max_member"
              label="Max Member"
              size="small"
              onChange={handleChange}
              value={formData.max_member} 
              validators={["required"]}
              errorMessages={["this field is required"]}
            /> 
          </Grid>
          
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
            <TextField fullWidth
              type="number"
              name="emi_date"
              size="small"
              label="Emi Date"
              InputProps={{ inputProps: { min: 1, max: 31}}}
              onChange={handleChange}
              value={formData.emi_date} 
              validators={["required"]}
              errorMessages={["this field is required"]}
            /> 
          </Grid>
         
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
            <TextField fullWidth
              type="text"
              name="location"
              label="Location"
              size="small"
              value={formData.location} 
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            /> 
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
            <TextField fullWidth
              type="file"
              name="image"
              label="Image"
              size="small"
              onChange={handleFileChange}
              // value={imageData}
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
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="deactive">Deactive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 1 }}>
            <TextField fullWidth
              type="text"
              name="address"
              label="Address"
              size="small"
              value={formData.address} 
              multiline
              minRows={4}
              maxRows={4}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            /> 
          </Grid>
        

        </Grid>
        <Button
          style={{ marginTop: 30 }}
          color="primary"
          variant="contained"
          type="submit"
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
export default GroupEdit;