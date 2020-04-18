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
    ADD_ITEM_REQUEST,
    ADD_ITEM_SUCCESS,
    ADD_ITEM_FAILURE,
    UPLOAD_ITEM_IMG_REQUEST,
    UPLOAD_ITEM_IMG_SUCCESS,
    UPLOAD_ITEM_IMG_FAILURE,
    EDIT_ITEM_REQUEST,
    EDIT_ITEM_SUCCESS,
    EDIT_ITEM_FAILURE,
    DELETE_ITEM_REQUEST,
    DELETE_ITEM_SUCCESS,
    DELETE_ITEM_FAILURE
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
      case ADD_ITEM_REQUEST:
          return{
            ...state,
            loading: true
          };
      case ADD_ITEM_SUCCESS:
          return{
            ...state
          };
      case ADD_ITEM_FAILURE:
        return{
          ...state,
          loading:false,
          errorMessage: action.error
        };
        case EDIT_ITEM_REQUEST:
          return{
            ...state,
            loading: true
          };
      case EDIT_ITEM_SUCCESS:
          return{
            ...state
          };
      case EDIT_ITEM_FAILURE:
        return{
          ...state,
          loading:false,
          errorMessage: action.error
        };
      case UPLOAD_ITEM_IMG_REQUEST:
        return{
          ...state,
          loading:true
        };
      case UPLOAD_ITEM_IMG_SUCCESS:
      return {
        ...state,
        uploadErrorMessage: ''
      };
      case UPLOAD_ITEM_IMG_FAILURE:
        return {
          ...state,
          uploadErrorMessage: action.error
        };
      case DELETE_ITEM_REQUEST:
        return {
          ...state,
          loading:true
        };
      case DELETE_ITEM_SUCCESS:
        return {
          ...state,
          loading:false
        };
      case DELETE_ITEM_FAILURE:
        return {
          ...state,
          loading:false
        }
  default:
          return state;
      }
    };
