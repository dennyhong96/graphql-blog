import React, { Fragment } from "react";
import { Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Container from "@material-ui/core/Container";
import "react-toastify/dist/ReactToastify.css";

import PrivateRoute from "./components/routes/PrivateRoute";
import Route from "./components/routes/Route";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import CompleteRegister from "./pages/auth/CompleteRegister";
import ForgetPassword from "./pages/auth/ForgetPassword";
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
          <Route exact path="/complete-register" component={CompleteRegister} />
          <Route exact path="/password-forget" component={ForgetPassword} />
          <PrivateRoute
            exact
            path="/dashboard/:subroute"
            component={Dashboard}
          />
        </Switch>
      </Container>
      <ToastContainer bodyStyle={{ fontFamily: "'Rubik', sans-serif" }} />
    </Fragment>
  );
};

export default App;
