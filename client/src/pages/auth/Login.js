import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";

import { AuthContext } from "../../context/authContext";
import { auth, googleAuthProvider } from "../../services/firebase";
import GoogleIcon from "../../assets/icons/google.png";

const CompleteRegister = () => {
  const history = useHistory();
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (evt) => {
    evt.preventDefault();
    if (!(email && password)) {
      return toast.error("Email and password are required.");
    }
    setLoading(true);
    try {
      // Try sign in with email and password
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      await authenticateUser(user);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleGoogleSignin = async () => {
    setLoading(true);
    try {
      // Try sign in with google
      const { user } = await auth.signInWithPopup(googleAuthProvider);
      await authenticateUser(user);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const authenticateUser = async (user) => {
    const { token } = await user.getIdTokenResult();

    dispatch({
      type: "USER_AUTHENTICATED",
      payload: { email: user.email, token },
    });

    // TODO: Update user information to DB

    toast.success("Sign in success.");
    setLoading(false);

    // Redirect user back to homepage
    history.push("/");
  };

  return (
    <Grid container>
      <Grid item xs />
      <Grid item xs>
        <Card style={{ padding: "1rem" }}>
          <CardContent>
            <Box component="form" onSubmit={handleLogin}>
              <Typography variant="h6" align="center" gutterBottom>
                Set a password
              </Typography>
              <TextField
                id="complete-email"
                label="Enter your email address"
                fullWidth
                value={email}
                onChange={(evt) => setEmail(evt.target.value)}
                style={{ marginBottom: "1rem" }}
                inputProps={{ type: "email" }}
                disabled={loading}
              />
              <TextField
                id="complete-password"
                label="Enter a password"
                fullWidth
                value={password}
                onChange={(evt) => setPassword(evt.target.value)}
                style={{ marginBottom: "1rem" }}
                inputProps={{ type: "password" }}
                disabled={loading}
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
                  "Log in"
                )}
              </Button>
              <IconButton
                onClick={handleGoogleSignin}
                style={{ marginTop: "0.5rem", padding: "0.25rem" }}
              >
                <img src={GoogleIcon} alt="Sign in with google" width={30} />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs />
    </Grid>
  );
};

export default CompleteRegister;
