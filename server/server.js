require("dotenv").config({ path: "./config/config.env" });
const path = require("path");
// const http = require("http");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const {
  makeExecutableSchema,
  mergeTypeDefs,
  mergeResolvers,
  loadFilesSync,
} = require("graphql-tools");
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./config/db");
const imageRouter = require("./routes/image");

const app = express();
connectDB();

// Middlewares
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb", type: "application/json" }));
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
}

app.use("/api/v1/images", imageRouter);

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
  context: ({ req, res }) => ({ req, res }),
});

// applyMiddleware connects ApolloServer to Express app
apolloServer.applyMiddleware({ app });

// Create a server for rest endpoints
// const httpServer = http.createServer(app);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is up at http://localhost:${port}...`);
  console.log(
    `GraphQL server is up at http://localhost:${port}${apolloServer.graphqlPath}...`
  );
});
