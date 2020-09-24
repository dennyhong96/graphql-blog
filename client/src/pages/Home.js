import React, { Fragment, useContext } from "react";
import { useQuery, gql } from "@apollo/client";

import { AuthContext } from "../context/authContext";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";

const POSTS = gql`
  query ListPosts {
    listPosts {
      id
      title
      description
    }
  }
`;

const Home = () => {
  const { loading, error, data } = useQuery(POSTS);
  const { state, dispatch } = useContext(AuthContext);

  const handleClick = () => {
    dispatch({
      type: "LOGGED_IN_USER",
      payload: "Denny",
    });
  };

  return (
    <Fragment>
      <Grid container spacing={2}>
        {/* Show skeleton cards when loading */}
        {loading &&
          Array.from({ length: 6 }).map((_, idx) => (
            <Grid key={idx} item xs={4}>
              <Skeleton
                variant="rect"
                height="2rem"
                style={{ marginBottom: "0.5rem" }}
              />
              <Skeleton variant="rect" height="7rem" />
            </Grid>
          ))}

        {/* Show cards */}
        {!loading &&
          !error &&
          data &&
          data.listPosts.map((post) => (
            <Grid item key={post.id} xs={4}>
              <Card>
                <CardContent>
                  <Typography>{post.title}</Typography>
                  <Typography>{post.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
      {JSON.stringify(state)}
      <button onClick={handleClick}>click</button>
    </Fragment>
  );
};

export default Home;
