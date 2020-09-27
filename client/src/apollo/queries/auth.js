import { gql } from "@apollo/client";

import { UserInfo } from "../fragments/auth";

export const GetUser = gql`
  query GetUser {
    getUser {
      ...userInfo
    }
  }
  ${UserInfo}
`;
