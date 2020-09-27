import React, { Fragment, useContext } from "react";

import Typography from "@material-ui/core/Typography";

import ProfileDetails from "../../components/dashboard/profileDetails/ProfileDetails";
import ProfileResetPassword from "../../components/dashboard/profileDetails/ProfileResetPassword";
import { AuthContext } from "../../context/authContext";

const Profile = () => {
  const {
    state: { user },
  } = useContext(AuthContext);

  return (
    <Fragment>
      <Typography
        variant="h4"
        component="h1"
        style={{ marginBottom: "1rem", fontWeight: "500" }}
      >
        Welcome back, {user?.email.split("@")[0]}!
      </Typography>
      <ProfileDetails />
      <ProfileResetPassword />
    </Fragment>
  );
};

export default Profile;
