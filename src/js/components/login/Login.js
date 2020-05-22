import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../../actions";
import withStyles from "@material-ui/core/styles/withStyles";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import {
  TextField,
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
  Link,
  CircularProgress
} from "@material-ui/core";
import { myFirebase } from "../../firebase/firebase";
import ForgotPasswordDialog from "../common/ForgotPasswordDialog";

const theme = createMuiTheme({
  overrides: {
    MuiOutlinedInput: {
      // Name of the component ⚛️ / style sheet
      root: {
        // Name of the rule
        "&$focused $notchedOutline": {
          borderColor: "#800080",
          borderWidth: 2
        }
      }
    },
    MuiFormLabel: {
      root: {
        "&$focused": {
          color: "#800080"
        }
      }
    }
  }
});
const styles = {
  mainDiv: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    height: "100vh",
    backgroundColor: "#E5E6F0"
  },
  title: {
    color: "#800080",
    fontWeight: "bold"
  },
  errorText: {
    color: "#f50057",
    marginBottom: 5,
    textAlign: "center"
  },
  linkStyle: {
    cursor: "pointer",
    fontWeight: 500,
    color: "#78308C"
  },
  forgotPassword: {
    display: "flex",
    justifyContent: "flex-end",
    margin: 10,
    marginTop: 2,
    fontFamily: "Roboto"
  },
  circularProgress: {
    position: "relative",
    zIndex: 2001
  },
  progressDiv: {
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  },
  progressContainer: {
    position: "fixed",
    zIndex: 2000,
    minHeight: "100%",
    minWidth: "100%"
  }
};

const Login = props => {
  const {
    classes,
    loginError,
    isAuthenticated,
    loginErrorMessage,
    isLoggingIn
  } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [errorRecoveryEmail, setErrorRecoveryEmail] = useState("");

  const handleSubmit = e => {
    e.preventDefault();

    const { dispatch } = props;
    dispatch(loginUser(email, password));
  };

  const handleRedefinePassword = e => {
    setLoading(true);
    const auth = myFirebase.auth();

    auth
      .sendPasswordResetEmail(recoveryEmail)
      .then(() => {
        setLoading(false);
        setRecoveryEmail("");
        setErrorRecoveryEmail("");
        setPasswordDialogOpen(false);
      })
      .catch(error => {
        setErrorRecoveryEmail("E-mail inválido!");
        setLoading(false);
      });
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    return (
      <div className={classes.mainDiv}>
        {(isLoggingIn || loading) && (
          <div className={classes.progressContainer}>
            <div className={classes.progressDiv}>
              <CircularProgress
                className={classes.circularProgress}
                size={100}
              />
            </div>
          </div>
        )}
        <Card>
          <CardHeader
            classes={{
              title: classes.title
            }}
            title="Bom Delivery"
            titleTypographyProps={{ align: "center", variant: "h2" }}
          />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <ThemeProvider theme={theme}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="E-mail"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Senha"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
                <div className={classes.forgotPassword}>
                  <Link
                    className={classes.linkStyle}
                    onClick={() => {
                      setPasswordDialogOpen(true);
                    }}
                    underline="always"
                  >
                    Esqueci a senha
                  </Link>
                </div>
              </ThemeProvider>
              {loginError && (
                <Typography component="p" className={classes.errorText}>
                  {loginErrorMessage}
                </Typography>
              )}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{
                  backgroundColor: "rgba(128, 0, 128, 0.8)",
                  fontWeight: "bold",
                  color: "white"
                }}
              >
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
        <ForgotPasswordDialog
          open={passwordDialogOpen}
          setOpen={setPasswordDialogOpen}
          onConfirm={handleRedefinePassword}
          email={recoveryEmail}
          setEmail={setRecoveryEmail}
          emailError={errorRecoveryEmail}
          setEmailError={setErrorRecoveryEmail}
        ></ForgotPasswordDialog>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated,
    loginErrorMessage: state.auth.loginErrorMessage
  };
}
export default withStyles(styles)(connect(mapStateToProps)(Login));
