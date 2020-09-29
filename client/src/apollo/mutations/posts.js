import { gql } from "@apollo/client";

export const CreatePost = gql`
  mutation CreatePost($input: CreatePostInput!) {
    createPost(input: $input) {
      title
      content
      tags
      image {
        url
        key
      }
    }
  }
`;
