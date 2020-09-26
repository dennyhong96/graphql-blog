import React, { Fragment } from "react";
import { Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Container from "@material-ui/core/Container";
import "react-toastify/dist/ReactToastify.css";

import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import Route from "./components/routes/Route";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import CompleteRegister from "./pages/auth/CompleteRegister";
import "./App.css";

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Container style={{ paddingTop: "2rem" }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <PublicRoute exact path="/register" component={Register} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute
            exact
            path="/complete-register"
            component={CompleteRegister}
          />
          <PrivateRoute
            exact
            path="/dashboard/:subroute"
            component={Dashboard}
          />
        </Switch>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};

export default App;
