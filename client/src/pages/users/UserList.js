import React, { Fragment } from "react";
import { useQuery } from "@apollo/client";

import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";

import UserCard from "../../components/users/UserCard";
import UserCardSkeleton from "../../components/users/UserCardSkeleton";
import { ListUsers } from "../../apollo/queries/auth";

const UserList = () => {
  const { loading, error, data } = useQuery(ListUsers);

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
                <UserCardSkeleton />
              </Grid>
            </Fade>
          ))}

        {/* Show cards */}
        {!loading &&
          !error &&
          data &&
          data.listUsers.map((user) => (
            <Fade
              in={!loading && !error && !!data}
              timeout={750}
              key={user._id}
            >
              <Grid item xs={12} sm={6} md={4}>
                <UserCard user={user} />
              </Grid>
            </Fade>
          ))}
      </Grid>
    </Fragment>
  );
};

export default UserList;
