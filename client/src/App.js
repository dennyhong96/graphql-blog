import React, { Fragment } from "react";

import Navbar from "./components/ui/Navbar";
import Home from "./pages/Home";
import Container from "@material-ui/core/Container";

const App = () => {
  return (
    <Fragment>
      <Navbar />
      <Container style={{ paddingTop: "2rem" }}>
        <Home />
      </Container>
    </Fragment>
  );
};

export default App;
