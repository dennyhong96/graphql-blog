import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider, CssBaseline } from "@material-ui/core";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import "nprogress/nprogress.css";

import { AuthProvider } from "./context/authContext";
import { UpdatePostProvider } from "./context/postUpdateContext";
import { PostSearchProvider } from "./context/postSearchResult";
import App from "./App";
import theme from "./mui/theme";
import client from "./apollo/client";

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <AuthProvider>
        <PostSearchProvider>
          <UpdatePostProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <App />
            </ThemeProvider>
          </UpdatePostProvider>
        </PostSearchProvider>
      </AuthProvider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
