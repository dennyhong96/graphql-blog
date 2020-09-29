import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Fade from "@material-ui/core/Fade";

import ProfileImages from "../../components/dashboard/profileDetails/ProfileImages";
import PostCard from "../../components/posts/PostCard";
import PostCardSkeleton from "../../components/posts/PostCardSkeleton";
import { GetPublicProfile } from "../../apollo/queries/auth";
import { ListPostsByUser } from "../../apollo/queries/posts";

const UserPublicProfile = () => {
  const { username } = useParams();

  const { data, loading, error } = useQuery(GetPublicProfile, {
    variables: { username },
  });

  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
  } = useQuery(ListPostsByUser, { variables: { username } });

  return (
    !loading &&
    !error &&
    data && (
      <Fragment>
        <Grid container>
          <Hidden xsDown>
            <Grid item sm={1} md={2} />
          </Hidden>
          <Grid item xs={12} sm={10} md={8}>
            <Box>
              <Typography
                variant="h4"
                component="h1"
                style={{ fontWeight: 500 }}
              >
                @{data.getPublicProfile.username}
              </Typography>
              <Typography variant="h5" component="h2">
                <span style={{ fontWeight: 500 }}>Name: </span>
                {data.getPublicProfile.name || "anonymous"}
              </Typography>
              <Typography paragraph>
                <span style={{ fontWeight: 500 }}>About:</span>{" "}
                {data.getPublicProfile.about || "No about section yet."}
              </Typography>
              <ProfileImages images={data.getPublicProfile.images} />
            </Box>
          </Grid>
          <Hidden xsDown>
            <Grid item sm={1} md={2} />
          </Hidden>
        </Grid>

        {/* User's posts */}
        <Typography
          component="h2"
          style={{ fontWeight: 500, fontSize: "1.5rem" }}
          align="center"
          paragraph
        >
          @{data.getPublicProfile.username} 's Posts:
        </Typography>
        <Grid container spacing={4}>
          {/* Show skeleton cards when loading */}
          {postsLoading &&
            Array.from({ length: 8 }).map((_, idx) => (
              <Fade in={postsLoading} timeout={250} key={idx}>
                <Grid item xs={4}>
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
                <Grid item xs={12} sm={6} md={4}>
                  <PostCard post={post} />
                </Grid>
              </Fade>
            ))}
        </Grid>
      </Fragment>
    )
  );
};

export default UserPublicProfile;
