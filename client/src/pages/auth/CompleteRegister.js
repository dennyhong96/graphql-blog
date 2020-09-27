import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation, gql } from "@apollo/client";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { AuthContext } from "../../context/authContext";
import { auth } from "../../services/firebase";
import { CreateUser } from "../../apollo/mutations/auth";

const CompleteRegister = () => {
  const history = useHistory();
  const [createUser] = useMutation(CreateUser);
  const { dispatch } = useContext(AuthContext);
  const [email] = useState(localStorage.getItem("REGISTER_EMAIL") || "");
  const [password, setPassword] = useState("");
  const [emailLink, setEmailLink] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setEmailLink(window.location.href);

    // Hide query string after storing to state
    window.history.pushState({}, "", "/complete-register");
  }, []);

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (!(email && password)) {
      toast.error("Email and password are required.");
    }
    setLoading(true);
    try {
      // Sign in with email link
      const res = await auth.signInWithEmailLink(email, emailLink);
      console.log(res);

      // Update user to include a password
      if (res.user?.emailVerified) {
        localStorage.removeItem("REGISTER_EMAIL");
        const user = auth.currentUser;
        console.log({ user });

        await user.updatePassword(password);

        // Store user into auth context
        const { token } = await user.getIdTokenResult();

        localStorage.setItem("AUTH_TOKEN", token);
        dispatch({
          type: "USER_AUTHENTICATED",
          payload: { email: user.email, token },
        });

        // Save user into DB
        await createUser();

        toast.success("Your registration was successful!");

        // Redirect user
        setLoading(false);
        return history.push("/dashboard/profile");
      }

      // User's email is not verified.
      throw new Error("Unable to verify your email, try again later.");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <Grid container>
      <Grid item xs />
      <Grid item xs>
        <Card style={{ padding: "1rem" }}>
          <CardContent>
            <Box component="form" onSubmit={handleSubmit}>
              <Typography variant="h6" align="center" gutterBottom>
                Set a password
              </Typography>
              <TextField
                id="complete-email"
                label="Enter your email address"
                fullWidth
                value={email}
                style={{ marginBottom: "1rem" }}
                inputProps={{ type: "email" }}
                disabled={true}
              />
              <TextField
                id="complete-password"
                label="Enter a password"
                fullWidth
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                style={{ marginBottom: "1rem" }}
                inputProps={{ type: "password" }}
              />
              <Button
                color="primary"
                variant="contained"
                disabled={!password || !!loading}
                fullWidth
                type="submit"
              >
                {loading ? (
                  <CircularProgress
                    style={{ height: "1.5rem", width: "1.5rem" }}
                  />
                ) : (
                  "Complete Registeration"
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

export default CompleteRegister;
