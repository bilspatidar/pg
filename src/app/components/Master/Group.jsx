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
import GroupEdit from './GroupEdit';

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

function Group () {
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
      
        branch_id: '',
        user_id: '',
        name: '',
        max_limit: '',
        max_member: '',
        emi_date: '',
        location: '',
        address: '',
        image: '',
        status: '',
      });
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [imageData, setImageData] = useState('');
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
    
      
      //Get Data from API 
      async function geTableCellata() {
        
        const endpoint = `${BASE_URL}/group/index`;
    
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
        const endpoint = `${BASE_URL}/group/create`;
       let em = [];
       
       
        try {
          const data = {
           
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
        fetchBranchs();
        fetchMembers();

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

    const endpoint = `${BASE_URL}/group/destroy`;
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
        <Breadcrumb routeSegments={[{ name: 'Group', path: '/master/group' }, { name: 'Form' }]} />
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
        <SimpleCard title="Group Form">


   
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
              type="number"
              name="max_limit"
              label="Max Limit"
              size="small"
              onChange={handleChange}
              value={formData.max_limit} 
              validators={["required"]}
              errorMessages={["this field is required"]}
            /> 
          </Grid>
         
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
            <TextField
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
            <TextField
              type="file"
              name="image"
              size="small"
              label="Image"
              onChange={handleFileChange}
          
            /> 
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
            <TextField
              type="number"
              name="emi_date"
              label="Emi Date"
              size="small"
              InputProps={{ inputProps: { min: 1, max: 31}}}
              onChange={handleChange}
              value={formData.emi_date} 
             
              validators={["required"]}
              errorMessages={["this field is required"]}
            /> 
          </Grid>
         
          <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
            <TextField
              type="text"
              size="small"
              name="location"
              label="Location"
              value={formData.location} 
              onChange={handleChange}
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
          required
        >
          <MenuItem value="active">Active</MenuItem> 
          <MenuItem value="deactive">Deactive</MenuItem> 
        </Select>
      </FormControl>
    </Grid>
 <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 1 }}>
            <TextField
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

        <Button style={{marginTop: 30}} color="primary" variant="contained" type="submit">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
      </ValidatorForm>
      </SimpleCard>
      </Stack>
      </Container>


      <Container>
      <SimpleCard title="Group Table">
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
     
       <StyledTable id="dataTable" ref={tableRef} sx={{ minWidth: 600 }} aria-label="caption table" >
     
     <TableHead>
    
       <TableRow>
            <TableCell align="left">Sr no.</TableCell>
            <TableCell align="center">Branch</TableCell>
            <TableCell align="center">Group Leader</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Max Limit</TableCell>
            <TableCell align="center">Max Member</TableCell>
            <TableCell align="center">Emi Date </TableCell>
            <TableCell align="center">Address</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">image</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="right">Option</TableCell>
         
       </TableRow>
     </TableHead>

     <TableBody>
       {tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
         .map((item, index) => (
           <TableRow key={index}>
             <TableCell align="left">{index + 1}</TableCell>
             <TableCell align="center">{item.branch_name}</TableCell>
             <TableCell align="center">{item.user_name}</TableCell>
                <TableCell align="center">{item.name}</TableCell>
                <TableCell align="center">{item.max_limit}</TableCell>
                <TableCell align="center">{item.max_member}</TableCell>
                <TableCell align="center">{item.emi_date}</TableCell>
                <TableCell align="center">{item.address}</TableCell>
                <TableCell align="center">{item.location}</TableCell>
             <TableCell align="center">
        {item.image ? (
          <a href={item.image} target="_blank" rel="noopener noreferrer">
            <img
              style={{ height: '50px', width: '50px' }}
              src={item.image}
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
           <GroupEdit editedItem={editedItem} handleClose={handleClose} open={open} />
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
        sx={{ px: 2 }}
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

export default Group;