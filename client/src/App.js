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
import Dashboard from "./pages/dashboard/Dashboard";
import CompleteRegister from "./pages/auth/CompleteRegister";
import ForgetPassword from "./pages/auth/ForgetPassword";
import UserList from "./pages/users/UserList";
import UserPublicProfile from "./pages/users/UserPublicProfile";
import "./App.css";

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Container style={{ paddingTop: "2rem" }}>
        <Switch>
          <PublicRoute exact path="/register" component={Register} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute
            exact
            path="/complete-register"
            component={CompleteRegister}
          />
          <PublicRoute
            exact
            path="/password-forget"
            component={ForgetPassword}
          />
          <Route exact path="/users" component={UserList} />
          <Route exact path="/users/:username" component={UserPublicProfile} />
          <PrivateRoute
            exact
            path="/dashboard/:subroute"
            component={Dashboard}
          />
          <Route exact path="/" component={Home} />
        </Switch>
      </Container>
      <ToastContainer bodyStyle={{ fontFamily: "'Rubik', sans-serif" }} />
    </Fragment>
  );
};

export default App;
