require("dotenv").config({ path: "./config/config.env" });

const express = require("express");
const http = require("http");
const { ApolloServer } = require("apollo-server-express");

const morgan = require("morgan");
const cors = require("cors");

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(cors(process.env.CLIENT_URL));
}

// Query, Mutation, Subscription types
const typeDefs = `
  type Query {
    totalPosts: Int!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    totalPosts: () => 42,
  },
};

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
