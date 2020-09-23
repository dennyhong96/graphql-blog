require("dotenv").config({ path: "./config/config.env" });
const path = require("path");
const express = require("express");
const http = require("http");
const { ApolloServer } = require("apollo-server-express");
const {
  makeExecutableSchema,
  mergeTypeDefs,
  mergeResolvers,
  loadFilesSync,
} = require("graphql-tools");

const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(cors(process.env.CLIENT_URL));
}

// Merge typeDefs and resolvers
const typeDefs = mergeTypeDefs(
  loadFilesSync(path.join(__dirname, "graphql", "typeDefs"))
);
const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "graphql", "resolvers"))
);

// Create Apollo Server
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
});

// applyMiddleware connects ApolloServer to Express app
apolloServer.applyMiddleware({
  app,
});

// Create a server for rest endpoints
const httpServer = http.createServer(app);

app.get("/", (req, res) => {
  res.send("Hello");
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is up at http://localhost:${port}...`);
  console.log(
    `GraphQL server is up at http://localhost:${port}${apolloServer.graphqlPath}...`
  );
});

/*

// imports
const { makeExecutableSchema } = require("graphql-tools")
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge")
const { loadFilesSync } = require("@graphql-tools/load-files")

// usage
const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, "./schema")));
const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "./resolvers"))
);

*/
