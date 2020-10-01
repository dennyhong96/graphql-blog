import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import ImageFadeIn from "react-image-fade-in";
import parse from "html-react-parser";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";

import { GetPost } from "../../apollo/queries/posts";

const Post = () => {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GetPost, { variables: { id } });

  if (loading) return "loading";
  if (error) return error.message;

  return (
    data && (
      <Grid container justify="center">
        <Grid item xs={11} sm={9} md={8}>
          <Paper style={{ padding: "4rem 3rem" }} elevation={3}>
            <Typography
              variant="h4"
              component="h1"
              style={{ fontWeight: 500 }}
              paragraph
              align="center"
            >
              {data.getPost.title}
            </Typography>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "2rem",
              }}
            >
              <Avatar
                src={data.getPost.postedBy.images[0].url}
                style={{ marginRight: "0.5rem", width: 25, height: 25 }}
              />
              <Typography variant="body2" style={{ margin: 0 }}>
                @{data.getPost.postedBy.username}
              </Typography>
              <span style={{ margin: "0 0.5rem" }}>-</span>
              <Typography variant="body2" style={{ margin: 0 }}>
                {new Date(data.getPost.createdAt).toLocaleDateString()}
              </Typography>
            </div>

            <ImageFadeIn
              src={data.getPost.image.url}
              height={200}
              style={{
                height: 200,
                width: "80%",
                objectFit: "cover",
                display: "block",
                borderRadius: 10,
                margin: "0 auto 2rem",
              }}
            />
            <div>{parse(data.getPost.content)}</div>
          </Paper>
        </Grid>
      </Grid>
    )
  );
};

export default Post;
