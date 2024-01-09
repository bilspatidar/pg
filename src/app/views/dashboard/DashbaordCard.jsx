import { Grid } from '@mui/material'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    solutionCard: {
        flex: '0 24%',
        background: '#fff',
        boxShadow: '0 2px 4px 0 rgba(136, 144, 195, 0.2), 0 5px 15px 0 rgba(37, 44, 97, 0.15)',
        borderRadius: '15px',
        margin: '5px',
        padding: '10px 15px',
        position: 'relative',
        zIndex: '1',
        overflow: 'hidden',
        minHeight: '165px',
        transition: '0.7s',
        cursor: 'pointer',
       

        "&:hover": {
            background: '#64b5f6',
            color: '#fff',
            scale: "1.1"
        }
    },
    hoverColorBubble: {
        position: 'absolute',
        background: 'rgb(54 81 207 / 15%)',
        width: '100rem',
        height: '100rem',
        left: 0,
        right: 0,
        zIndex: '-1',
        top: '16rem',
        borderRadius: '50%',
        transform: 'rotate(-36deg)',
        left: '-18rem',
        transition: '0.7s',
    },
    spanIcon: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        background: '#fff',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        color: 'black',
        justifyContent: 'center',
    },
}));

const DashbaordCard = ({ title, value, period }) => {
    const classes = useStyles();

    return (
        <Grid item xs={3} >
            <Card className={classes.solutionCard}>
                <div className={classes.hoverColorBubble}></div>
                <div className={classes.spanIcon}>
                    <span>฿</span>
                </div>
                <CardContent>
                    <Typography variant="h6" component="h3">
                        {title} | <span style={{fontSize:'16px'}}> {period} </span>
                    </Typography>
                    <Typography variant="body2" component="P">
                        ฿ {value}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default DashbaordCard