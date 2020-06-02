export const SHOW_SUCCESS_TOAST = "SHOW_SUCCESS_TOAST";

export const showSuccessToast = message => {
  return {
    type: SHOW_SUCCESS_TOAST,
    message
  };
};

export const SHOW_ERROR_TOAST = "SHOW_ERROR_TOAST";
export const showErrorToast = message => {
  return {
    type: SHOW_ERROR_TOAST,
    message
  };
};

export const CLOSE_TOAST = "CLOSE_TOAST";
export const closeToast = () => {
  return {
    type: CLOSE_TOAST
  };
};
