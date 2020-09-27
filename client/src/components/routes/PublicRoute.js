import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";

import useNProgress from "../../hooks/useNProgress";
import { AuthContext } from "../../context/authContext";

const ProgressRoute = ({ component: Component, ...rest }) => {
  const {
    state: { user },
  } = useContext(AuthContext);

  useNProgress();

  return localStorage.getItem("AUTH_TOKEN") || user ? (
    <Redirect to="/dashboard/profile" />
  ) : (
    <Route {...rest} component={Component} />
  );
};

export default ProgressRoute;
