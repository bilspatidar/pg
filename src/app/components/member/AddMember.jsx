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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Typography from '@mui/material/Typography';
//import helper from '../../helpers'
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
import MemberEdit from './MemberEdit';

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

function AddMember () {
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
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [imageData, setImageData] = useState('');
    const [signatureImg, setSignatureImg] = useState('');


    
    
      
      //Get Data from API 
      async function geTableCellata() {
        
        const endpoint = `${BASE_URL}/member/index`;
    
        try {
          const res = await fetch(endpoint,{
            method: "get",
            headers: new Headers({
              "ngrok-skip-browser-warning": true,
              "token": token
            }),
          });
          
         const data = await res.json();
          setTableData(data.data);
          if(res.status !== 401){
            setTableData(data.data); // Set the fetched data to the local state variable
          }
        
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        setLoading(false);
      }

      
      const handleprofileChange = (e) => {
     
        
        handleFileInputChange(e, setImageData);

      };
      const handlesignatureChange = (e) => {
       
        
        handleFileInputChange(e, setSignatureImg);

      };
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
        const endpoint = `${BASE_URL}/member/create`;
       let em = [];
       
       
        try {
          const data = {
        
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

    const endpoint = `${BASE_URL}/member/destroy`;
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
        <Breadcrumb routeSegments={[{ name: 'Add Member', path: '/member/addmember' }, 
        { name: 'Form' }]} />
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
        <SimpleCard title="Add Member Form">


    <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={3}>
        <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
        <TextField
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
        <TextField
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
        <TextField
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
        <TextField
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
          type="text"
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
    
        <RadioGroup
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
        <TextField
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
        <TextField
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
        <TextField
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
        <TextField
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
        <TextField
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

        <Button style={{marginTop: 30}} color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
      </ValidatorForm>

      </SimpleCard>
      </Stack>
      </Container>
      <Container>
      <SimpleCard title="Add Member Table">
<ValidatorForm  className="filterForm">
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <TextField
            id="filterTwo"
            label="Name"
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
   
      <Box width="100%" overflow="auto" mt={2}>
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
      
      <StyledTable id="dataTable" ref={tableRef} sx={{ minWidth: 1500 }} aria-label="caption table" >
     
        <TableHead>
       
          <TableRow>
            <TableCell align="left">Sr no.</TableCell>
            <TableCell align="center">First Name</TableCell>
            <TableCell align="center">Last Name</TableCell>
            <TableCell align="center">Father/Husband</TableCell>
            <TableCell align="center">Relation</TableCell>
            <TableCell align="center">Mother Name </TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Gender</TableCell>
            <TableCell align="center">DOB</TableCell>
            <TableCell align="center">Religion</TableCell>
            <TableCell align="center">Mobile</TableCell>
            <TableCell align="center">Profile Pic</TableCell>
            <TableCell align="center">Signature</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Option</TableCell>
            
          </TableRow>
        </TableHead>

        <TableBody>
          {tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((item, index) => (
              <TableRow key={index}>
                <TableCell align="left">{index + 1}</TableCell>
                <TableCell align="center">{item.first_name}</TableCell>
                <TableCell align="center">{item.last_name}</TableCell>
                <TableCell align="center">{item.father_husband}</TableCell>
                <TableCell align="center">{item.relation}</TableCell>
                <TableCell align="center">{item.mother_name}</TableCell>
                <TableCell align="center">{item.category}</TableCell>
                <TableCell align="center">{item.gender}</TableCell>
                <TableCell align="center">{item.dob}</TableCell>
                <TableCell align="center">{item.religion}</TableCell>
                <TableCell align="center">{item.mobile}</TableCell>
                <TableCell align="center">
                {item.profile_pic ? (
          <a href={item.profile_pic} target="_blank" rel="noopener noreferrer">
            <img
              style={{ height: '50px', width: '50px' }}
              src={item.profile_pic}
              alt="Item Image"
            />
          </a>
        ) : (
          <span>No Image Available</span>
        )}
        
        </TableCell>
        <TableCell align="center">
                {item.signature ? (
          <a href={item.signature} target="_blank" rel="noopener noreferrer">
            <img
              style={{ height: '50px', width: '50px' }}
              src={item.signature}
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
              <MemberEdit editedItem={editedItem} handleClose={handleClose} open={open} />
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
        sx={{ px: 2,minWidth: 1500 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={tableData?.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10,15,25,50]}
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

export default AddMember;