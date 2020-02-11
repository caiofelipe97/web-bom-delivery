import React from 'react';
import {Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';

const styles = {
    openStyle:{
            "&:disabled": {
                color:'green',
                borderWidth:3,
                borderColor: 'green',
                fontWeight:'bold',
                backgroundColor: '#f3f3f3'
            },
        },
    closeStyle:{
            "&:disabled": {
                color:'red',
                borderWidth:3,
                borderColor: 'red',
                fontWeight:'bold',
                backgroundColor: '#f3f3f3'
            },
        },

}
const RestaurantStatus  = ({open, classes}) => {
    console.log(open)
    return(  
  <div>
      { open &&
          <Button className={classes.disabledButton, classes.openStyle}
            variant="outlined" disabled endIcon={<CheckCircleIcon/>}> Restaurante Aberto</Button>
      }
      { !open && 
        <Button className={classes.disabledButton,classes.closeStyle}  variant="outlined" disabled endIcon={<CancelIcon/>}> Restaurante Fechado</Button>
     }
  </div>
)};

export default withStyles(styles)(RestaurantStatus);