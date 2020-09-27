import { gql } from "@apollo/client";

export const ListPosts = gql`
  query ListPosts {
    listPosts {
      id
      title
      description
    }
  }
`;
