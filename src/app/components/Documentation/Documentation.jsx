import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom'; // If using react-router
import { BASE_URL } from '../../config';
import { Button, Typography, styled ,AppBar, IconButton, Toolbar,  Paper, Badge, Box, Container } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy'; 
import { MatxLogo } from '../../components';
import { APP_NAME } from '../../config';
import { Span } from '../Typography';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 250;
const BrandRoot = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 18px 20px 29px',
}));
const StyledSpan = styled(Span)(({ mode }) => ({
  fontSize: 18,
  marginLeft: '.5rem',
  display: mode === 'compact' ? 'none' : 'block',
}));
const useStyles = makeStyles((theme) => ({
  card: {
    // Define styles for the card container
    // You can adjust padding, margin, background, etc., based on your requirements
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    // Add other styles as needed
  },
  navTabs: {
    // Add styling for nav-tabs if required
    // Example: You can adjust font size, colors, etc.
  },
  activeTab: {
    // Define styles for the active tab if needed
  },

  copyButton: {
    marginLeft: theme.spacing(2),
    // Add any other styling for the copy button
  },
  url: {
    fontSize: '15px',
    textAlign: 'left',
    padding: '15px',
    borderRadius: '3px',
    fontFamily: 'Roboto Mono',
    color: '#222',
    // Add any additional CSS properties here
  },
  root: {
    textAlign: 'justify',
    margin: theme.spacing(2),
    // Add other CSS styles here as needed
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#dfbfbf',
  },
  header: {
    padding: '16px',
    fontSize: '30px',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    textAlign: 'center',
  },
  link: {
    display: 'block',
    color: 'black',
    textDecoration: 'none',
    padding: theme.spacing(1),
    fontSize:"15px" ,
    marginLeft: "20px",
  },
  active: {
    color: '#000',
   
  },
  hover: {
    '&:hover': {
      backgroundColor: '#3f51b5',
      color: 'white',
    },
  },
  tabMainContainer: {
    border: "1px solid #3f51b5",
    margin: "15px",
  },
  
  tabdetail: {
    margin: "15px",
    marginTop: "10px",
    marginBottom: "10px",
  },
  tabexmple: {
    margin: "15px",
    marginTop: "10px",
    marginBottom: "10px",
  },
  tabButtons: {
    Color: '#3f51b5',
    padding: "11px 17px 0px",
    background: " #3f51b5",
    '& > *': {
      marginRight: theme.spacing(2),
      background:'#fff',
      color:'#3f51b5',
      marginBottom: theme.spacing(2),

      '&:hover': {
        backgroundColor: '#3f51b5',
        color: 'white',
      },
    },
  },
  tabContent:{
    marginLeft: "20px",
    marginTop: "10px",
    marginBottom: "10px",
  }
  ,
  tabPane1:{
   wordWrap: "break-word",
   paddingRight:"20px",
  }
}));


