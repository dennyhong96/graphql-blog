import React, { Fragment, useContext, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { toast } from "react-toastify";

import Typography from "@material-ui/core/Typography";

import ProfileDetails from "../../components/dashboard/ProfileDetails";
import ProfileResetPassword from "../../components/dashboard/ProfileResetPassword";
import { AuthContext } from "../../context/authContext";

const GetUser = gql`
  query GetUser {
    getUser {
      _id
      username
      name
      email
      images {
        url
        public_id
      }
      about
      createdAt
      updatedAt
    }
  }
`;

const Profile = () => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const { data, loading, error } = useQuery(GetUser);

  console.log(data);

  return (
    <Fragment>
      <Typography variant="h4" component="h1" style={{ marginBottom: "1rem" }}>
        Welcome back, {user?.email.split("@")[0]}!
      </Typography>
      <ProfileDetails />
      <ProfileResetPassword />
    </Fragment>
  );
};

export default Profile;
