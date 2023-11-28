import React, { useState } from 'react'
// import './style2.css';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Breadcrumb } from 'app/components';

import { Box, styled,TextField,
  Toolbar ,
  Card,
  IconButton ,
  MenuItem ,
  Button,
  Menu ,
  
  
 } from '@mui/material';
function Managepassword() {
  const [showForm, setShowForm] = useState(true);

    const Container = styled('div')(({ theme }) => ({
      margin: '30px',
      [theme.breakpoints.down('sm')]: { margin: '16px' },
      '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
      }
    }));
    
    const handleClick = (event) => {
      setShowForm(!showForm)
    };
  return (
    <Container>
        
        <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Manage password', path: '/Manage password' }, { name: 'Form' }]} />
      </Box>
    <Card>
    <div style={{minHeight: '70vh'}} className="row card-topline-aqua">
													<div className="col-md-12 col-sm-12  ">
    <Container>
    <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Password Change
          </Typography>
          <IconButton
            aria-label="more"
            aria-controls="panel-button2"
            aria-haspopup="true"
            onClick={handleClick}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          
        </Toolbar>
      </AppBar>
      {
        showForm && (
          <Box>
          <form>
            <TextField
              fullWidth
              id="simpleFormEmail"
              label="User Name"
              placeholder="Enter user name"
              variant="outlined"
             
              margin="normal"
            />
            <TextField
              fullWidth
              id="simpleFormPassword"
              label="Current Password"
              type="password"
            
              placeholder="Current Password"
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              id="newpassword"
              label="New Password"
              type="password"
              placeholder="New Password"
              variant="outlined"
              margin="normal"
            />
          
            <Button  style={{ margin: '10px' }} variant="contained" color="primary" type="submit">
              Submit
            </Button>
          </form>
        </Box>
        )
      }
    
      </Container>
	 
													</div>
												</div >
    </Card>
    </Container>
  );
}

export default Managepassword;
