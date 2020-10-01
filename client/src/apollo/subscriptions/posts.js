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
