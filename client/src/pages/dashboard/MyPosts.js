import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useLazyQuery } from "@apollo/client";

import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";

import PostCard from "../../components/posts/PostCard";
import PostCardSkeleton from "../../components/posts/PostCardSkeleton";
import { ListPostsByUser } from "../../apollo/queries/posts";
import { GetUser } from "../../apollo/queries/auth.js";

const MyPost = () => {
  const { data } = useQuery(GetUser);

  const [
    listPostsByUser,
    { data: postsData, loading: postsLoading, error: postsError },
  ] = useLazyQuery(ListPostsByUser);

  useEffect(() => {
    if (data && data.getUser) {
      listPostsByUser({ variables: { username: data.getUser.username } });
    }
  }, [data]);

  return (
    <Grid container spacing={4}>
      {/* Show skeleton cards when loading */}
      {postsLoading &&
        Array.from({ length: 8 }).map((_, idx) => (
          <Fade in={postsLoading} timeout={250} key={idx}>
            <Grid item xs={12} sm={6}>
              <PostCardSkeleton />
            </Grid>
          </Fade>
        ))}

      {/* Show cards */}
      {!postsLoading &&
        !postsError &&
        postsData &&
        postsData.listPostsByUser.map((post) => (
          <Fade
            in={!postsLoading && !postsError && !!postsData}
            timeout={750}
            key={post._id}
          >
            <Grid item xs={12} sm={6}>
              <PostCard post={post} />
            </Grid>
          </Fade>
        ))}
    </Grid>
  );
};

export default MyPost;
