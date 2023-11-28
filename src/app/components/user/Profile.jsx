import React, { useState } from 'react'
import './style2.css';
import AppBar from '@mui/material/AppBar';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Breadcrumb } from 'app/components';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import { FavoriteBorderOutlined, Reply } from '@mui/icons-material';

import {
  Box, styled, TextField,
  Toolbar,
  CardHeader,
  IconButton,
  TextareaAutosize,
  MenuItem,
  Grid,
  CardActions,
  Menu,
  LinearProgress,

} from '@mui/material';
import { Link } from 'react-router-dom';
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


const useStyles = makeStyles((theme) => ({
  progressContainer: {
    marginBottom: theme.spacing(2),
  },
  progressBar: {
    height: 10,
  },
  card: {
    marginBottom: theme.spacing(2),
    marginTop: '30px',
    backgroundColor: '#E7ECEF',
  },
  header: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  headerText: {
    fontSize: '1.0rem',
    fontWeight: '400',
  },
  cardContent: {
    padding: theme.spacing(2),
  },
  statTitle: {
    fontSize: '1.2rem',
    fontWeight: '400',
    color: '#7f90a4'
  },

  statText: {
    fontSize: '1rem',
    color: '#609bd1',
  },
  greyText: {
    color: theme.palette.grey[600],
  },
}));


