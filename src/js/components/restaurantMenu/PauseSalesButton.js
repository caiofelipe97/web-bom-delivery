import React from 'react';
import {Typography } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles( (theme) => ({
    divStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: 121
    },
    isPausedButton:{
        padding: 0,
        marginRight: 5
        },
    textStyle:{
        fontSize: "0.875rem",
        lineHeight: "1.5rem",
        color: theme.palette.grey[600]
    },
    smallTextStyle:{
        fontSize: "0.825rem"
    },
    isPaused:{
        color: '#F25105'
    }
}))


const PauseSalesButton = (props) => {
    const classes = useStyles();
    const {divStyle, small, isPaused, setIsPaused} = props;
    return(
        <div className={ divStyle ? [classes.divStyle, divStyle].join(" ") : classes.divStyle}>
            <IconButton aria-label="pause" color="default" className={isPaused ? [classes.isPausedButton,classes.isPaused].join(' ') : classes.isPausedButton} onClick={()=>{setIsPaused(!isPaused)}}>
                <PauseCircleOutlineIcon />
            </IconButton>
            {
                isPaused ? 
                <Typography noWrap  className={small? [classes.textStyle,classes.smallTextStyle, classes.isPaused].join(" "):[classes.textStyle, classes.isPaused].join(" ")}>Pausado</Typography>    
                :
                <Typography noWrap  className={small? [classes.textStyle,classes.smallTextStyle].join(" "):classes.textStyle}>Pausar vendas</Typography>
            }
        </div>
    )
}

export default PauseSalesButton;