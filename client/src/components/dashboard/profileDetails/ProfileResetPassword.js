import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { auth } from "../../../services/firebase.js";
import Dialog from "../../ui/Dialog";

const ProfileResetPassword = () => {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (password !== passwordConfirm) {
      return toast.error("Passwords do not match.");
    }
    setLoading(true);
    try {
      setLoading(false);
      await auth.currentUser.updatePassword(password);
      toast.success("Password successfully reset.");
      setPassword("");
      setPasswordConfirm("");
      setOpen(false);
    } catch (error) {
      console.error("[RESET PASSWORD ERROR]", error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <Fragment>
      <Button
        variant="contained"
        color="primary"
        onClick={setOpen.bind(this, true)}
      >
        Reset Password
      </Button>
      <Dialog
        title="Reset your password"
        open={open}
        handleClose={setOpen.bind(this, false)}
        confirmButtonText="Reset"
        loading={loading}
        handleConfirm={handleResetPassword}
        disabled={!(password && passwordConfirm)}
      >
        <TextField
          id="reset-password"
          label="Enter your new password"
          fullWidth
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
          style={{ marginBottom: "0.25rem" }}
          inputProps={{ type: "password" }}
          disabled={loading}
        />
        <TextField
          id="reset-password-confirm"
          label="Confirm your new password"
          fullWidth
          value={passwordConfirm}
          onChange={(evt) => setPasswordConfirm(evt.target.value)}
          style={{ marginBottom: "1rem" }}
          inputProps={{ type: "password" }}
          disabled={loading}
        />
      </Dialog>
    </Fragment>
  );
};

export default ProfileResetPassword;
