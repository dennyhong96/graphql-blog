import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/authContext";
import App from "./App";
import theme from "./mui/theme";
import client from "./apollo/client";

ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </ApolloProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
