import React from 'react';
import {Typography} from '@material-ui/core';


const PageTitle = (props) => {
    const {title} = props;
    return(
    <Typography variant="h4" color="primary">{title}</Typography>
    )
}

export default PageTitle;