import React, {useState} from 'react';
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
    const {categoryDialogOpen, handleCategoryDialogClose, handleCategorySave, loading} = props;
    const classes = useStyles();
    const [category, setCategory] = useState("");


    return(
    <Dialog
          open={categoryDialogOpen}
          onClose={handleCategoryDialogClose}
          aria-labelledby="category-dialog-title"
          aria-describedby="category-dialog-description"
        >
        <DialogTitle id="category-dialog-title" color="primary">Criar categoria</DialogTitle>
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
                value={category}
                onChange={e => setCategory(e.target.value)}
            />
            </DialogContent>
        <DialogActions>
            <Button disabled={loading} className={classes.ButtonStyle} onClick={()=>{
              handleCategorySave(category);
              setCategory("");
              }}  variant="contained"  color="primary">
            Salvar
          </Button>
          <Button disabled={loading} className={classes.ButtonStyle}  onClick={()=>{
              setCategory("");
              handleCategoryDialogClose();
              }} variant="outlined"  color="primary">
            Cancelar
          </Button>
          
        </DialogActions>
      </Dialog>    )
}

export default CategoryDialog;