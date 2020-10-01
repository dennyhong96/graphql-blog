import React, { Fragment, useState } from "react";
import { useQuery, useSubscription } from "@apollo/client";

import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";
import Pagination from "@material-ui/lab/Pagination";

import PostCard from "../components/posts/PostCard";
import PostCardSkeleton from "../components/posts/PostCardSkeleton";
import { ListPosts, CountPosts } from "../apollo/queries/posts";
import {
  OnPostCreated,
  OnPostUpdated,
  OnPostDeleted,
} from "../apollo/subscriptions/posts";

const NUM_LIMIT = 6; // Must be in sync with default NUM_LIMIT on server side listPost resolver

const Home = () => {
  const [firstLoad, setFirstLoad] = useState(true);
  const [displayPosts, setDisplayPosts] = useState([]);
  const [page, setPage] = useState(1);

  // Subscribe to new post created
  useSubscription(OnPostCreated, {
    onSubscriptionData({ client, subscriptionData }) {
      const { listPosts } = client.cache.readQuery({ query: ListPosts });
      client.cache.writeQuery({
        query: ListPosts,
        data: {
          listPosts: [...listPosts, subscriptionData.data.onPostCreated],
        },
      });
    },
  });

  // Subscribe to post updated
  // single entity, apollo handle cache update automatically using __typename and id
  useSubscription(OnPostUpdated);

  // Subscribe to post deleted
  useSubscription(OnPostDeleted, {
    onSubscriptionData({ client, subscriptionData }) {
      console.log(subscriptionData);
      console.log(client);
      const { listPosts } = client.cache.readQuery({ query: ListPosts });
      client.cache.writeQuery({
        query: ListPosts,
        data: {
          listPosts: listPosts.filter(
            (p) => p._id !== subscriptionData.data.onPostDeleted._id
          ),
        },
      });
    },
  });

  // Fetch total posts count for pagination, poll every 10 seconds
  const { data: countData } = useQuery(CountPosts, { pollInterval: 10000 });

  // listPosts query with fetchMore
  const { data: listData, fetchMore, error, loading } = useQuery(ListPosts, {
    fetchPolicy: "cache-and-network", // Must for fetchMore
    notifyOnNetworkStatusChange: false,
    onCompleted(data) {
      setDisplayPosts(data.listPosts);
      setFirstLoad(false);
    },
  });

  // Handle page change
  const handlePageChange = (_, newPage) => {
    if (newPage !== page) {
      setPage(newPage);
      fetchMore({
        variables: { numPage: newPage, numLimit: NUM_LIMIT },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          const newPosts = fetchMoreResult.listPosts.filter(
            (p) => !prev.listPosts.find((po) => po._id === p._id)
          );
          return {
            ...prev,
            listPosts: [...prev.listPosts, ...newPosts],
          };
        },
      });
    }
  };

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <Fragment>
      <Grid
        container
        direction="column"
        style={{
          minHeight: `calc(100vh - 64px - 2rem)`,
        }}
      >
        <Grid item>
          <Grid container spacing={4}>
            {/* Render search results if any */}
            <Fragment>
              {/* Show skeleton cards on first loading */}
              {firstLoad &&
                loading &&
                Array.from({ length: 6 }).map((_, idx) => (
                  <Fade in={loading} timeout={250} key={idx}>
                    <Grid item xs={4}>
                      <PostCardSkeleton />
                    </Grid>
                  </Fade>
                ))}

              {/* Show cards */}
              {!error &&
                displayPosts
                  .slice(
                    (page - 1) * NUM_LIMIT,
                    (page - 1) * NUM_LIMIT + NUM_LIMIT
                  )
                  .map((post) => (
                    <Fade
                      in={!loading && !error && !!listData}
                      timeout={750}
                      key={post._id}
                    >
                      <Grid item xs={12} sm={6} md={4}>
                        <PostCard post={post} />
                      </Grid>
                    </Fade>
                  ))}
            </Fragment>
          </Grid>
        </Grid>

        <Grid item style={{ marginTop: "auto", marginBottom: "1rem" }}>
          <Box style={{ display: "flex", marginTop: "1rem" }}>
            {countData && (
              <Pagination
                color="primary"
                style={{ margin: "0 auto" }}
                count={Math.ceil(countData.countPosts / NUM_LIMIT)}
                page={page}
                onChange={handlePageChange}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Home;
