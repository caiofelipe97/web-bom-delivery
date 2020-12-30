import { SHOW_SUCCESS_TOAST, SHOW_ERROR_TOAST, CLOSE_TOAST } from "../actions/";

export default (
  state = {
    isOpen: false,
    message: "",
    toastType: ""
  },
  action
) => {
  console.log(action.type);

  switch (action.type) {
    case SHOW_SUCCESS_TOAST:
      return {
        ...state,
        isOpen: true,
        message: action.message,
        toastType: "success"
      };
    case SHOW_ERROR_TOAST:
      return {
        ...state,
        isOpen: true,
        message: action.message,
        toastType: "error"
      };
    case CLOSE_TOAST:
      return {
        ...state,
        isOpen: false
      };
    default:
      return state;
  }
};
