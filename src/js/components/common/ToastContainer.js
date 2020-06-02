import React, { useCallback, useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { closeToast } from "../../actions/toast.actions";
import { connect } from "react-redux";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ToastContainer = ({ isOpen, type, message, handleClose }) => {
  useEffect(() => {
    console.log({ isOpen, type, message });
  }, [isOpen, type, message]);

  const removeToast = useCallback(() => {
    handleClose();
  }, [handleClose]);

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={isOpen}
      onClose={removeToast}
      autoHideDuration={4000}
    >
      <Alert onClose={handleClose} severity={type}>
        {message}
      </Alert>
    </Snackbar>
  );
};

const mapDispatchToProps = dispatch => ({
  handleClose: () => dispatch(closeToast())
});

function mapStateToProps(state) {
  console.log(state);
  return {
    isOpen: state.toast.isOpen,
    message: state.toast.message,
    type: state.toast.toastType
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ToastContainer);
