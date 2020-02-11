import {
    GET_RESTAURANT_REQUEST,
    GET_RESTAURANT_SUCCESS,
    GET_RESTAURANT_FAILURE
  } from "../actions/";


export default (
    state = {
      restaurant: {},
      loading: false,
      errorMessage: ''
    },
    action
  ) => {
    switch (action.type) {
        case GET_RESTAURANT_REQUEST:
            return {
              ...state,
              loading: true
            };
            case GET_RESTAURANT_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    restaurant: action.restaurant
                };
            case GET_RESTAURANT_FAILURE:
                return {
                    ...state,
                    errorMessage: action.error,
                    loading: false
                };
                    
        default:
            return state;
        }
    };
