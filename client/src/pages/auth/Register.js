import React, { useState } from "react";
import { toast } from "react-toastify";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { auth } from "../../services/firebase";

const Register = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      // Tell firebase to send confirmation link to user's email
      await auth.sendSignInLinkToEmail(email, {
        url: process.env.REACT_APP_CONFIMATION_EMAIL_REDIRECT,
        handleCodeInApp: true,
      });

      // Store user's email into localstorage
      localStorage.setItem("REGISTER_EMAIL", email);

      // Display a success toast
      toast.success(
        `Link successfully sent to ${email}, click the link to complete your registration.`
      );

      setEmail("");
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <Grid container>
      <Grid item xs />
      <Grid item xs>
        <Card style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
          <CardContent>
            <Typography variant="h6" align="center">
              Register Account
            </Typography>
            <Box component="form">
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
                onClick={handleSubmit}
                fullWidth
              >
                {loading ? (
                  <CircularProgress
                    style={{ height: "1.5rem", width: "1.5rem" }}
                  />
                ) : (
                  "Register"
                )}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs />
    </Grid>
  );
};

export default Register;
