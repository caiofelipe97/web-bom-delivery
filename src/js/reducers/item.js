import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILURE,
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
    items: [],
    item: {},
    loading: false,
    errorMessage: '',
    uploadErrorMessage: ''
  },
  action
) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case GET_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.items
      };
    case GET_ITEMS_FAILURE:
      return {
        ...state,
        errorMessage: action.error,
        loading: false
      };
    case ADD_ITEM_REQUEST:
        return{
          ...state,
          loading: true
        };
    case ADD_ITEM_SUCCESS:
        return{
          ...state,
          items: [...state.items, action.item],
          loading: false
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
          ...state,
          items: state.items.map(item=> item.id === action.item.id ? action.item : item),
          loading: false
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
