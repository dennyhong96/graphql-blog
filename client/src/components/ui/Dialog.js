import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";

const ResetPasswordDialog = ({
  children,
  title,
  open,
  handleClose,
  confirmButtonText,
  handleConfirm,
  loading,
  disabled,
}) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          color="primary"
          variant="contained"
          autoFocus
          disabled={disabled ? disabled || loading : loading}
        >
          {loading ? <CircularProgress size={24} /> : confirmButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResetPasswordDialog;
