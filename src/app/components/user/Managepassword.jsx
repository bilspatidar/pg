import React, { useState } from 'react';
import { BASE_URL } from '../../config';
import { Box,Menu,MenuItem, styled, TextField, Toolbar, Card, IconButton, Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import CustomSnackbar from '../CustomSnackbar';

import useAuth from 'app/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function Managepassword(handleClose) {
  const token = localStorage.getItem('accessToken');
  const [apiResponse, setApiResponse] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [errorMsg, setErrorMsg] = useState([]);
  const { logout } = useAuth();
  const [loading, setLoading] = useState(true);

  const history = useNavigate();
  const userData = localStorage.getItem('userData');
  const [activeTab, setActiveTab] = useState("tab1")

  const [formData, setFormData] = useState({
    old_password: '',
    new_password: '',
    confirmnew_password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    const endpoint = `${BASE_URL}/api/user/update_password/${userData}`;
    let em = [];


    try {
      const data = {
        // users_id: "713",
        old_password: formData.old_password,
        new_password: formData.new_password,
        confirmnew_password: formData.confirmnew_password,
       

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
        // geTableCellata();
        ///toast.success(responseData.message);
        console.log(responseData.message)
        setFormData(
          {
            old_password: '',
            new_password: '',
            confirmnew_password: '',
          }
        )
        let obj = { bgType: "success", message: `${responseData.message}` };

        em.push(obj);
      } else {


        const errorData = await res.json();
        //toast(errorData.message);
        let obj = { bgType: "error", message: `${errorData.message}` };

        em.push(obj);
        // bgtype = 'error';
        if (errorData.errors) {
          for (const key in errorData.errors) {
            if (errorData.errors.hasOwnProperty(key)) {
              let errorMessage = errorData.errors[key];

              // Check if error message is an array
              if (Array.isArray(errorMessage)) {
                errorMessage = errorMessage.join(', '); // Combine multiple error messages if it's an array
              }
              let obj = { bgType: "error", message: `${errorMessage}` };
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
  const [showForm, setShowForm] = useState(true);

  const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: { margin: '16px' },
    '& .breadcrumb': {
      marginBottom: '30px',
      [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
    }
  }));

  const handleClick = () => {
    setShowForm(!showForm);
  };

  return (
    <Container>
      <Box className="breadcrumb">
        {/* Breadcrumb component goes here */}
      </Box>
      <Card>
                      <div className="tab-pane" id="tab3">
                        <div className="row">
                          <div className="col-md-12 col-sm-12">
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
                                    // onClick={handleClick}
                                    color="inherit"
                                  >
                                    <MenuIcon />
                                  </IconButton>
                                  <Menu
                                    id="panel-button2"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    // onClose={handleClose}
                                  >
                                    {/* <MenuItem onClick={handleClose}>
                                      <i className="material-icons">assistant_photo</i>Action
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                      <i className="material-icons">print</i>Another action
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                      <i className="material-icons">favorite</i>Something else here
                                    </MenuItem> */}
                                  </Menu>
                                </Toolbar>
                              </AppBar>
                              <Box>
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
                              <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                                 
                                   <TextField
                  label="Old Password"
                  name='old_password'
                  type="text"
                  variant="outlined"
                  value={formData.old_password}
                  onChange={handleChange}
                 
                  margin="normal"
                  fullWidth
                
                />
                 <TextField
                  label="New Password"
                  name='new_password'
                  type="text"
                  variant="outlined"
                  value={formData.new_password}
                  onChange={handleChange}
                 
                  margin="normal"
                  fullWidth
                
                />
                <TextField
                  label="Confirm Password"
                  name='confirmnew_password'
                  type="text"
                  variant="outlined"
                  value={formData.confirmnew_password}
                  onChange={handleChange}
                 
                  margin="normal"
                  fullWidth
                
                />
                                 
                                  <Button style={{ margin: '10px' }} variant="contained" color="primary" type="submit">
                                    Submit
                                  </Button>
                                </ValidatorForm>
                              </Box>
                            </Container>
                          </div>
                        </div>
                      </div>
                
      </Card>
    </Container>
  );
}

export default Managepassword;
