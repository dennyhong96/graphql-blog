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

export const ListUsers = gql`
  query ListUsers {
    listUsers {
      ...userInfo
    }
  }
  ${UserInfo}
`;

export const GetPublicProfile = gql`
  query GetPublicProfile($username: String!) {
    getPublicProfile(username: $username) {
      ...userInfo
    }
  }
  ${UserInfo}
`;
