import React, {useState} from 'react';
import {TextField, FormControl, Button, FormLabel} from '@material-ui/core';
import { myFirebase } from "../../firebase/firebase";
import firebase from 'firebase/app';
import OutlinedDiv from '../common/OutlinedDiv';
import { makeStyles} from '@material-ui/core/styles';
import PasswordDialog from './passwordDialog';

const useStyles = makeStyles(theme => ({
    outlinedDiv:{
        marginTop: 20,
        minWidth: 600,
        maxWidth: 600
    },
    userForm:{
        display:'flex',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    formControl:{
        margin: theme.spacing(1),
        minWidth: '45%'
    },
    passwordDiv:{
        marginLeft: 20
    },
    passwordLabel:{
      marginBottom: 10
    },

}))   

const UserForm = (props) => {
    const {user,newPasswordLoading,setNewPasswordLoading} = props;
    const {email} = user;
    const classes = useStyles();

    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [verifyNewPassword, setVerifyNewPassword] = useState("");

    const [wrongPassword, setWrongPassword] = useState(false);
    const [checkError, setCheckError] = useState(false);

    const handlePasswordDialogOpen = () => {
      setPasswordDialogOpen(true);
    };

    const handleChangePassword = (e) => {
      e.preventDefault();
      if(newPassword === verifyNewPassword){
        setNewPasswordLoading(true);
        const userLogged = myFirebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
        userLogged.reauthenticateWithCredential(credential).then(()=>{
          userLogged.updatePassword(newPassword).then(function() {
            setNewPasswordLoading(false);
            console.log("Deu bom!")
          }).catch(function(error) {
            setNewPasswordLoading(false);
            console.log(error);
          });
          setCurrentPassword("");
          setNewPassword("");
          setVerifyNewPassword("");
          setWrongPassword(false);
          setCheckError(false);
          setPasswordDialogOpen(false);
        }).catch(error=>{
          setWrongPassword(true);
          setCurrentPassword("");
          setNewPassword("");
          setVerifyNewPassword("");
          setNewPasswordLoading(false);
        })
      }
    };

    const handlePasswordDialogClose = () => {
      setPasswordDialogOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setVerifyNewPassword("");
    };

    return(
      <>
        <OutlinedDiv label={"Usuário"} className={classes.outlinedDiv}>
          <div className={classes.userForm}>
            <FormControl className={classes.formControl}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="E-mail"
                    name="email"
                    type="text"
                    value={email}
                    inputProps={{maxLength: 30}}
                    disabled
                />
            </FormControl>
            <div className={classes.passwordDiv}>
              <FormLabel component="legend" className={classes.passwordLabel}>Senha</FormLabel>
              <Button  variant="contained" color="primary" onClick={handlePasswordDialogOpen}>Alterar Senha</Button>
            </div>
          </div>
        </OutlinedDiv>
        <PasswordDialog 
              passwordDialogOpen={passwordDialogOpen} 
              handlePasswordDialogClose={handlePasswordDialogClose}
              handleChangePassword={handleChangePassword}
              currentPassword={currentPassword}
              setCurrentPassword={setCurrentPassword}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              verifyNewPassword={verifyNewPassword}
              setVerifyNewPassword={setVerifyNewPassword}
              wrongPassword={wrongPassword}
              setWrongPassword={setWrongPassword}
              checkError={checkError}
              setCheckError={setCheckError}
              loading={newPasswordLoading}
              />
          </>
    )
}

export default UserForm;