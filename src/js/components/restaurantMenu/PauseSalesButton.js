import React from 'react';
import {Typography } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles( (theme) => ({
    divStyle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    buttonStyle:{
        padding: 0,
        marginRight: 5
    },
    textStyle:{
        fontSize: "0.875rem",
        lineHeight: "1.5rem",
        color: theme.palette.grey[600]
    }
}))


const PauseSalesButton = (props) => {
    const classes = useStyles();
    const {divStyle} = props;
    return(
        <div className={ divStyle ? [classes.divStyle, divStyle].join(" ") : classes.divStyle}>
            <IconButton aria-label="pause" color="default" className={classes.buttonStyle}>
                <PauseCircleOutlineIcon />
            </IconButton>
            <Typography noWrap  className={classes.textStyle}>Pausar vendas</Typography>
        </div>
    )
}

export default PauseSalesButton;