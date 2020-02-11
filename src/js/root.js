import React from "react";
import { Provider } from "react-redux";
import App from "./app/App";
import store from "./store/index";
import theme from './utils/theme';
import { MuiThemeProvider } from '@material-ui/core/styles';

function Root() {
    return (
      <Provider store={store}>

          <MuiThemeProvider theme={theme}>
           <App />
          </MuiThemeProvider>
      </Provider>
    );
  }
export default Root;