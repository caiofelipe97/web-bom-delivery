import {
    GET_RESTAURANT_REQUEST,
    GET_RESTAURANT_SUCCESS,
    GET_RESTAURANT_FAILURE,
    EDIT_RESTAURANT_REQUEST,
    EDIT_RESTAURANT_SUCCESS,
    EDIT_RESTAURANT_FAILURE,
    UPLOAD_RESTAURANT_IMG_REQUEST,
    UPLOAD_RESTAURANT_IMG_SUCCESS,
    UPLOAD_RESTAURANT_IMG_FAILURE,
    ADD_OR_EDIT_CATEGORY_REQUEST,
    ADD_OR_EDIT_CATEGORY_SUCCESS,
    ADD_OR_EDIT_CATEGORY_FAILURE,
  } from "../actions/";


export default (
    state = {
      restaurant: {},
      loading: false,
      errorMessage: '',
      uploadErrorMessage: ''
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
      case EDIT_RESTAURANT_REQUEST:
        return {
          ...state,
          loading: true
        };
      case EDIT_RESTAURANT_SUCCESS:
        return {
          ...state,
          loading:false,
          errorMessage: ""
        };
      case EDIT_RESTAURANT_FAILURE:
        return{
          ...state,
          loading:false,
          errorMessage: action.error
        };
      case UPLOAD_RESTAURANT_IMG_REQUEST:
        return{
          ...state,
          loading: true
        };
      case UPLOAD_RESTAURANT_IMG_SUCCESS:
        return{
          ...state
        };
      case UPLOAD_RESTAURANT_IMG_FAILURE:
        return{
          ...state,
          loading:false,
          errorMessage: action.error
        };
      case ADD_OR_EDIT_CATEGORY_REQUEST:
        return{
          ...state,
          loading: true
        };
      case ADD_OR_EDIT_CATEGORY_SUCCESS:
        return{
          ...state
        };
      case ADD_OR_EDIT_CATEGORY_FAILURE:
        return{
          ...state,
          loading:false,
          errorMessage: action.error
        };
  default:
          return state;
      }
    };
