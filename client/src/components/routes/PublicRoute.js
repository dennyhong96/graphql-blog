import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import useNProgress from "../../hooks/useNProgress";
import { AuthContext } from "../../context/authContext";

const ProgressRoute = ({ component: Component, ...rest }) => {
  const {
    state: { user },
  } = useContext(AuthContext);

  useNProgress();

  return user || localStorage.getItem("AUTH_TOKEN") ? (
    <Redirect to="/" />
  ) : (
    <Route {...rest} component={Component} />
  );
};

export default ProgressRoute;
