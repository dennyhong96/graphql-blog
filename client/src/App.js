import React, { Fragment } from "react";
import { Switch } from "react-router-dom";

import Container from "@material-ui/core/Container";

import Route from "./components/routes/RouteWithProgress";
import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import Register from "./pages/auth/Register";

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Container style={{ paddingTop: "2rem" }}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </Container>
    </Fragment>
  );
};

export default App;
