import React, { useContext } from "react";

import { AuthContext } from "../../context/authContext";

const Profile = () => {
  const {
    state: { user },
  } = useContext(AuthContext);

  return <h1>Welcome back, {user?.email.split("@")[0]}!</h1>;
};

export default Profile;
