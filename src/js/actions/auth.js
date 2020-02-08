import { myFirebase } from "../firebase/firebase";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const requestLogin = () => {
    return {
      type: LOGIN_REQUEST
    };
};

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const receiveLogin = user => {
    return {
      type: LOGIN_SUCCESS,
      user
    };
};

export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const loginError = (error) => {
    return {
      type: LOGIN_FAILURE,
      error
    };
};

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const requestLogout = () => {
    return {
      type: LOGOUT_REQUEST
    };
};

export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const receiveLogout = user => {
    return {
      type: LOGOUT_SUCCESS,
      user
    };
};

export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const logoutError = (error) => {
    return {
      type: LOGOUT_FAILURE,
      error
    };
};

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const verifyRequest = () => {
    return {
      type: VERIFY_REQUEST
    };
};

export const VERIFY_SUCCESS = "VERIFY_SUCCESS";
export const verifySuccess = () => {
    return {
      type: VERIFY_SUCCESS
    };
};

export const loginUser = (email, password) => dispatch => {
    dispatch(requestLogin());
    myFirebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch(receiveLogin(user));
      })
      .catch(error => {
        //Do something with the error if you want!
        dispatch(loginError(error));
      });
  };
  
  export const logoutUser = () => dispatch => {
    dispatch(requestLogout());
    myFirebase
      .auth()
      .signOut()
      .then(() => {
        dispatch(receiveLogout());
      })
      .catch(error => {
        //Do something with the error if you want!
        dispatch(logoutError(error));
      });
  };
  
  export const verifyAuth = () => dispatch => {
    dispatch(verifyRequest());
    myFirebase
      .auth()
      .onAuthStateChanged(user => {
        if (user !== null) {
          dispatch(receiveLogin(user));
        }
        dispatch(verifySuccess());
      });
  };