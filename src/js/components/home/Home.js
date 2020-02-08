import React from 'react';
import { connect } from "react-redux";
import { logoutUser } from "../../actions";


const Home = (props) => {
    const { isLoggingOut, logoutError, user } = props;
    console.log(user)
    const handleLogout = () => {
        const { dispatch } = props;
        dispatch(logoutUser());
      };

    return(
        <div>
        <h1>This is your app's protected area.</h1>
        <p>Any routes here will also be protected</p>
        <button onClick={handleLogout}>Logout</button>
        {isLoggingOut && <p>Logging Out....</p>}
        {logoutError && <p>Error logging out</p>}
      </div>
    )
}

function mapStateToProps(state) {
    return {
      isLoggingOut: state.auth.isLoggingOut,
      logoutError: state.auth.logoutError,
      user: state.auth.user
    };
  }
export default connect(mapStateToProps)(Home);