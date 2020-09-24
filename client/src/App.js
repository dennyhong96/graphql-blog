import React, { Fragment } from "react";
import { Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Container from "@material-ui/core/Container";
import "react-toastify/dist/ReactToastify.css";

import Route from "./components/routes/RouteWithProgress/RouteWithProgress";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import "./App.css";

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Container style={{ paddingTop: "2rem" }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Container>
      <ToastContainer />
    </Fragment>
  );
};

export default App;
