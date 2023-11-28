import React, { useRef,JWTAuthContext } from 'react'
import {BASE_URL} from './../../config';
import { Stack } from '@mui/material';
import { Box, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import ModeTwoToneIcon from '@mui/icons-material/ModeTwoTone';
import  Dialog  from "../Dialog";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Style.css';
import CustomSnackbar from '../CustomSnackbar';
import Loading from "../MatxLoading";
import DeleteOutlineTwoToneIcon from '@mui/icons-material/DeleteOutlineTwoTone';
import handleFileInputChange from '../../helpers/helper'; // Adjust the import path

import {
  Button,
  InputLabel ,
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
  Select,

 
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";

import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import ProductEdit from './ProductEdit';

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

function Product () {
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

      const [categories, setCategories] = useState([]);
      const [subcategories, setSubCategories] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [imageData, setImageData] = useState('');

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
      
      //Get Data from API 
      async function geTableCellata() {
        
        const endpoint = `${BASE_URL}/product/index`;
    
        try {
          const res = await fetch(endpoint,{
            method: "get",
            headers: new Headers({
              "ngrok-skip-browser-warning": true,
              "token": token
            }),  
          });
          
         const data = await res.json();
          setTableData(data);
          if(res.status !== 401){
            console.log(data)
            setTableData(data.data); // Set the fetched data to the local state variable
          }
        
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        setLoading(false);
      }
    


      
      const handleChange = (e) => {
        // file type m value nhi hoti h wait sochne do conditon lgegi yha
        const {name, value} = e.target;
        setFormData({
          ...formData,
          [name]: value
        })
      }
    
      
      const handleSubmit = async (e) => {
        e.preventDefault();
         setLoading(true);
        const endpoint = `${BASE_URL}/product/create`;
       let em = [];
       
       
        try {
          const data = {
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
            method: "POST",
            body: JSON.stringify(data),
            headers: new Headers({
              "ngrok-skip-browser-warning": true,
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
              
                }
            )
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
        geTableCellata();
        fetchCategories();
        fetchSubCategories();
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
    
    const handleClose = () => 
    {
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
    const token = localStorage.getItem('accessToken');

    const endpoint = `${BASE_URL}/product/destroy`;
    try {
      const data = {
        id: deletedItemId,
      };
  
      const res = await fetch(endpoint, {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: new Headers({
          "ngrok-skip-browser-warning": true,
          "token": token,
          'Content-Type': 'application/json'
        }),
      });
      console.log(res)
      if(res.status === 200){
        geTableCellata()
      }
    } catch (error) {
      console.log(error)

    }
    handleDeleteModalClose()
  }

    
  return (
    <>
     <div className='componentLoader'>  { loading? ( <Loading /> ) : ( "" ) } </div>
        <Container>
        <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Product', path: '/master/product' }, { name: 'Form' }]} />
      </Box>
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
      
      <Stack spacing={3}>
        <SimpleCard title="Product Form">

<ValidatorForm onSubmit={handleSubmit} onError={() => null}>
    <Grid container spacing={3}>
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
            <TextField
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
            <TextField
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
            <TextField
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
            <TextField
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
            <TextField
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
            <TextField
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
            <TextField
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
            <TextField
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


      </SimpleCard>
      </Stack>
      </Container>


      <Container>
      <SimpleCard title="Product Table">
      <ValidatorForm  className="filterForm">
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            id="filterTwo"
            label="Booking No"
            variant="outlined"
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            id="filterFour"
            label="From Date"
            type="date"
            variant="outlined"
            size="small"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField
            id="filterFive"
            label="To Date"
            type="date"
            variant="outlined"
            size="small"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
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
      <Box width="100%" overflow="auto"mt={2}>
      <Button
         
         variant="contained"
         // color="primary"
         onClick={()=>handlePrint()}
         style={{
           backgroundColor: '#2A0604', // Set the desired darker color
           color: 'white', 
           height:30,
         }}
       >
         Print
         
       </Button>
     
       <StyledTable id="dataTable" ref={tableRef} sx={{ minWidth: 1300 }} aria-label="caption table" >
     
     <TableHead>
    
       <TableRow>
            <TableCell align="left">Sr no.</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Category </TableCell>
            <TableCell align="center">Sub Category</TableCell>
            <TableCell align="center">Weight</TableCell>
            <TableCell align="center">Other Weight</TableCell>
            <TableCell align="center">Other Price</TableCell>
            <TableCell align="center">Making Charge </TableCell>
            <TableCell align="center">Unit Id</TableCell>
            <TableCell align="center">Image</TableCell>   
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
            <TableCell align="center">{item.price} </TableCell>
            <TableCell align="center">{item.category_name}</TableCell>    
            <TableCell align="center">{item.sub_category_name} </TableCell>
            <TableCell align="center">{item.weight}</TableCell>
            <TableCell align="center">{item.other_weight}</TableCell>
            <TableCell align="center">{item.other_price}</TableCell>
            <TableCell align="center">{item.making_charge}</TableCell>
            <TableCell align="center">{item.unit_id}</TableCell>
             <TableCell align="center">
        {item.image_url ? (
          <a href={item.image_url} target="_blank" rel="noopener noreferrer">
            <img
              style={{ height: '50px', width: '50px' }}
              src={item.image_url}
              alt="Item Image"
            />
          </a>
        ) : (
          <span>No Image Available</span>
        )}
      </TableCell>
            
      <TableCell align="center">
  <Small className={item.status === 'active' ? 'green_status' : 'red_status'
  }>
    {item.status}
  </Small>
</TableCell>
             <TableCell align="right">
             
           
             <ModeTwoToneIcon  fontSize="small" style={{ color: '#173853' }} 
             onClick={() => handleOpen(item)}>
<Icon>edit</Icon>
</ModeTwoToneIcon>
           <ProductEdit editedItem={editedItem} handleClose={handleClose} open={open} />
           <DeleteOutlineTwoToneIcon onClick={()=>handleDeleteModalOpen(item.id)} fontSize="small" style={{ color: '#ff0000' }}>
<Icon>delete</Icon>
</DeleteOutlineTwoToneIcon>
           <Dialog actionButtonhandler={deleteItem} open={openDeleteModal} handleClose={handleDeleteModalClose} />
             </TableCell>
             
           </TableRow>
         ))}
     </TableBody>

   </StyledTable>


      <TablePagination
        sx={{ px: 2,minWidth: 1300}}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={tableData.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
    </Box>
    </SimpleCard> 
    </Container>
    </>
  )
}

export default Product;