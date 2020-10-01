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
  query GetPost($id: ID!) {
    getPost(id: $id) {
      ...postInfo
    }
  }
  ${PostInfo}
`;

export const CountPosts = gql`
  query CountPosts {
    countPosts
  }
`;

export const SearchPosts = gql`
  query SearchPosts($term: String!) {
    searchPosts(term: $term) {
      ...postInfo
    }
  }
  ${PostInfo}
`;
