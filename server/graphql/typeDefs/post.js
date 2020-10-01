const { gql } = require("apollo-server-express");

module.exports = gql`
  # Scalar type
  scalar DateTime

  type Post {
    _id: ID!
    title: String!
    content: String!
    tags: [String!]!
    image: Image! # Type defined in auth typeDef
    postedBy: User! # Type defined in auth typeDef
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  # input types
  input CreatePostInput {
    title: String!
    content: String!
    tags: [String!]!
    image: ImageInput
  }

  input UpdatePostInput {
    id: ID!
    title: String!
    content: String!
    tags: [String!]!
    image: ImageInput
  }

  type Query {
    listPosts(numPage: Int, numLimit: Int): [Post!]!
    listPostsByUser(username: String!): [Post!]!
    getPost(id: ID!): Post!
    countPosts: Int!
    searchPosts(term: String!): [Post!]!
  }

  # Mutation
  type Mutation {
    createPost(input: CreatePostInput!): Post!
    updatePost(input: UpdatePostInput): Post!
    deletePost(id: ID!): Post!
  }
`;
