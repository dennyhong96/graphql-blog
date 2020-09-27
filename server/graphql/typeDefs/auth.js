const { gql } = require("apollo-server-express");

module.exports = gql`
  # scalar type
  scalar DateTime

  type User {
    _id: ID!
    username: String!
    name: String
    email: String!
    images: [Image]!
    about: String
    createdAt: DateTime!
    updatedAt: DateTime!
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

  # UpdateUser
  input UpdateUserInput {
    username: String
    name: String
    about: String
    images: [ImageInput]
  }

  input ImageInput {
    url: String
    public_id: String
  }

  type Query {
    getUser: User!
  }

  type Mutation {
    createUser: CreateUserResponse!
    updateUser(input: UpdateUserInput): User!
  }
`;
