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

export const loginUser = (email, password) => async dispatch => {
    dispatch(requestLogin());
    myFirebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(async user => {
          
        const userSnapshot = await myFirebase.firestore().collection('users').doc(user.user.uid).get();
        const userDoc = userSnapshot.data();
        console.log(userDoc)
        if(userDoc.role !== "owner"){
            dispatch(loginError("O usuário não tem permissão para fazer login nesse sistema"))
        } else {
            const { photoURL, displayName, email, uid } = user
            const userLogged = {
                uid,
                name: displayName,
                email,
                picUrl: photoURL,
                retaurantId: userDoc.restaurantId,
                role: userDoc.role
            }
            dispatch(receiveLogin(userLogged));
        }
      })
      .catch(error => {
        dispatch(loginError("Email e/ou senha incorretos"));
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
      .onAuthStateChanged( async user => {
        if (user !== null) {
            const userSnapshot = await myFirebase.firestore().collection('users').doc(user.uid).get();
            const userDoc = userSnapshot.data();
            if(userDoc.role !== "owner"){
                dispatch(logoutUser());
                dispatch(loginError("O usuário não tem permissão para fazer login nesse sistema"))
            } else {
                const { photoURL, displayName, email, uid } = user
                const userLogged = {
                    uid,
                    name: displayName,
                    email,
                    picUrl: photoURL,
                    retaurantId: userDoc.restaurantId,
                    role: userDoc.role
                }
                dispatch(receiveLogin(userLogged));

            }
        }
        dispatch(verifySuccess());
      });
  };