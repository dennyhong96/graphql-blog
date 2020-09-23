import React from "react";
import { useQuery, gql } from "@apollo/client";

const POSTS = gql`
  query ListPosts {
    listPosts {
      id
      title
      description
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(POSTS);
  console.log(data);
  return <div>Hello</div>;
};

export default App;
