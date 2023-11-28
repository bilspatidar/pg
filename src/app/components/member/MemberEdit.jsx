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
// import Loading from "../MatxLoading";

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
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

function MemberEdit({ handleClose, open, editedItem }) {

  const [imageData, setImageData] = useState('');
  const [signatureImg, setSignatureImg] = useState('');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('accessToken');
  const [apiResponse, setApiResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState([]);
  const [formData, setFormData] = useState({
  

first_name: '',
 last_name: '',
 father_husband: '',
 relation: '',
 mother_name: '',
 marital_status:'',
 category:'',
 gender: '',
 dob: '',
 religion: '',
 mobile: '',
 alt_mobile: '',
 status:'',
 profile_pic:'',
 signature:'',
    });
// const refreshTable = () => {
//   //setTableData(tableData);
//   tableData();
// }


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
    const endpoint = `${BASE_URL}/member/update`;
   let em = [];
   
   
    try {
      const data = {
        id: formData.id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        father_husband: formData.father_husband,
        relation: formData.relation,
        mother_name: formData.mother_name,
        marital_status: formData.marital_status,
        category: formData.category,
        gender: formData.gender,
        dob: formData.dob,
        religion: formData.religion,
        mobile: formData.mobile,
        alt_mobile: formData.alt_mobile,
        status: formData.status,
        profile_pic: imageData,
        signature: signatureImg,
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
  const handleprofileChange = (e) => {
     
        
    handleFileInputChange(e, setImageData);

  };
  const handlesignatureChange = (e) => {
   
    
    handleFileInputChange(e, setSignatureImg);

  };


  useEffect(() => {
    console.log(editedItem)
    setFormData({
         id: editedItem.id,
          first_name:editedItem.first_name,
            last_name:editedItem.last_name,
            father_husband:editedItem.father_husband,
            relation:editedItem.relation,
            mother_name:editedItem.mother_name,
            marital_status:editedItem.marital_status,
            category:editedItem.category,
            gender:editedItem.gender,
            dob:editedItem.dob,
            religion:editedItem.religion,
            mobile:editedItem.mobile,
            alt_mobile:editedItem.alt_mobile,
            status:editedItem.status,
          
     
    })
    setImageData(editedItem.profile_pic)
    setSignatureImg(editedItem.signature)

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
        <TextField fullWidth
          type="text"
          name="first_name"
          label="First Name"
          size="small"
          onChange={handleChange}
          value={formData.first_name}
          validators={['required']}
          errorMessages={['This field is required']}
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
        <TextField fullWidth
          type="text"
          name="last_name"
          label="Last Name"
          size="small"
          onChange={handleChange}
          value={formData.last_name}
          validators={['required']}
          errorMessages={['This field is required']}
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
        <TextField fullWidth
          type="text"
          name="father_husband"
          label="Father/Husband"
          size="small"
          onChange={handleChange}
          value={formData.father_husband}
          validators={['required']}
          errorMessages={['This field is required']}
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
        <TextField fullWidth
          type="text"
          name="relation"
          label="Relation"
          size="small"
          onChange={handleChange}
          value={formData.relation}
          validators={['required']}
          errorMessages={['This field is required']}
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
        <TextField
          type="text"fullWidth
          name="mother_name"
          label="Mother Name"
          size="small"
          onChange={handleChange}
          value={formData.mother_name}
          validators={['required']}
          errorMessages={['This field is required']}
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
      <FormControl size="small" fullWidth>
        <InputLabel>Marital Status</InputLabel>
        <Select
          name="marital_status"
          onChange={handleChange}
          value={formData.marital_status}
          required
        >
          <MenuItem value="Married">Married</MenuItem> 
          <MenuItem value="Unmarried">Unmarried</MenuItem> 
        </Select>
      </FormControl>
    </Grid>
      
    <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
      <FormControl size="small" fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          onChange={handleChange}
          value={formData.category}
          required
        >
          <MenuItem value="General">General</MenuItem> 
          <MenuItem value="OBC">OBC</MenuItem> 
          <MenuItem value="ST">ST</MenuItem> 
          <MenuItem value="SC">SC	</MenuItem> 
          <MenuItem value="EWS	">EWS	</MenuItem> 

        </Select>
      </FormControl>
    </Grid>
      
     
    <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
    
        <RadioGroup  fullWidth
          name="gender"
      
          value={formData.gender}
          onChange={handleChange}
          row  // Set row to display radio buttons in a horizontal row
        >
          <Typography> Gender&nbsp;&nbsp;
          <FormControlLabel
             value="Male"
            control={<Radio />}
            label="Male"
          />
          <FormControlLabel
            value="Female"
            control={<Radio />}
            label="Female"
          />
          </Typography>
        </RadioGroup>
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
        <TextField fullWidth
          type="date"
          name="dob"
          label="Date of Birth"
          size="small"
          onChange={handleChange}
          value={formData.dob}
          validators={['required']}
          errorMessages={['This field is required']}
        />
      </Grid>
      
      <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
      <FormControl size="small" fullWidth>
        <InputLabel>Religion</InputLabel>
        <Select
          name="religion"
          onChange={handleChange}
          value={formData.religion}
          required
        >
          <MenuItem value="Hindu">Hindu</MenuItem> 
          <MenuItem value="Islam">Islam</MenuItem> 
          <MenuItem value="Christian">Christian</MenuItem> 
          <MenuItem value="Sikh">Sikh</MenuItem> 
          <MenuItem value="Other">Other	</MenuItem> 

        </Select>
      </FormControl>
    </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
        <TextField fullWidth
          type="number"
          name="mobile"
          label="Mobile"
          size="small"
          onChange={handleChange}
          value={formData.mobile}
          validators={['required']}
          errorMessages={['This field is required']}
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
        <TextField fullWidth
          type="number"
          name="alt_mobile"
          label="Alternative Mobile"
          size="small"
          onChange={handleChange}
          value={formData.alt_mobile}
          validators={['required']}
          errorMessages={['This field is required']}
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
      <FormControl size="small" fullWidth>
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          onChange={handleChange}
          value={formData.status}
          required
        >
          <MenuItem value="active">Active</MenuItem> 
          <MenuItem value="deactive">Deactive</MenuItem> 
        </Select>
      </FormControl>
    </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
        <TextField fullWidth
          type="file"
          name="profile_pic"
          label="Profile Pic"
          size="small"
          onChange={handleprofileChange}
         
          // validators={['required']}
          // errorMessages={['This field is required']}
        />
      </Grid>
      <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
        <TextField fullWidth
          type="file"
          name="signature"
          label="Signature"
          size="small"
          onChange={handlesignatureChange}
         
          // validators={['required']}
          // errorMessages={['This field is required']}
        />
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

export default MemberEdit;
