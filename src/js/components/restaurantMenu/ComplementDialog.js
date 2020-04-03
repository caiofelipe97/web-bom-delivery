import React, {useState} from 'react';
import { DialogContent, Dialog,DialogTitle, DialogActions, Button, TextField, FormHelperText,FormControlLabel,Checkbox} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles( (theme) => ({
    ButtonStyle: {
        width: '50%',
    },
    DialogContentStyle:{
        minWidth: '400px'
    },
    helperTextDiv:{
      marginBottom: 10
  },
   secondHeadDiv:{
        display: 'flex'
      },
      qtdDiv:{
        display: 'flex'
      },
      mediumInput:{
        width: '70%'
      },
      smallInput:{
          width: '40%',
          marginRight: 10
      },
    inputDivStyle:{
      backgroundColor: theme.palette.grey[300],
      padding: 20,
      border: '1px solid rgba(0, 0, 0, 0.24)'
    }
}))


const ComplementDialog = (props) => {
    const {complementDialogOpen, handleComplementDialogClose, handleAddComplement} = props;
    const classes = useStyles();
   const [name, setName] = useState("");
   const [min, setMin] = useState(1);
   const [max, setMax] = useState(1);
  const [isRequired, setIsRequired] = useState(false);

    return(
    <Dialog
          open={complementDialogOpen}
          onClose={handleComplementDialogClose}
          aria-labelledby="category-dialog-title"
          aria-describedby="category-dialog-description"
        >
        <DialogTitle id="img-dialog-title" color="primary">Adicionar categoria de complementos</DialogTitle>
        
        <DialogContent className={classes.DialogContentStyle}>
        <div className={classes.helperTextDiv} >
                <FormHelperText> Alguns exemplos de categoria de complemento: "Selecione o sabor", "Selecione os extras" e "Selecione a embalagem" são alguns exemplos.
                Adicione alguma categoria de complemento para acrescentar os complementos do seu item.</FormHelperText>
            </div>
            <div className={classes.inputDivStyle}>

            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="complement-name"
                label="Nome da categoria"
                name="category"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <div className={classes.secondHeadDiv}>
                        <div className={classes.qtdDiv}>
                            <TextField
                                className={classes.smallInput}
                                variant="outlined"
                                margin="normal"
                                type="number"
                                value = {min}
                                required
                                fullWidth
                                size="small"
                                id="complement-min"
                                label="Qtd. mín."
                                name="min"
                                onChange={e => setMin(parseInt(e.target.value))}
                            />
                            <TextField
                                className={classes.smallInput}
                                variant="outlined"
                                margin="normal"
                                type="number"
                                value = {max}
                                required
                                fullWidth
                                size="small"
                                id="complement-max"
                                label="Qtd. máx."
                                name="max"
                                onChange={e => setMax(parseInt(e.target.value))}
                            />                    
                        </div>
                        <FormControlLabel
                        className={classes.mediumInput}
                        control={
                            <Checkbox 
                            checked={isRequired} 
                            inputProps={{name:'isRequired'}}  
                            value={isRequired} 
                            onChange={e => { setIsRequired(e.target.checked);}
                            }/>
                            }
                        label="Complemento obrigatório"
                        />
                    </div>
                    </div>
            </DialogContent>
        <DialogActions>
            <Button className={classes.ButtonStyle} onClick={()=>{
              handleAddComplement({name:name, min:min, max:max, isRequired:isRequired});
              }}  variant="contained"  color="primary">
            Adicionar
          </Button>
          <Button className={classes.ButtonStyle}  onClick={()=>{
              handleComplementDialogClose();
              }} variant="outlined"  color="primary">
            Cancelar
          </Button>
          
        </DialogActions>
      </Dialog>    )
}

export default ComplementDialog;