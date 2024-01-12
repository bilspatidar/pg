import React, { useState, useEffect, useRef } from 'react';

import { styled, Box, Tab, FormControl, InputLabel, Select, MenuItem, Icon } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import TabContext from '@mui/lab/TabContext';
import { Span } from "app/components/Typography";
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Grid, Card, CardContent, Typography, Checkbox, TextField, Button, FormControlLabel, } from '@mui/material'; // Import Material UI components
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import ArticleIcon from '@mui/icons-material/Article';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import FileCopyIcon from '@mui/icons-material/FileCopy';


const Container = styled('div')(({ theme }) => ({
    margin: '20px',
    // marginLeft: '20px',
    [theme.breakpoints.down('sm')]: { margin: '10px' },
    '& .breadcrumb': {
        marginBottom: '0px',
        [theme.breakpoints.down('sm')]: { marginBottom: '10px' }
    }
}));


const MemberProfile = () => {
    const [checked, setChecked] = useState(false); // State for the checkbox
    const urlRef = useRef();

    const [value, setValue] = React.useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const [copySuccess, setCopySuccess] = useState(false);

    const handleCopyToClipboard = (textToCopy) => {
        navigator.clipboard.writeText(textToCopy).then(() => {
          setCopySuccess(true);
          if (urlRef.current) {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(urlRef.current);
            selection.removeAllRanges();
            selection.addRange(range);
          }
          setTimeout(() => {
            setCopySuccess(false);
          }, 1500); // Reset the copied message after 1.5 seconds
        }).catch((err) => {
          console.error('Failed to copy: ', err);
          setCopySuccess(false);
        });
      };
    return (
        <Container className="analytics">


            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Member Profile', path: '/Member/MemberProfile ' },
                ]} />
            </Box>
            <Container>
                <SimpleCard title="">
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Personal" value="1" icon={<PermContactCalendarIcon />} />
                                <Tab label="kyc details" value="2" icon={<ArticleIcon />} />
                                <Tab label="Authorize URL" value="3" icon={<LibraryBooksIcon />} />
                                <Tab label="Api Details" value="4" icon={<LibraryBooksIcon />} />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <div>
                                <Typography variant="h5" style={{ color: '#3F51B5' }}>Personal Info</Typography>

                                <Grid container spacing={3}>
                                    {/* Live Photo */}
                                    <Grid item xs={12} md={6}>
                                        <Card elevation={3}> {/* Add elevation for a shadow effect */}
                                            <CardContent>
                                                <Typography variant="h5" align="center">Live Photo</Typography>
                                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                                    <img src="https://centpays.com/uploads/no_file.jpg" alt="Live" style={{ width: '200px' }} />
                                                </div>
                                                <Typography variant="subtitle1" align="center" style={{ color: 'red', marginTop: '10px' }}>Not Verified</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>

                                </Grid>

                                <br />
                                <Grid container spacing={2}>

                                    <Grid item xs={6}>
                                        <Typography>
                                            <b>First Name</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Ranjeet
                                        </Typography>

                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <b>Last Name</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Patidar
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <b>Skype ID</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" style={{ color: '#3F51B5' }}>Company Information ( Permanent)</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <b>Company Name</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;microshoft technology
                                        </Typography>

                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <b>Username</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bilspatidar
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <b>Email</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;bilspatidar@gmail.com
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <b>Phone Number</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7000890003
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <b>Postal code</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;458001
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <b>Country</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;India
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <b>State</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Madhya Pradesh
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <b>City</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mandsaur
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <b>Street Address</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Chavni indore
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <b>Street Address2</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Aisxbank
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="h5" style={{ color: '#3F51B5' }}>Business Information( Permanent)</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <b>Website URL</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;centpays.com,sparkhub.in,kfc-mart.in
                                        </Typography>

                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <b>Industry</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Industry
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <b>Business Type</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sole Proprietorship
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <b>Business Category</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Retailer
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <b>Business Sub Category</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Vehicles and Fuel
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <b>Business Registered</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2022-07-02
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <b>Maximum Ticket size</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <b>Turnover</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Turnover
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <b>Expected CB percentage</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;%
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>
                                            <b>Processing Currency</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Processing Currency
                                        </Typography>
                                    </Grid>


                                </Grid>

                            </div>

                        </TabPanel>
                        <TabPanel value="2">
                            <div>
                                <Typography variant="h5" style={{ color: '#3F51B5' }} >Kyc Details</Typography>
                                <br />
                                <Typography variant="p" style={{ color: '#232a44' }}><b>Please Upload Clear Scanned File</b></Typography>
                                <div style={{ marginTop: '15px', border: '1px solid #dcdcdc', padding: '10px' }}>
                                    <Typography variant="h6" style={{ color: '#232a44' }} >Other</Typography>
                                    <input type="hidden" name="type_id[]" value="4" />

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={3}>
                                            <FormControlLabel
                                                control={<Checkbox name="document_id[4][]" value="14" />}
                                                label="Supporting Documents"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4} id="profile">
                                            <TextField
                                                type="file"
                                                name="document_file[4][14]"
                                                label="Document File"
                                                variant="outlined"
                                                fullWidth
                                                size='small'
                                                margin="normal"
                                            />
                                            <TextField
                                                type="file"
                                                name="document_file_back[4][14]"
                                                label="Document File Back"
                                                variant="outlined"
                                                fullWidth
                                                size='small'
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <TextField
                                                type="text"
                                                name="document_number[4][]"
                                                label="Document Number"
                                                placeholder="Document Number"
                                                variant="outlined"
                                                fullWidth
                                                size='small'
                                                margin="normal"
                                                value=""
                                                InputProps={{
                                                    inputProps: {
                                                        minLength: 1,
                                                        maxLength: 1,
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <FormControlLabel
                                                control={<Checkbox name="isVerified[4][]" value="1" />}
                                                label="Verified"
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div style={{ marginTop: '15px', border: '1px solid #dcdcdc', padding: '10px' }}>
                                    <Typography variant="h6" style={{ color: '#232a44' }} >Certificate of Incorporation</Typography>

                                    <input type="hidden" name="type_id[]" value="6" />

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={3}>
                                            <FormControlLabel
                                                control={<Checkbox name="document_id[6][]" value="7" />}
                                                label="Certificate of Incorporation"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4} id="profile">
                                            <TextField
                                                type="file"
                                                name="document_file[6][7]"
                                                label="Document File"
                                                variant="outlined"
                                                size='small'
                                                fullWidth
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <TextField
                                                type="text"
                                                size='small'
                                                name="document_number[6][]"
                                                label="Document Number"
                                                placeholder="Document Number"
                                                variant="outlined"
                                                fullWidth
                                                margin="normal"
                                                value=""
                                                InputProps={{
                                                    inputProps: {
                                                        minLength: 1,
                                                        maxLength: 1,
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <FormControlLabel
                                                control={<Checkbox name="isVerified[6][]" value="1" />}
                                                label="Verified"
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div style={{ marginTop: '15px', border: '1px solid #dcdcdc', padding: '10px' }}>
                                    <Typography variant="h6" style={{ color: '#232a44' }} >Memorandum and Articles of Association</Typography>

                                    <input type="hidden" name="type_id[]" value="7" />

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={3}>
                                            <FormControlLabel
                                                control={<Checkbox name="document_id[7][]" value="6" />}
                                                label="Memorandum and Articles of Association"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4} id="profile">
                                            <TextField
                                                type="file"
                                                name="document_file[7][6]"
                                                label="Document File"
                                                variant="outlined"
                                                fullWidth
                                                size='small'
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <TextField
                                                type="text"
                                                name="document_number[7][]"
                                                label="Document Number"
                                                placeholder="Document Number"
                                                variant="outlined"
                                                fullWidth
                                                margin="normal"
                                                size='small'
                                                value=""
                                                InputProps={{
                                                    inputProps: {
                                                        minLength: 2,
                                                        maxLength: 2,
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <FormControlLabel
                                                control={<Checkbox name="isVerified[7][]" value="1" />}
                                                label="Verified"
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div style={{ marginTop: '15px', border: '1px solid #dcdcdc', padding: '10px' }}>
                                    <Typography variant="h6" style={{ color: '#232a44' }} >Processing history of last 6 months</Typography>


                                    <input type="hidden" name="type_id[]" value="8" />

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={3}>
                                            <FormControlLabel
                                                control={<Checkbox name="document_id[8][]" value="8" />}
                                                label="Processing History"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4} id="profile">
                                            <TextField
                                                type="file"
                                                name="document_file[8][8]"
                                                label="Document File"
                                                size='small'
                                                variant="outlined"
                                                fullWidth
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <TextField
                                                type="text"
                                                name="document_number[8][]"
                                                label="Document Number"
                                                placeholder="Document Number"
                                                variant="outlined"
                                                size='small'
                                                fullWidth
                                                margin="normal"
                                                value=""
                                                InputProps={{
                                                    inputProps: {
                                                        minLength: 3,
                                                        maxLength: 3,
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <FormControlLabel
                                                control={<Checkbox name="isVerified[8][]" value="1" />}
                                                label="Verified"
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div style={{ marginTop: '15px', border: '1px solid #dcdcdc', padding: '10px' }}>
                                    <Typography variant="h6" style={{ color: '#232a44' }} >Utility Bill of Business</Typography>

                                    <input type="hidden" name="type_id[]" value="9" />

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={3}>
                                            <FormControlLabel
                                                control={<Checkbox name="document_id[9][]" value="9" />}
                                                label="Utility Bill"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4} id="profile">
                                            <TextField
                                                type="file"
                                                name="document_file[9][9]"
                                                label="Document File"
                                                size='small'
                                                variant="outlined"
                                                fullWidth
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <TextField
                                                type="text"
                                                name="document_number[9][]"
                                                label="Document Number"
                                                placeholder="Document Number"
                                                variant="outlined"
                                                size='small'
                                                fullWidth
                                                margin="normal"
                                                value=""
                                                InputProps={{
                                                    inputProps: {
                                                        minLength: 4,
                                                        maxLength: 4,
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <FormControlLabel
                                                control={<Checkbox name="isVerified[9][]" value="1" />}
                                                label="Verified"
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div style={{ marginTop: '15px', border: '1px solid #dcdcdc', padding: '10px' }}>
                                    <Typography variant="h6" style={{ color: '#232a44' }} >Director and Shareholder Registry</Typography>

                                    <input type="hidden" name="type_id[]" value="10" />

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={3}>
                                            <FormControlLabel
                                                control={<Checkbox name="document_id[10][]" value="10" />}
                                                label="Registry"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4} id="profile">
                                            <TextField
                                                type="file"
                                                name="document_file[10][10]"
                                                label="Document File"
                                                variant="outlined"
                                                size='small'
                                                fullWidth
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <TextField
                                                type="text"
                                                name="document_number[10][]"
                                                label="Document Number"
                                                placeholder="Document Number"
                                                size='small'
                                                variant="outlined"
                                                fullWidth
                                                margin="normal"
                                                value=""
                                                InputProps={{
                                                    inputProps: {
                                                        minLength: 5,
                                                        maxLength: 5,
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <FormControlLabel
                                                control={<Checkbox name="isVerified[10][]" value="1" />}
                                                label="Verified"
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div style={{ marginTop: '15px', border: '1px solid #dcdcdc', padding: '10px' }}>
                                    <Typography variant="h6" style={{ color: '#232a44' }} >Contact phone number, Business email addresses of all directors and authorised personnel</Typography>

                                    <input type="hidden" name="type_id[]" value="12" />

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={3}>
                                            <FormControlLabel
                                                control={<Checkbox name="document_id[12][]" value="11" />}
                                                label="Contact and Business email"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4} id="profile">
                                            <TextField
                                                type="file"
                                                name="document_file[12][11]"
                                                label="Document File"
                                                variant="outlined"
                                                size='small'
                                                fullWidth
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <TextField
                                                type="text"
                                                name="document_number[12][]"
                                                label="Document Number"
                                                placeholder="Document Number"
                                                size='small'
                                                variant="outlined"
                                                fullWidth
                                                margin="normal"
                                                value=""
                                                InputProps={{
                                                    inputProps: {
                                                        minLength: 6,
                                                        maxLength: 6,
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <FormControlLabel
                                                control={<Checkbox name="isVerified[12][]" value="1" />}
                                                label="Verified"
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div style={{ marginTop: '15px', border: '1px solid #dcdcdc', padding: '10px' }}>
                                    <Typography variant="h5" style={{ color: '#232a44' }} >Director Passport</Typography>
                                    <input type="hidden" name="type_id[]" value="14" />

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} md={3}>
                                            <FormControlLabel
                                                control={<Checkbox name="document_id[14][]" value="12" />}
                                                label="Director Passport"
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4}>
                                            <TextField
                                                type="file"
                                                name="document_file[14][12]"
                                                label="Document File"
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                margin="normal"
                                                InputLabelProps={{ shrink: true }}
                                            />

                                            <TextField
                                                type="file"
                                                name="document_file_back[14][12]"
                                                label="Document File Back"
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                margin="normal"
                                                InputLabelProps={{ shrink: true }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <TextField
                                                type="text"
                                                name="document_number[15][]"
                                                label="Document Number"
                                                placeholder="Document Number"
                                                variant="outlined"
                                                size='small'
                                                fullWidth
                                                margin="normal"
                                                value=""
                                                InputProps={{
                                                    inputProps: {
                                                        minLength: 1,
                                                        maxLength: 1,
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <FormControlLabel
                                                control={<Checkbox name="isVerified[14][]" value="1" />}
                                                label="Verified"
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div style={{ marginTop: '10px', border: '1px solid #dcdcdc', padding: '10px' }}>

                                    <Typography variant="h6" style={{ color: '#232a44' }} >Utility Bill of Director</Typography>

                                    <input type="hidden" name="type_id[]" value="15" />

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={3}>
                                            <FormControlLabel
                                                control={<Checkbox name="document_id[15][]" value="13" />}
                                                label="Utility Bill"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4} id="profile">
                                            <TextField
                                                type="file"
                                                name="document_file[12][11]"
                                                label="Document File"
                                                variant="outlined"
                                                size='small'
                                                fullWidth
                                                margin="normal"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <TextField
                                                type="text"
                                                name="document_number[15][]"
                                                label="Document Number"
                                                placeholder="Document Number"
                                                variant="outlined"
                                                size='small'
                                                fullWidth
                                                margin="normal"
                                                value=""
                                                InputProps={{
                                                    inputProps: {
                                                        minLength: 1,
                                                        maxLength: 1,
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <FormControlLabel
                                                control={<Checkbox name="isVerified[15][]" value="1" />}
                                                label="Verified"
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div style={{ marginTop: '10px' }}>
                                    <Grid container spacing={5}>



                                        <Grid item lg={4} md={4} sm={12} xs={12} sx={{ mt: 1 }}>
                                            <FormControl size="small" fullWidth>
                                                <InputLabel>Kyc Status</InputLabel>
                                                <Select
                                                    name="status"
                                                //   onChange={handleChange}
                                                //   value={formData.status}
                                                >
                                                    <MenuItem value="Success">Success</MenuItem>
                                                    <MenuItem value="Pending">Pending</MenuItem>
                                                    <MenuItem value="Reject">Reject</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>

                                </div>
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
                            </div>

                        </TabPanel>
                        <TabPanel value="3">




                            <ValidatorForm onError={() => null} data-form-identifier="add_form">
                                <Grid container spacing={3}>
                                    <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 1 }}>
                                        <TextField fullWidth
                                            type="text"
                                            name="name"
                                            label="Authorize URL"
                                            size="small"
                                            // onChange={handleChange}
                                            // value={formData.name}
                                            validators={["required"]}
                                            errorMessages={["this field is required"]}
                                        />
                                    </Grid>

                                </Grid>

                                <Button style={{ marginTop: 30 }} color="primary" variant="contained"
                                    type="submit">
                                    <Icon>send</Icon>
                                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
                                </Button>
                            </ValidatorForm>



                        </TabPanel>


                        <TabPanel value="4">
                            <Typography variant="h5" style={{ color: '#3F51B5' }} >Live Credential</Typography>
                            <br />
                            <Grid container spacing={2}>

                                <Grid item xs={2}>
                                    <Typography >
                                        <b>Live API:*</b>
                                    </Typography>
                                </Grid>

                                <Grid item md={7}>
                                    <TextField fullWidth
                                        ref={urlRef}

                                        id="live-api"
                                        name="live_api"
                                        size='small'
                                        value='live_$2y$10$Ztzkrh1KGayF5jZN350xEeM2OV/n2hqBJFOSaismDznWxb9mO1B9a'
                                        variant="outlined"

                                        readOnly
                                    />


                                </Grid>

                                <Grid item md={1}>
                                    <Button
                                    style={{
                                      
                                        backgroundColor: '#0d6efd',
                                        color: 'white',
                                    }}
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleCopyToClipboard('live_$2y$10$Ztzkrh1KGayF5jZN350xEeM2OV/n2hqBJFOSaismDznWxb9mO1B9a')}
                                        startIcon={<FileCopyIcon />}
                                    >
                                        {copySuccess ? 'Copied!' : 'Copy'}
                                    </Button>
                                </Grid>

                            </Grid>
                            <br />
                            <Grid container spacing={2}>

                                <Grid item xs={2}>
                                    <Typography >
                                        <b>Live Secret:*</b>
                                    </Typography>
                                </Grid>

                                <Grid item md={7}>
                                    <TextField fullWidth
                                        ref={urlRef}

                                        id="live-api"
                                        name="live_api"
                                        size='small'
                                        value='live_$2y$10$Ztzkrh1KGayF5jZN350xEeM2OV/n2hqBJFOSaismDznWxb9mO1B9a'
                                        variant="outlined"

                                        readOnly
                                    />


                                </Grid>

                                <Grid item md={1}>
                                    <Button
                                    style={{
                                        
                                        backgroundColor: '#198754',
                                        color: '#fff',
                                    }}
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleCopyToClipboard()}

                                        startIcon={<FileCopyIcon />}
                                    >
                                        {copySuccess ? 'Copied!' : 'Copy'}
                                    </Button>
                                </Grid>
                                <Grid item md={2}>
                                    <Button
                                        style={{
                                            marginLeft: 10,
                                            backgroundColor: '#ffc107',
                                            color: 'black',
                                        }}

                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        size="small"
                                    >
                                        <Icon>send</Icon>
                                        <Span sx={{ pl: 1, textTransform: "capitalize" }}>Regenerate</Span>
                                    </Button>
                                </Grid>

                            </Grid>
                            <br />
                            <Typography variant="h5" style={{ color: '#3F51B5' }} >Test Credential</Typography>
                            <br />
                            <Grid container spacing={2}>

                                <Grid item xs={2}>
                                    <Typography >
                                        <b>Test API:*</b>
                                    </Typography>
                                </Grid>

                                <Grid item md={7}>
                                    <TextField fullWidth
                                        ref={urlRef}

                                        id="live-api"
                                        name="live_api"
                                        size='small'
                                        value='live_$2y$10$Ztzkrh1KGayF5jZN350xEeM2OV/n2hqBJFOSaismDznWxb9mO1B9a'
                                        variant="outlined"

                                        readOnly
                                    />


                                </Grid>

                                <Grid item md={1}>
                                    <Button
                                    style={{
                                       
                                        backgroundColor: '#0d6efd',
                                        color: '#fff',
                                    }}
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleCopyToClipboard()}

                                        startIcon={<FileCopyIcon />}
                                    >
                                        {copySuccess ? 'Copied!' : 'Copy'}
                                    </Button>
                                </Grid>

                            </Grid>
                            <br />
                            <Grid container spacing={2}>

                                <Grid item xs={2}>
                                    <Typography >
                                        <b>Test Secret:*</b>
                                    </Typography>
                                </Grid>

                                <Grid item md={7}>
                                    <TextField fullWidth
                                        ref={urlRef}

                                        id="live-api"
                                        name="live_api"
                                        size='small'
                                        value='live_$2y$10$Ztzkrh1KGayF5jZN350xEeM2OV/n2hqBJFOSaismDznWxb9mO1B9a'
                                        variant="outlined"

                                        readOnly
                                    />


                                </Grid>

                                <Grid item md={1}>
                                    <Button
                                    style={{
                                       
                                        backgroundColor: '#198754',
                                        color: '#fff',
                                    }}
                                        variant="contained"
                                        color="primary"
                                        size="small"
                                        onClick={() => handleCopyToClipboard()}

                                        startIcon={<FileCopyIcon />}
                                    >
                                        {copySuccess ? 'Copied!' : 'Copy'}
                                    </Button>
                                </Grid>
                                <Grid item md={2}>
                                    <Button
                                        style={{
                                            marginLeft: 10,
                                            backgroundColor: '#ffc107',
                                            color: 'black',
                                        }}

                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        size="small"
                                    >
                                        <Icon>send</Icon>
                                        <Span sx={{ pl: 1, textTransform: "capitalize" }}>Regenerate</Span>
                                    </Button>
                                </Grid>

                            </Grid>
                        </TabPanel>
                    </TabContext>

                </SimpleCard>
            </Container>
        </Container>
    )
}

export default MemberProfile