function Profile() {
  const classes = useStyles();

  const blueColorStyle = {
    color: '#6eb5e1', // Set the color to blue
  };
  const greyColorStyle = {
    color: '#6f6d6d', // Set the color to blue
  };
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [activeTab, setActiveTab] = useState("tab1")

  const handleTabClick = (tabId) => {
    console.log(tabId)
    setActiveTab(tabId)
  }

  const buttonStyle = {
    margin: '0 10px',
    borderRadius: '30%',
    boxShadow: '0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 1px #00c0ef'




  };
  const buttonStyle1 = {
    margin: '0 10px',
    borderRadius: '30%',
    boxShadow: '0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 1px #00c0ef',
    backgroundColor:'#188ae2'



  };
  const buttonStyle2 = {
    margin: '0 10px',
    borderRadius: '30%',
    boxShadow: '0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 1px #00c0ef',
    backgroundColor:'#ff4081'



  };
  return (
    <>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb routeSegments={[{ name: 'Profile', path: '/user/profile' },
          { name: 'Form' }]} />
        </Box>
       
        </Container>

       
          <Typography sx={{ marginLeft: '100px' }} variant="h4">User Profile</Typography>
     

     
      <Container style={{ marginLeft: '20px' }} className="container-fluid" >

        <div className="profile-sidebar">
          <div className="card card-topline-aqua">
            <div className="card-body no-padding height-9">
              <div className="row">
                <div className="profile-userpic">
                  <img src="/assets/images/faces/2.jpg" className="img-responsive" alt="Image Description" />


                </div>
              </div>
              <div className="profile-usertitle">
                <div className="profile-usertitle-name">John Deo</div>
                <div className="profile-usertitle-job">Jr. Professor</div>
              </div>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    <b>Followers</b>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" align="right" style={blueColorStyle}>
                    1,200
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    <b>Following</b>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" align="right" style={blueColorStyle}>
                    750
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    <b>Friends</b>
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body1" align="right" style={blueColorStyle}>
                    11,172
                  </Typography>
                </Grid>
              </Grid>
              <div className="profile-userbuttons">
                <Button variant="contained" color="primary" style={buttonStyle1}>
                  Follow
                </Button>
                <Button variant="contained" color="primary" style={buttonStyle2}>
                  Message
                </Button>
              </div>
            </div>
          </div>
          <Card className={classes.card}>
            <CardHeader style={{ borderTop: '3px solid #00c0ef' }}
              className={classes.header}
              title="About Me"

              classes={{
                title: classes.headerText,
              }}
            />
            <CardContent className={classes.cardContent}>
              <Typography variant="body1">
                Hello, I am John Deo, a Professor in xyz College Surat. I love to work with all my college staff and senior professors.
              </Typography>
              <hr />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <b>Gender</b>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="right" className={classes.greyText}>
                    Female
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <b>Operation Done</b>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="right" className={classes.greyText}>
                    30+
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <b>Degree</b>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="right" className={classes.greyText}>
                    B.A., M.A., P.H.D.
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    <b>Designation</b>
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1" align="right" className={classes.greyText}>
                    Jr. Professor
                  </Typography>
                </Grid>
              </Grid>
              <hr />

              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <div className={classes.statTitle}>37</div>
                  <div className={classes.statText}>Projects</div>
                </Grid>
                <Grid item xs={4}>
                  <div className={classes.statTitle}>51</div>
                  <div className={classes.statText}>Tasks</div>
                </Grid>
                <Grid item xs={4}>
                  <div className={classes.statTitle}>61</div>
                  <div className={classes.statText}>Uploads</div>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card style={{ marginTop: '30px', backgroundColor: '#E7ECEF' }}>
            <CardHeader style={{ borderTop: '3px solid #00c0ef' }}
              className={classes.header}
              title="Address"

              classes={{
                title: classes.headerText,
              }}
            />

            <CardContent>
              <div className="row text-center m-t-10">
                <div className="col-md-12">
                  <Typography variant="body1">
                    456, Pragri flat, varacha road, Surat<br />Gujarat, India.
                  </Typography>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card style={{ marginTop: '30px', backgroundColor: '#E7ECEF' }}>
            <CardHeader style={{ borderTop: '3px solid #00c0ef' }}
              className={classes.header}
              title="Work Expertise"

              classes={{
                title: classes.headerText,
              }}
            />

            <CardContent>
              <div className={classes.progressContainer}>
                <div className="states">
                  <div className="info">
                    <Typography variant="body1" className="desc pull-left">
                      Java
                    </Typography>
                    <Typography variant="body1" className="percent pull-right">
                      75%
                    </Typography>
                  </div>
                  <LinearProgress
                    className={classes.progressBar}
                    variant="determinate"
                    value={75}
                    color="error"
                  />
                </div>
                <div className="states">
                  <div className="info">
                    <Typography variant="body1" className="desc pull-left">
                      Php
                    </Typography>
                    <Typography variant="body1" className="percent pull-right">
                      40%
                    </Typography>
                  </div>
                  <LinearProgress
                    className={classes.progressBar}
                    variant="determinate"
                    value={40}
                    color="success"
                  />
                </div>
                <div className="states">
                  <div className="info">
                    <Typography variant="body1" className="desc pull-left">
                      Android
                    </Typography>
                    <Typography variant="body1" className="percent pull-right">
                      60%
                    </Typography>
                  </div>
                  <LinearProgress
                    className={classes.progressBar}
                    variant="determinate"
                    value={60}
                    color="info"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>


        <div className="profile-content card-topline-aqua">
          <div className="row ">
            <div className="profile-tab-box">
              <div className="p-l-20 ">

                <Button style={buttonStyle}
                  variant={activeTab === 'tab1' ? 'contained' : 'outlined'}
                  color="primary"
                  size="small"
                  onClick={() => handleTabClick('tab1')}
                >
                  About 
                </Button>
                <Button style={buttonStyle}
                  variant={activeTab === 'tab2' ? 'contained' : 'outlined'}
                  color="primary"
                  size="small"
                  onClick={() => handleTabClick('tab2')}
                >
                  Activity
                </Button>
                <Button style={buttonStyle}
                  variant={activeTab === 'tab3' ? 'contained' : 'outlined'}
                  color="primary"
                  size="small"
                  onClick={() => handleTabClick('tab3')}
                >
                  Settings
                </Button>


              </div>
            </div>
            <div className="white-box card card-topline-aqua1">

              <div className="tab-content">
                {
                  activeTab === "tab1" && <div className={`tab-pane fontawesome-demo ${activeTab === 'tab1' ? 'active' : ''}`} id="tab1">
                    <div id="biography">
                     
                        <Grid container spacing={2}>
                          <Grid item md={3} xs={6}>
                            <div className="b-r">
                              <Typography variant="subtitle1">
                                <strong>Full Name</strong>
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                John Deo
                              </Typography>
                            </div>
                          </Grid>
                          <Grid item md={3} xs={6}>
                            <div className="b-r">
                              <Typography variant="subtitle1">
                                <strong>Mobile</strong>
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                (123) 456 7890
                              </Typography>
                            </div>
                          </Grid>
                          <Grid item md={3} xs={6}>
                            <div className="b-r">
                              <Typography variant="subtitle1">
                                <strong>Email</strong>
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                johndeo@example.com
                              </Typography>
                            </div>
                          </Grid>
                          <Grid item md={3} xs={6}>
                            <div>
                              <Typography variant="subtitle1">
                                <strong>Location</strong>
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                India
                              </Typography>
                            </div>
                          </Grid>
                        </Grid>



                        <Divider sx={{ margin: '10px 0' }} />
                        <Typography variant="body1" sx={{ mt: 3 }}>
                          <strong>Completed my graduation in Arts</strong> from the well-known and renowned institution of India - SARDAR PATEL ARTS COLLEGE, BARODA in 2000-01, which was affiliated to M.S. University. I ranked in University exams from the same university from 1996-01.
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                          <strong>Worked as Professor and Head of the department</strong> at Sarda College, Rajkot, Gujarat from 2003-2015.
                        </Typography>
                        <Typography variant="body1" sx={{ mt: 2 }}>
                          <strong>Lorem Ipsum is simply dummy text</strong> of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries but also the leap into electronic typesetting, remaining essentially unchanged.
                        </Typography>
                        <Typography variant="h5" sx={{ mt: 4, fontWeight: 'bold' }}>
                          Education
                        </Typography>
                        <Divider sx={{ margin: '16px 0' }} />
                        <List sx={{ mt: 2 }}>
                          <ListItem>B.A., Gujarat University, Ahmedabad, India.</ListItem>
                          <ListItem>M.A., Gujarat University, Ahmedabad, India.</ListItem>
                          <ListItem>P.H.D., Shaurashtra University, Rajkot</ListItem>
                        </List>
                        <Typography variant="h5" sx={{ mt: 4, fontWeight: 'bold' }}>
                          Experience
                        </Typography>
                        <Divider sx={{ margin: '16px 0' }} />
                        <List sx={{ mt: 2 }}>
                          <ListItem>One year experience as Jr. Professor from April-2009 to March-2010 at B. J. Arts College, Ahmedabad.</ListItem>
                          <ListItem>Three-year experience as Jr. Professor at V.S. Arts & Commerce College from April - 2008 to April - 2011.</ListItem>
                          <ListItem>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</ListItem>
                          <ListItem>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</ListItem>
                          <ListItem>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</ListItem>
                          <ListItem>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</ListItem>
                        </List>
                        <Typography variant="h5" sx={{ mt: 4, fontWeight: 'bold' }}>
                          Conferences, Courses & Workshops Attended
                        </Typography>
                        <Divider sx={{ margin: '16px 0' }} />
                        <List sx={{ mt: 2 }}>
                          <ListItem>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</ListItem>
                          <ListItem>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</ListItem>
                          <ListItem>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</ListItem>
                          <ListItem>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</ListItem>
                          <ListItem>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</ListItem>
                          <ListItem>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</ListItem>
                          <ListItem>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</ListItem>
                        </List>
                    
                    </div>
                  </div>
                }

                {
                  activeTab === "tab2" && (

                    <div className={`tab-pane ${activeTab === 'tab2' ? 'active' : ''}`} id="tab2">
                      <div className="tab-pane" id="tab2">
                        <div className="container-fluid">
                          <div className="row">
                            <Container>
                              <div className="full-width p-l-20">
                                <div className="panel">
                                  <form>
                                    <TextareaAutosize
                                      className="form-control p-text-area"
                                      minRows={3}
                                      maxRows={3}
                                      placeholder="What's in your mind today?"
                                    />

                                  </form>

                                  <footer className="panel-footer" style={{ marginTop: '10px' }}>
                                    <Button size="small" variant="contained" color="primary"
                                      className="pull-right">
                                      Post
                                    </Button>
                                  </footer>
                                </div>
                              </div>
                            </Container>
                            <div className="full-width p-l-20">
                              <List className="activity-list">
                                <ListItem alignItems="flex-start">
                                  <ListItemAvatar>
                                    <Avatar src="/assets/images/faces/9.jpg" alt="Rajesh" />
                                  </ListItemAvatar>
                                  <div className="activity-desk">
                                    <Typography variant="h6">
                                      <a href="#">Rajesh</a> <span>Uploaded 3 new photos</span>
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                      7 minutes ago near Alaska, USA
                                    </Typography>
                                    <div className="album">
                                      <a href="#">
                                        <img src="/assets/images/faces/12.jpg" alt="Image 1" />
                                      </a>
                                      <a href="#">
                                        <img src="/assets/images/faces/16.jpg" alt="Image 2" />
                                      </a>
                                      <a href="#">
                                        <img src="/assets/images/faces/17.jpg" alt="Image 3" />
                                      </a>
                                    </div>
                                  </div>
                                </ListItem>
                                <Divider />
                                <ListItem alignItems="flex-start">
                                  <ListItemAvatar>
                                    <Avatar src="/assets/images/faces/3.jpg" alt="John Doe" />
                                  </ListItemAvatar>
                                  <div className="activity-desk">
                                    <Typography variant="h6">
                                      <a href="#">John Doe</a> <span>attended a meeting with</span>
                                      <a href="#">Lina Smith.</a>
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                      2 days ago near Alaska, USA
                                    </Typography>
                                  </div>
                                </ListItem>
                                <Divider />
                                <ListItem alignItems="flex-start">
                                  <ListItemAvatar>
                                    <Avatar src="/assets/images/faces/4.jpg" alt="Kehn Anderson" />
                                  </ListItemAvatar>
                                  <div className="activity-desk">
                                    <Typography variant="h6">
                                      <a href="#">Kehn Anderson</a>
                                      <span>completed the task "wireframe design" within the deadline</span>
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                      4 days ago near Alaska, USA
                                    </Typography>
                                  </div>
                                </ListItem>
                                <Divider />
                                <ListItem alignItems="flex-start">
                                  <ListItemAvatar>
                                    <Avatar src="/assets/images/faces/5.jpg" alt="Jacob Ryan" />
                                  </ListItemAvatar>
                                  <div className="activity-desk">
                                    <Typography variant="h6">
                                      <a href="#">Jacob Ryan</a> <span>was absent from the office due to sickness</span>
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                      4 days ago near Alaska, USA
                                    </Typography>
                                  </div>
                                </ListItem>
                              </List>


                              <CardContent>
                                <Typography variant="subtitle2" color="textSecondary">
                                  <i className="fa fa-clock-o" aria-hidden="true"></i> 13 minutes ago
                                </Typography>
                                <div className="post-img">
                                  <img
                                    src="assets/img/slider/fullimage1.jpg"
                                    className="img-responsive"
                                    alt=""
                                  />
                                </div>
                                <Typography variant="h6">Lorem Ipsum is simply dummy text of the printing</Typography>
                                <Typography>
                                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button
                                  variant="contained"
                                  size="small"
                                  style={{ backgroundColor: '#e7ecef', color: 'red' }}

                                  startIcon={<FavoriteBorderOutlined />}
                                >
                                  Like (5)
                                </Button>
                                <Button
                                  variant="contained"
                                  className="bg-soundcloud"
                                  size="small"
                                  startIcon={<Reply />}
                                >
                                  Reply
                                </Button>
                              </CardActions>



                              <CardContent>
                                <Typography variant="subtitle2" color="textSecondary">
                                  <i className="fa fa-clock-o" aria-hidden="true"></i> 13 minutes ago
                                </Typography>
                                <div className="post-img">
                                  <img
                                    src="assets/img/slider/fullimage1.jpg"
                                    className="img-responsive"
                                    alt=""
                                  />
                                </div>
                                <Typography variant="h6">Lorem Ipsum is simply dummy text of the printing</Typography>
                                <Typography>
                                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button
                                  variant="contained"
                                  size="small"
                                  style={{ backgroundColor: '#e7ecef', color: 'red' }}

                                  startIcon={<FavoriteBorderOutlined />}
                                >
                                  Like (5)
                                </Button>
                                <Button
                                  variant="contained"
                                  className="bg-soundcloud"
                                  startIcon={<Reply />}
                                  size="small"
                                >
                                  Reply
                                </Button>
                              </CardActions>



                              <CardContent>
                                <Typography variant="subtitle2" color="textSecondary">
                                  <i className="fa fa-clock-o" aria-hidden="true"></i> 13 minutes ago
                                </Typography>
                                <div className="post-img">
                                  <img
                                    src="assets/img/slider/fullimage1.jpg"
                                    className="img-responsive"
                                    alt=""
                                  />
                                </div>
                                <Typography variant="h6">Lorem Ipsum is simply dummy text of the printing</Typography>
                                <Typography>
                                  Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                </Typography>
                              </CardContent>
                              <CardActions>
                                <Button
                                  variant="contained"
                                  style={{ backgroundColor: '#e7ecef', color: 'red' }}
                                  startIcon={<FavoriteBorderOutlined />}
                                >
                                  Like (5)
                                </Button>
                                <Button
                                size="small"
                                  variant="contained"
                                  className="bg-soundcloud"
                                  startIcon={<Reply />}
                                >
                                  Reply
                                </Button>
                              </CardActions>
<hr/>
                              <div className="col-lg-12 p-t-20 text-center ">
                                <Button variant="contained" color="info" size="large">
                                  Load More
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }

                {
                  activeTab === "tab3" && (
                    <div className={`tab-pane ${activeTab === 'tab3' ? 'active' : ''}`} id="tab3">
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
                                    onClick={handleClick}
                                    color="inherit"
                                  >
                                    <MenuIcon />
                                  </IconButton>
                                  <Menu
                                    id="panel-button2"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                  >
                                    <MenuItem onClick={handleClose}>
                                      <i className="material-icons">assistant_photo</i>Action
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                      <i className="material-icons">print</i>Another action
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                      <i className="material-icons">favorite</i>Something else here
                                    </MenuItem>
                                  </Menu>
                                </Toolbar>
                              </AppBar>
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

                                  <Button style={{ margin: '10px' }} variant="contained" color="primary" type="submit">
                                    Submit
                                  </Button>
                                </form>
                              </Box>
                            </Container>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }




              </div>
            </div>
          </div>
        </div>



      </Container>
    </>
  )
}

export default Profile