import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

import ProfileImages from "../../components/dashboard/profileDetails/ProfileImages";
import { GetPublicProfile } from "../../apollo/queries/auth";

const UserPublicProfile = () => {
  const { username } = useParams();
  console.log(username);
  const { data, loading, error } = useQuery(GetPublicProfile, {
    variables: { username },
  });

  return (
    !loading &&
    !error &&
    data && (
      <Grid container>
        <Hidden xsDown>
          <Grid item sm={1} md={2} />
        </Hidden>
        <Grid item xs={12} sm={10} md={8}>
          <Box>
            <Typography variant="h4" component="h1" style={{ fontWeight: 500 }}>
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
    )
  );
};

export default UserPublicProfile;
