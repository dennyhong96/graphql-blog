import { gql } from "@apollo/client";

import { PostInfo } from "../fragments/posts";

export const OnPostCreated = gql`
  subscription OnPostCreated {
    onPostCreated {
      ...postInfo
    }
  }
  ${PostInfo}
`;

export const OnPostUpdated = gql`
  subscription onPostUpdated {
    onPostUpdated {
      ...postInfo
    }
  }
  ${PostInfo}
`;

export const OnPostDeleted = gql`
  subscription onPostDeleted {
    onPostDeleted {
      ...postInfo
    }
  }
  ${PostInfo}
`;
