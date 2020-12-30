import React from "react";
import Button from "@material-ui/core/Button";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormHelperText
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  ButtonStyle: {
    width: "50%"
  }
}));

const ForgotPasswordDialog = ({
  open,
  setOpen,
  onConfirm,
  email,
  setEmail,
  emailError,
  setEmailError
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="confirm-dialog"
    >
      <DialogTitle id="confirm-dialog">
        Enviar E-mail de redefinição de senha
      </DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="recovery-email"
          label="E-mail"
          name="recovery-email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {emailError && <FormHelperText error> {emailError} </FormHelperText>}
      </DialogContent>
      <DialogActions>
        <Button
          className={classes.ButtonStyle}
          variant="outlined"
          onClick={() => {
            setEmailError("");
            setOpen(false);
          }}
          color="primary"
        >
          Cancelar
        </Button>
        <Button
          className={classes.ButtonStyle}
          variant="contained"
          onClick={() => {
            onConfirm();
          }}
          color="primary"
        >
          Enviar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ForgotPasswordDialog;
