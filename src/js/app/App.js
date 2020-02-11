import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from "react-redux";

import Home from '../components/home/Home';
import Login from '../components/login/Login';
import ProtectedRoute from "../middleware/ProtectedRoute";

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <div>
      <Router>
        <Switch>
        <Route path="/login" component={Login} />

          <ProtectedRoute
          path="/"
          component={Home}
          isAuthenticated={isAuthenticated}
          isVerifying={isVerifying}
        />
        </Switch>
      </Router>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}
export default connect(mapStateToProps)(App);