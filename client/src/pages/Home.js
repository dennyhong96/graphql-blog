import React, { Fragment } from "react";
import { useQuery } from "@apollo/client";

import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";

import PostCard from "../components/posts/PostCard";
import PostCardSkeleton from "../components/posts/PostCardSkeleton";
import { ListPosts } from "../apollo/queries/posts";

const Home = () => {
  const { loading, error, data } = useQuery(ListPosts);

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <Fragment>
      <Grid container spacing={4}>
        {/* Show skeleton cards when loading */}
        {loading &&
          Array.from({ length: 8 }).map((_, idx) => (
            <Fade in={loading} timeout={250} key={idx}>
              <Grid item xs={4}>
                <PostCardSkeleton />
              </Grid>
            </Fade>
          ))}

        {/* Show cards */}
        {!loading &&
          !error &&
          data &&
          data.listPosts.map((post) => (
            <Fade
              in={!loading && !error && !!data}
              timeout={750}
              key={post._id}
            >
              <Grid item xs={12} sm={6} md={4}>
                <PostCard post={post} />
              </Grid>
            </Fade>
          ))}
      </Grid>
    </Fragment>
  );
};

export default Home;
