import React from 'react';
import { DialogContent, Dialog,DialogTitle, DialogActions, Button, TextField, FormHelperText } from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles( () => ({
    ButtonStyle: {
        width: '50%',
    },
    DialogContentStyle:{
        minWidth: '300px'
    },
}))


const PasswordDialog = (props) => {
    const {passwordDialogOpen, handlePasswordDialogClose, handleChangePassword, currentPassword, setCurrentPassword,
      newPassword, setNewPassword, verifyNewPassword, setVerifyNewPassword, checkError, setCheckError, wrongPassword,
      setWrongPassword, loading} = props;

    const classes = useStyles();

    return(
    <Dialog
          open={passwordDialogOpen}
          onClose={handlePasswordDialogClose}
          aria-labelledby="category-dialog-title"
          aria-describedby="category-dialog-description"
          
        >
        <form onSubmit={handleChangePassword}>
        <DialogTitle id="category-dialog-title" color="primary">Alterar Senha</DialogTitle>
        <DialogContent className={classes.DialogContentStyle}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="current_password"
                label="Senha atual"   
                name="current_password"
                type="password"
                value={currentPassword}
                inputProps={{minLength: 8}}
                onChange={e=>setCurrentPassword(e.target.value)}
                onFocus={()=>{setWrongPassword(false);}}
            />
            {wrongPassword &&  <FormHelperText error>Sua senha atual está incorreta, digite novamente</FormHelperText>}
             <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="new_password"
                label="Nova Senha"
                name="new_password"
                type="password"
                value={newPassword}
                inputProps={{minLength: 8}}
                onChange={e=>{
                  setNewPassword(e.target.value);
                  }
                }
                  
            />
             <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth 
                id="verify_new_password"
                label="Verificar nova Senha"
                name="verify_new_password"
                type="password"
                value={verifyNewPassword}
                inputProps={{minLength: 8}}
                onChange={e=>{ 
                setVerifyNewPassword(e.target.value)
                }}
                onFocus={()=>{setCheckError(true);}}
                error={checkError && newPassword !== verifyNewPassword}
            />  
            {checkError && newPassword !== verifyNewPassword && <FormHelperText error>As senhas não coincidem</FormHelperText>}
            </DialogContent>
            
        <DialogActions>
            <Button className={classes.ButtonStyle}  variant="contained"  color="primary" type="submit" disabled={loading}>
            Salvar
          </Button>
          <Button className={classes.ButtonStyle}  onClick={()=>{
              handlePasswordDialogClose();
              }} variant="outlined"  color="primary"  disabled={loading}>
            Cancelar
          </Button>
          
        </DialogActions>
        </form>
      </Dialog>    )
}

export default PasswordDialog;