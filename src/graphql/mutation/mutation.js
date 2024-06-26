import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      access_token
      expires_in
      refresh_token
      refresh_expires_in
      roles
    }
  }
`;

export const REFRESH = gql`
  mutation Refresh($refresh_token: String!) {
    refresh(refresh_token: $refresh_token) {
      access_token
      expires_in
      refresh_token
      refresh_expires_in
      roles
    }
  }
`;

export const CREATE_BOOK = gql`
mutation CreateBook($input: BuchInput!) {
  create(input: $input) {
    id
  }
}
`;
