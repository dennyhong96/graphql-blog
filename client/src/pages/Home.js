import React, { Fragment, useState, useEffect, useContext } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";

import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";
import Pagination from "@material-ui/lab/Pagination";

import { PostSearchContext } from "../context/postSearchResult";
import PostCard from "../components/posts/PostCard";
import PostCardSkeleton from "../components/posts/PostCardSkeleton";
import { ListPosts, CountPosts } from "../apollo/queries/posts";

const NUM_LIMIT = 6;

const Home = () => {
  const [page, setPage] = useState(1);
  const {
    state: { searchedResults },
  } = useContext(PostSearchContext);

  const { data: countData } = useQuery(CountPosts, { pollInterval: 10000 });
  const [listPosts, { data, error, loading }] = useLazyQuery(ListPosts, {
    variables: { numPage: page, numLimit: NUM_LIMIT },
  });

  useEffect(() => {
    listPosts();
  }, [page, listPosts]);

  const handlePageChange = (_, page) => {
    setPage(page);
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
            {searchedResults.length ? (
              searchedResults.map((post) => (
                <Fade
                  in={!loading && !error && !!data}
                  timeout={750}
                  key={post._id}
                >
                  <Grid item xs={12} sm={6} md={4}>
                    <PostCard post={post} />
                  </Grid>
                </Fade>
              ))
            ) : (
              <Fragment>
                {/* Show skeleton cards when loading */}
                {loading &&
                  Array.from({ length: 6 }).map((_, idx) => (
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
              </Fragment>
            )}
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
