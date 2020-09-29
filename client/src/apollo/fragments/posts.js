import { gql } from "@apollo/client";

export const PostInfo = gql`
  fragment postInfo on Post {
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
`;
