import { gql } from "@apollo/client";

export const ListPosts = gql`
  query ListPosts {
    listPosts {
      _id
      title
      content
      tags
      image {
        url
        key
      }
      postedBy {
        _id
        username
        name
        email
        images {
          url
          key
        }
        about
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
