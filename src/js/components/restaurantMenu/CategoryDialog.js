import React, {useState, useEffect} from 'react';
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


const CategoryDialog = (props) => {
    const {categoryDialogOpen, handleCategoryDialogClose, handleCategorySave, loading,isEdit, category, setCategory} = props;
    const classes = useStyles();

    

    return(
    <Dialog
          open={categoryDialogOpen}
          onClose={handleCategoryDialogClose}
          aria-labelledby="category-dialog-title"
          aria-describedby="category-dialog-description"
        >
        {isEdit ? <DialogTitle id="category-dialog-title" color="primary">Editar categoria</DialogTitle>:<DialogTitle id="category-dialog-title" color="primary">Criar categoria</DialogTitle>}
        <DialogContent className={classes.DialogContentStyle}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="category"
                label="Nome da categoria"
                name="category"
                autoFocus
                value={category.name}
                onChange={e => setCategory({...category, name:e.target.value})}
            />
            </DialogContent>
        <DialogActions>
            <Button disabled={loading} className={classes.ButtonStyle} onClick={()=>{
              handleCategorySave(category);
              }}  variant="contained"  color="primary">
            Salvar
          </Button>
          <Button disabled={loading} className={classes.ButtonStyle}  onClick={()=>{
              handleCategoryDialogClose();
              }} variant="outlined"  color="primary">
            Cancelar
          </Button>
          
        </DialogActions>
      </Dialog>    )
}

export default CategoryDialog;