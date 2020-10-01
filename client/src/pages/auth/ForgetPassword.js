import React, { useState } from "react";
import { auth } from "../../services/firebase";
import { toast } from "react-toastify";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState("");

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      await auth.sendPasswordResetEmail(email, {
        url: process.env.REACT_APP_FORGET_PASSWORD_REDIRECT,
        handleCodeInApp: true,
      });
      setEmail("");
      toast.success("Reset password email successfully sent.");
    } catch (error) {
      console.error("[FORGET PASSWORD ERROR]", error);
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <Grid container justify="center">
      <Grid item xs={11} sm={8} md={6}>
        <Card style={{ padding: "1rem" }} elevation={3}>
          <CardContent>
            <Typography variant="h6" align="center" gutterBottom>
              Forget Password
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                id="register-email"
                label="Enter your email address"
                fullWidth
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                style={{ marginBottom: "1rem" }}
                inputProps={{ type: "email" }}
              />
              <Button
                color="primary"
                variant="contained"
                disabled={!email || !!loading}
                fullWidth
                type="submit"
              >
                {loading ? (
                  <CircularProgress
                    style={{ height: "1.5rem", width: "1.5rem" }}
                  />
                ) : (
                  "Send password reset email"
                )}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ForgetPassword;
