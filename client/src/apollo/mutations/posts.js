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
