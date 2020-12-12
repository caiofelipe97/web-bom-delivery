import React from 'react';
import { DialogContent, Dialog,DialogTitle, DialogActions, Button, TextField } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles( () => ({
    ButtonStyle: {
        width: '50%',
    },
    DialogContentStyle:{
        minWidth: '400px'
    },
}))


const OrderingCatalogDialog = (props) => {
    const {dialogOpen, handleOrderingCatalogDialogClose, loading, categories} = props;
    const classes = useStyles();

    console.log(categories);
    
    return(
    <Dialog
          open={dialogOpen}
          onClose={handleOrderingCatalogDialogClose}
          aria-labelledby="category-dialog-title"
          aria-describedby="category-dialog-description"
        >
        <DialogTitle id="category-dialog-title" color="primary">Reordenar cardápio</DialogTitle>
        <DialogContent className={classes.DialogContentStyle}>
            <div>
              {categories.map((category, index) => (<div key={index}><text>{category.name}</text></div>)) }
            </div>
            </DialogContent>
        <DialogActions>
            <Button disabled={loading} className={classes.ButtonStyle} onClick={()=>{
       handleOrderingCatalogDialogClose()
              }}  variant="contained"  color="primary">
            Salvar
          </Button>
          <Button disabled={loading} className={classes.ButtonStyle}  onClick={()=>{
             handleOrderingCatalogDialogClose()
              }} variant="outlined"  color="primary">
            Cancelar
          </Button>
          
        </DialogActions>
      </Dialog>    )
}

export default OrderingCatalogDialog;