import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { loginUser } from "../../actions";
import withStyles from '@material-ui/core/styles/withStyles'
import { createMuiTheme } from "@material-ui/core/styles"
import { ThemeProvider } from "@material-ui/styles";
import {TextField, Typography, Button, Card,CardHeader, CardContent} from '@material-ui/core';

const theme = createMuiTheme({
    overrides: {
      MuiOutlinedInput: { // Name of the component ⚛️ / style sheet
        root: { // Name of the rule
          '&$focused $notchedOutline': {
            borderColor:"#800080",
            borderWidth: 2,
  
          }
        }
      },
      MuiFormLabel: {
        root: {
            '&$focused': {
                color: '#800080'
            }
          }
        }
        
    }
  });
  const styles = ({
      mainDiv: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 'auto',
      height: '100vh',
      backgroundColor: '#E5E6F0'

      },
      title:{
        color: '#800080',
        fontWeight: 'bold'
      },
      errorText:{
        color: "#f50057",
        marginBottom: 5,
        textAlign: "center"
      }
      
  })

const Login = (props) => {
    const { classes, loginError, isAuthenticated,loginErrorMessage } = props;
    const  [email, setEmail] = useState("");
    const  [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        
        const { dispatch } = props;
        dispatch(loginUser(email, password));
    };

    if (isAuthenticated) {
       return <Redirect to="/" />;
    } else {
        return(
            <div className={classes.mainDiv}>
    <Card>
      <CardHeader classes={{
          title: classes.title,
        }} title="Bom Delivery" titleTypographyProps={{align:"center", variant:'h2'}}
        />
      <CardContent>
      <form  onSubmit={handleSubmit}>
      <ThemeProvider theme={theme}>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Usuário"
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
            style={{backgroundColor:"rgba(128, 0, 128, 0.8)", fontWeight: "bold", color: "white"}}
          >
            Login
          </Button>

        </form>
      </CardContent>
    </Card>
     
    </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      isLoggingIn: state.auth.isLoggingIn,
      loginError: state.auth.loginError,
      isAuthenticated: state.auth.isAuthenticated,
      loginErrorMessage: state.auth.loginErrorMessage
    };
}
export default withStyles(styles)(connect(mapStateToProps)(Login));