const Documentation = () => {
  const token = localStorage.getItem('accessToken');
  const urlRef = useRef();
  const [items, setItems] = useState([]);
  const [activeTab, setActiveTab] = useState()

  console.log(activeTab)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/api_documentation/api_documentation_list`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "token": token,
          },
          body: JSON.stringify({ /* your request body if needed */ }),
        });

        if (response.ok) {
          const { data } = await response.json();
          setItems(data); // Update items state with fetched data
          setActiveTab(data[0].title)
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state if needed
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once on component mount

  const classes = useStyles();

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
  const buttonStyle = {
    margin: '0 10px',
    borderRadius: '30%',
    boxShadow: '0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 1px 1px 1px #00c0ef'

  };
  const [activeTab1, setActiveTab1] = useState('tab1'); // Initialize activeTab with 'tab1' or any default tab

  // Function to handle tab change when a button is clicked
  const handleTabChange = (tab) => {
    setActiveTab1(tab);
  };

  function replaceWithBr(text) {
    return text.replace(/\n/g, "<br />")
  }
 
  return (
    <div>
   
      <Drawer
        variant="permanent"
        className={classes.drawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
      <BrandRoot>
      <Box display="flex" alignItems="center">
        <MatxLogo />
        <StyledSpan className="sidenavHoverShow">
        {APP_NAME}
        </StyledSpan>
      </Box>
      </BrandRoot>
        <hr />
        <List>
          {
            items?.map((item, index) => (
              <ListItem
                key={index}
                className={`${classes.link} ${index === 0 ? classes.active : ''} ${classes.hover}`}
                onClick={() => setActiveTab(item.menu_name)}
              >
                {item.menu_name}
              </ListItem>
            ))
          }
        </List>
      
      </Drawer>
      
      <div classNameName="content" style={{ marginLeft: '250px', padding: '1px 16px', height: '1000px' }}>
        <main>
          <div className="content">
            {items?.map((item, index) => {
              return item.menu_name === activeTab && (
                <div key={index}>
                  <Typography variant="body1" align="center"text="bold" style={{ color: '#000',marginTop:'23px', fontSize: '2.2rem' }}>
                    {item.title}
                  </Typography> 
                  <Typography
                    className={classes.root}
                    variant="body1"
                    component="div"
                    dangerouslySetInnerHTML={{ __html: item.description || '' }}
                  />

                  {
                    item.url &&
                  <div className={classes.card}>
                    <Paper>
                      <div className={classes.urlContainer}>
                        <Badge color="success" badgeContent="Post">
                          <Typography ref={urlRef} className={classes.url}>{item.url}</Typography>
                        </Badge>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={()=>handleCopyToClipboard(item.url)}
                          className={classes.copyButton}
                          startIcon={<FileCopyIcon />}
                        >
                          {copySuccess ? 'Copied!' : 'Copy'}
                        </Button>
                      </div>
                    </Paper>
                  </div> 
                  }
                  {/* Render the description data received from props */}
                  {item.header && item.response && item.request && 
                  <div className={classes.tabMainContainer}>
                    <div className={classes.tabButtons}>
                      {item.header &&
                      <Button style={{background: activeTab1 === "tab1" ? "#3f51b5" : "#fff",color:activeTab1 === "tab1" ? "#fff" : "#3f51b5"}} variant={activeTab1 === 'tab1' ? 'contained' : 'outlined'} onClick={() => handleTabChange('tab1')}>
                        Header
                      </Button> }
                      {item.request &&
                      <Button style={{background: activeTab1 === "tab2" ? "#3f51b5" : "#fff",color:activeTab1 === "tab2" ? "#fff" : "#3f51b5"}} variant={activeTab1 === 'tab2' ? 'contained' : 'outlined'} onClick={() => handleTabChange('tab2')}>
                        Request
                      </Button>
                      }
                      {item.response &&
                      <Button style={{background: activeTab1 === "tab3" ?"#3f51b5" : "#fff",color:activeTab1 === "tab3" ? "#fff" : "#3f51b5"}} variant={activeTab1 === 'tab3' ? 'contained' : 'outlined'} onClick={() => handleTabChange('tab3')}>
                        Response
                      </Button>
                       }
                    </div>
                    <div className={classes.tabContent}>
                      {/* Tab 1 */}
                      {activeTab1 === 'tab1' && (
                        <div className={`${classes.tabPane} fontawesome-demo ${activeTab1 === 'tab1' ? 'active' : ''}`} id="tab1">
                          <div className={classes.biography}>
                          
                            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: replaceWithBr(item.header) || '' }} />

                          </div>
                        </div>
                      )}

                      {/* Tab 2 */}
                      {activeTab1 === 'tab2' && (
                        <div className={`${classes.tabPane} ${activeTab1 === 'tab2' ? 'active' : ''}`} id="tab2">
                          <div className={classes.request}>
                           
                            <Typography variant="body1" dangerouslySetInnerHTML={{ __html: replaceWithBr(item.request) || '' }} />
                          </div>
                        </div>
                      )}

                      {/* Tab 3 */}
                      {activeTab1 === 'tab3' && (
                        <div className={`${classes.tabPane1} ${activeTab1 === 'tab3' ? 'active' : ''}`} id="tab3">
                          <div className={classes.response}>
                            <Typography  sx={{ marginLeft: 1 }} 
                             variant="body1"
                      dangerouslySetInnerHTML={{ __html: replaceWithBr(item.response) || '' }} />
                          </div>
                        </div>
                      )}

                    </div>
                  </div> }
                  {item.details &&
                  <div className={classes.tabdetail}>
                  <Typography variant="body1" dangerouslySetInnerHTML={{ __html: item.details || '' }} />
                  </div>
                    }
                    {item.example &&
                  <div className={classes.tabexmple}>
                  <Typography variant="body1" dangerouslySetInnerHTML={{ __html: item.example || '' }} />
                  <br />
                  </div>
                    }
                  <br />
                </div>
              );
            })}


          </div>

        </main>

      </div>
    </div>
  );
};

export default Documentation;