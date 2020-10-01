import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  split,
  HttpLink,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: `${process.env.REACT_APP_API_URL}/graphql`,
});

const wsLink = new WebSocketLink({
  uri: `${process.env.REACT_APP_WS_URL}/graphql`,
  options: {
    reconnect: true,
  },
});

// The split function takes three parameters:
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitedLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

// Authorization
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("AUTH_TOKEN");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

// To remove __typename in mutations
// https://github.com/apollographql/apollo-feature-requests/issues/6#issuecomment-676886539
const cleanTypeName = new ApolloLink((operation, forward) => {
  if (operation.variables) {
    const omitTypename = (key, value) =>
      key === "__typename" ? undefined : value;
    operation.variables = JSON.parse(
      JSON.stringify(operation.variables),
      omitTypename
    );
  }

  return forward(operation).map((data) => {
    return data;
  });
});

export default new ApolloClient({
  link: ApolloLink.from([cleanTypeName, authLink, splitedLink]),
  cache: new InMemoryCache(),
});
