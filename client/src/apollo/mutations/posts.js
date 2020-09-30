import { gql } from "@apollo/client";

import { PostInfo } from "../fragments/posts";

export const CreatePost = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      ...postInfo
    }
  }
  ${PostInfo}
`;

export const DeletePost = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      ...postInfo
    }
  }
  ${PostInfo}
`;

export const UpdatePost = gql`
  mutation UpdatePost($input: UpdatePostInput!) {
    updatePost(input: $input) {
      ...postInfo
    }
  }
  ${PostInfo}
`;
