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

function ProductEdit({ handleClose, open, editedItem }) {
  const [loading, setLoading] = useState(true);
  const [imageData, setImageData] = useState('');

  const token = localStorage.getItem('accessToken');
  const [apiResponse, setApiResponse] = useState(null);
  const [errorMsg, setErrorMsg] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubCategories] = useState([]);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image_url: '',
    
    category_id: '',
    sub_category_id: '',
    weight: '',
    other_weight: '',
    other_price: '',
    making_charge: '',
    status: '',
    unit_id: '',
    
    });
// const refreshTable = () => {
//   //setTableData(tableData);
//   tableData();
// }

const fetchCategories = async () => {
  const endpoint = `${BASE_URL}/category/index`;

  try {
    const response = await fetch(endpoint, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": true,
        "token": token
      }),  
    })

    const {data} = await response.json();
    setCategories(data);
  } catch (error) {
    console.log(error)
  }
}
const fetchSubCategories = async () => {
  const endpoint = `${BASE_URL}/sub_category/index`;

  try {
    const response = await fetch(endpoint, {
      method: "get",
      headers: new Headers({
        "ngrok-skip-browser-warning": true,
        "token": token
      }),  
    })

    const {data} = await response.json();
    setSubCategories(data);
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
    const endpoint = `${BASE_URL}/product/update`;
   let em = [];
   
   
    try {
      const data = {
        id: formData.id,
        name: formData.name,
            price: formData.price,
            description: formData.description,
            image_url: imageData,
            category_id: formData.category_id,
            sub_category_id: formData.sub_category_id,
            weight: formData.weight,
            other_weight: formData.other_weight,
            other_price: formData.other_price,
            making_charge: formData.making_charge,
            status: formData.status,
            unit_id: formData.unit_id,
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
    fetchCategories();
    fetchSubCategories  ();


    setFormData({
      id: editedItem.id,
      name: editedItem.name,
      price: editedItem.price,
      description: editedItem.description,
      category_id: editedItem.category_id,
      sub_category_id: editedItem.sub_category_id,
      weight: editedItem.weight,
      other_weight: editedItem.other_weight,
      other_price: editedItem.other_price,
      making_charge: editedItem.making_charge,
      status: editedItem.status,
      unit_id: editedItem.unit_id,
      // imageData: editedItem.imageData,
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
              type="text"
              name="price"
              size="small"
              label="Price"
              onChange={handleChange}
              value={formData.price} 
              validators={["required"]}
              errorMessages={["this field is required"]}
            /> 
          </Grid>
         
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
            <TextField fullWidth
              type="file"
              name="image_url"
              label="Image Url"
              size="small"
              onChange={handleFileChange}
              // value={formData.image_url} 
              // validators={["required"]}
              // errorMessages={["this field is required"]}
            /> 
          </Grid>
         
         
          
            
<Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
      <FormControl fullWidth size="small">
        <InputLabel>Category Name *</InputLabel>
        <Select
          name="category_id"
          onChange={handleChange}
          value={formData.category_id}
          required
        >
          {/* Map over categories to generate MenuItem components */}
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>

       
<Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
      <FormControl fullWidth size="small">
        <InputLabel> Sub Category Name *</InputLabel>
        <Select
          name="sub_category_id"
          onChange={handleChange}
          value={formData.sub_category_id}
          required
        >
          {/* Map over categories to generate MenuItem components */}
          {subcategories.map((subcategory) => (
            <MenuItem key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
            <TextField fullWidth
              type="number"
              name="weight"
              size="small"
              label="Weight"
              value={formData.weight} 
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            /> 
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
            <TextField fullWidth
              type="number"
              name="other_weight"
              label="Other Weight"
              size="small"
              value={formData.other_weight} 
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            /> 
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
            <TextField fullWidth
              type="number"
              name="other_price"
              label="Other Price"
              size="small"
              value={formData.other_price} 
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            /> 
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
            <TextField fullWidth
              type="number"
              name="making_charge"
              label="Making Charge"
              size="small"
              value={formData.making_charge} 
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            /> 
          </Grid>
        
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
        <FormControl  size="small" fullWidth>
          <InputLabel>Unit Name </InputLabel>
          <Select
            name="unit_id"
            onChange={handleChange}
            value={formData.unit_id} 
            required
          >
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
          </Select>
        </FormControl>
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
              size="small"
              name="description"
              label="Description"
              value={formData.description} 
              multiline
              minRows={4}
              maxRows={4}
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            /> 
          </Grid>
        </Grid>

        <Button style={{marginTop: 30}} color="primary" variant="contained" type="submit">
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
export default ProductEdit;