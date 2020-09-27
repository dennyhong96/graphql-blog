import React, { Fragment } from "react";
import { useQuery } from "@apollo/client";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Skeleton from "@material-ui/lab/Skeleton";

import { ListPosts } from "../apollo/queries/posts";

const Home = () => {
  const { loading, error, data } = useQuery(ListPosts);

  if (error) {
    console.log(error.message);
    return <p>{error.message}</p>;
  }

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
              <Card elevation={3}>
                <CardContent>
                  <Typography>{post.title}</Typography>
                  <Typography>{post.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Fragment>
  );
};

export default Home;
