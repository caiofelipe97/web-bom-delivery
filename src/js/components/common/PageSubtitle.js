import React from 'react';
import {Typography} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles( _ => ({
    subtitleStyle: {
        color: "rgba(0, 0, 0, 0.54)",
        marginTop: 10
    },
}))

const PageTitle = (props) => {
    const {subtitle} = props;
    const classes = useStyles();

    return(
    <Typography variant="subtitle1" className={classes.subtitleStyle}>{subtitle}</Typography>
    )
}

export default PageTitle;