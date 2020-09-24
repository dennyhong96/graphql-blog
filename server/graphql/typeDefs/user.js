const { gql } = require("apollo-server-express");

module.exports = gql`
  type User {
    username: String!
    name: String
    email: String!
    images: [Image]
    about: String
  }

  type Image {
    url: String
    public_id: String
  }

  # CreateUser
  type CreateUserResponse {
    username: String!
    email: String!
  }

  type Query {
    getUser: User!
  }

  type Mutation {
    createUser: CreateUserResponse!
  }
`;
