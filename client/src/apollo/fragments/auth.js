import { gql } from "@apollo/client";

export const UserInfo = gql`
  fragment userInfo on User {
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
`;
