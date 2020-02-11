import React from 'react';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = {
    logo: {
        height: 50,
        width: 50,
    },
    flexDiv:{
        display:'flex',
        alignItems: 'center'
    },
    nameStyle:{
        marginLeft: 10
    }
}

function RestaurantHeader(props){
    const {img, name, classes} = props
    return(
    <div className={classes.flexDiv}>
      <CardMedia
        className={classes.logo}
        image={img}
        title="Live from space album cover"
      />
      <Typography variant="h6" noWrap  className={classes.nameStyle}
>
            {name}
        </Typography>
  </div>
    )
    
};

export default withStyles(styles)(RestaurantHeader);