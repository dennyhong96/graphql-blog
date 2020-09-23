const { gql } = require("apollo-server-express");

module.exports = gql`
  type Post {
    id: ID!
    title: String!
    description: String!
  }

  # input types
  input CreatePostInput {
    title: String!
    description: String!
  }

  type Query {
    totalPosts: Int!
    listPosts: [Post!]!
  }

  # Mutation
  type Mutation {
    createPost(input: CreatePostInput!): Post!
  }
`;
