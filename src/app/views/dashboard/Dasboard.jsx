import { styled, Box, Tab, Card } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import DashbaordCard from './DashbaordCard';
import React, { useRef, JWTAuthContext } from 'react'
import { BASE_URL } from '../../config';
import 'react-toastify/dist/ReactToastify.css';

import useAuth from 'app/hooks/useAuth';

import {
    Button,
    InputLabel,
    MenuItem,
    Grid,
    Icon,
   
    TextField,
    FormControl,
    Select,
    CardContent,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,


} from "@mui/material";
import { Span } from "app/components/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { ValidatorForm } from "react-material-ui-form-validator";
import BarChart from './BarChart';
import PieChart from './PieChart';

const Container = styled('div')(({ theme }) => ({
    margin: '20px',
    // marginLeft: '20px',
    [theme.breakpoints.down('sm')]: { margin: '10px' },
    '& .breadcrumb': {
      marginBottom: '0px',
      [theme.breakpoints.down('sm')]: { marginBottom: '10px' }
    }
  }));
const StyledTable = styled(Table)`
  width: 100%;
  margin-bottom: 20px;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
  }

  th {
    background-color: #f2f2f2;
  }
`;
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

const Dasboard = () => {
    const { logout } = useAuth();
    const tableRef = useRef(null);
    const history = useNavigate();

    const token = localStorage.getItem('accessToken');
    const [tableData, setTableData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currencys, setCurrencys] = useState([]);

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const fetchCurrency = async () => {
        const endpoint = `${BASE_URL}/api/dashboard/getTransactionCurrency`;

        try {
            const response = await fetch(endpoint, {
                method: "GET",
                headers: new Headers({
                    // "ngrok-skip-browser-warning": true,
                    "token": token
                }),
            })

            const { data } = await response.json();
            setCurrencys(data);
            setValue(data?.[0]?.currency)

        } catch (error) {
            console.log(error)
        }
    }
    const handleTabChange = async (currency) => {
        setLoading(true);
        // Fetch data for the selected currency code
        await geTableCellata(currency, filterFormData.status, filterFormData.from_date, filterFormData.to_date);
    };
    //Get Data from API 
    async function geTableCellata(currency, status, from_date, to_date) {
        const endpoint = `${BASE_URL}/api/dashboard/getDashboard`;

        try {
            const body = {};
            if (currency) {
                body.currency = currency;
            }
            if (status) {
                body.status = status;
            }
            if (from_date) {
                body.from_date = from_date;
            }
            if (to_date) {
                body.to_date = to_date;
            }
            const res = await fetch(endpoint, {
                method: "POST",
                headers: new Headers({
                    "token": token,
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(body)
            });

            const data = await res.json();
            if (res.status !== 401) {
                setTableData(data);
            }
            if (res.status === 401 && data.message === "Token Time Expire.") {
                await logout();
                history("session/signin");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    }

    const [filterFormData, setFilterFormData] = useState({
        currency: '',
        status: '',
        from_date: '',
        to_date: '',

    });
    const handleFilterFormChange = (e) => {
        const { name, value } = e.target;
        setFilterFormData({
            ...filterFormData,
            [name]: value,
        });
    };
    const handleFilterFormSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { currency, status, from_date, to_date } = filterFormData; // Destructure from_date and to_date from filterFormData
        await geTableCellata(currency, status, from_date, to_date);
    };
    useEffect(() => {
        geTableCellata();
        fetchCurrency();
    }, []);

    return (
        <Container className="analytics">


            <Box className="breadcrumb">
                <Breadcrumb routeSegments={[{ name: 'Dasboard', path: '/Dasboard/Dasboard ' },
                ]} />
            </Box>

            <br />
            <Container>
                <SimpleCard title="">

                    {/* tabs  */}
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                        <TabContext value={value}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                    {/* Map through tabsData to dynamically render Tab components */}
                                    {currencys?.map(currency => (
                                        <Tab key={currency.currency_code}
                                            label={currency.currency}
                                            value={currency.currency}
                                            onClick={() => handleTabChange(currency.currency)}

                                        />
                                    ))}
                                </TabList>
                            </Box>
                            {currencys.map(currency => (


                                <TabPanel key={currency.currency_code} value={currency.currency}>

                                    <ValidatorForm className="filterForm" onSubmit={handleFilterFormSubmit} data-form-identifier="filter_form">
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} md={3}>
                                                <TextField
                                                    id="filterOne"
                                                    label="Currency"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    name="currency"
                                                    value={filterFormData.currency}
                                                    onChange={handleFilterFormChange}
                                                />
                                            </Grid>

                                            <Grid item xs={12} md={3}>
                                                <FormControl size="small" fullWidth>
                                                    <InputLabel>Status</InputLabel>
                                                    <Select
                                                        id="filterTwo"
                                                        name="status"
                                                        onChange={handleFilterFormChange}
                                                        value={filterFormData.status}
                                                    >
                                                        <MenuItem value="Pending">Pending</MenuItem>
                                                        <MenuItem value="Success">Success</MenuItem>
                                                        <MenuItem value="Failed">Failed</MenuItem>
                                                    </Select>
                                                </FormControl>

                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <TextField
                                                    id="filterThree"
                                                    type="date"
                                                    label="From Date"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    name="from_date"
                                                    value={filterFormData.from_date}
                                                    onChange={handleFilterFormChange}
                                                />
                                            </Grid>
                                            <Grid item xs={12} md={3}>
                                                <TextField
                                                    id="filterFour"
                                                    type="date"
                                                    label="To Date"
                                                    variant="outlined"
                                                    size="small"
                                                    fullWidth
                                                    name="to_date"
                                                    value={filterFormData.to_date}
                                                    onChange={handleFilterFormChange}
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
                                    <br />
                                    {/* card container */}
                                    <Grid container spacing={1}>
                                        <DashbaordCard title={"Sales"} period={"Today"} value={tableData?.todayTransactions || 0} />
                                        <DashbaordCard title={"Sales"} period={"Yesterday"} value={tableData?.yesterdayTransactions || 0} />
                                        <DashbaordCard title={"Sales"} period={"This Month"} value={tableData?.monthTransactions || 0} />
                                        <DashbaordCard title={"Sales"} period={"Total"} value={tableData?.totalTransactions || 0} />

                                    </Grid>
                                    <br/><br/>
                                    <Grid container spacing={3}>
                                        <Grid item xs={7}>
                                            <Card style={{height:'350px'}}>
                                          
                                            <BarChart />
                                           
                                            </Card>

                                        </Grid>
                                       
                                        <Grid item xs={5}>
                                        <Card style={{height:'350px'}}>
                                      
                                            <PieChart />
                                           
                                            </Card>
                                        </Grid>
                                    </Grid>


                                    <Box width="100%" overflow="auto" mt={0}>

                                        <SimpleCard title="Recent Transaction">
                                        </SimpleCard >
                                        <StyledTable id="dataTable" ref={tableRef} sx={{ minWidth: 2000 }} aria-label="caption table" >

                                            <TableHead>

                                                <TableRow>
                                                    <TableCell align="left">Sr no.</TableCell>
                                                    <TableCell align="center"> Merchant Name</TableCell>
                                                    <TableCell align="center">Amount</TableCell>
                                                    <TableCell align="center"> Merchant Fee</TableCell>
                                                    <TableCell align="center"> Currency</TableCell>
                                                    <TableCell align="center"> Merchant ID</TableCell>
                                                    <TableCell align="center"> MID</TableCell>
                                                    <TableCell align="center">Payment Transaction ID</TableCell>
                                                    <TableCell align="center"> Merchant Transaction ID</TableCell>
                                                    <TableCell align="center">Message</TableCell>

                                                    <TableCell align="center">Status</TableCell>


                                                </TableRow>
                                            </TableHead>

                                            <TableBody>
                                                {tableData?.recentTransactions?.map((item, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell align="left">{index + 1}</TableCell>
                                                        <TableCell align="center">{item.merchant_name}</TableCell>
                                                        <TableCell align="center">{item.amount}</TableCell>
                                                        <TableCell align="center">{item.merchant_fee}</TableCell>
                                                        <TableCell align="center">{item.currency}</TableCell>
                                                        <TableCell align="center">{item.merchant_id}</TableCell>
                                                        <TableCell align="center">{item.mid}</TableCell>
                                                        <TableCell align="center">{item.payment_transaction_id}</TableCell>
                                                        <TableCell align="center">{item.merchant_transaction_id}</TableCell>
                                                        <TableCell align="center">{item.message}</TableCell>

                                                        <TableCell align="center">
                                                            <Small className={item.status === 'Success' ? 'green_status' :
                                                                item.status === 'Failed' ? 'red_status' :
                                                                    item.status === 'Pending' ? 'yellow_status' : ''

                                                            }
                                                            >

                                                                {item.status}
                                                            </Small>
                                                        </TableCell>



                                                    </TableRow>
                                                ))}
                                            </TableBody>

                                        </StyledTable>


                                    </Box>
                                </TabPanel>
                            ))}
                        </TabContext>
                    </Box>

                </SimpleCard>
            </Container>

            {/* testing chart compo */}


        </Container>

    )
}

export default Dasboard