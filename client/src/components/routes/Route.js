import React from "react";
import { Route } from "react-router-dom";

import useNProgress from "../../hooks/useNProgress";

const ProgressRoute = (props) => {
  useNProgress();

  return <Route {...props} />;
};

export default ProgressRoute;
