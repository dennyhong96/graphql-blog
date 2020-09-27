import { gql } from "@apollo/client";

import { UserInfo } from "../fragments/auth";

export const UpdateUser = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      ...userInfo
    }
  }
  ${UserInfo}
`;

export const CreateUser = gql`
  mutation CreateUser {
    createUser {
      username
      email
    }
  }
`;
