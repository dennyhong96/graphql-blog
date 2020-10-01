import { gql } from "@apollo/client";

import { PostInfo } from "../fragments/posts";

export const ListPosts = gql`
  query ListPosts($numPage: Int, $numLimit: Int) {
    listPosts(numPage: $numPage, numLimit: $numLimit) {
      ...postInfo
    }
  }
  ${PostInfo}
`;

export const ListPostsByUser = gql`
  query ListPostsByUser($username: String!) {
    listPostsByUser(username: $username) {
      ...postInfo
    }
  }
  ${PostInfo}
`;

export const GetPost = gql`
  query getPost($id: ID!) {
    getPost(id: $id) {
      ...postInfo
    }
  }
  ${PostInfo}
`;
