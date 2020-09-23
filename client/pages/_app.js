import { ApolloProvider } from "@apollo/client";
import { ThemeProvider, CssBaseline } from "@material-ui/core";

import Navbar from "../components/Navbar";
import { useApollo } from "../lib/apolloClient";
import theme from "../styles/theme";

function MyApp({ Component, pageProps }) {
  const client = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
