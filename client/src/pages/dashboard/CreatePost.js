import React, { useState, Fragment } from "react";
import { toast } from "react-toastify";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

import ShareIcon from "@material-ui/icons/Share";

import PostEditor from "../../components/posts/PostEditor";
import PostImageUpdate from "../../components/posts/PostImageUpdate";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      console.log(title, images, content);
      if (!(title && content)) {
        return toast.error("Title and content are required.");
      }
    } catch (error) {}
    setLoading(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container justify="space-between">
        <Grid item>
          <Typography
            variant="h4"
            component="h1"
            style={{ marginBottom: "1rem", fontWeight: "500" }}
          >
            Create a post!
          </Typography>
        </Grid>
        <Grid item>
          <Button
            disabled={loading || !(title && content)}
            type="submit"
            variant="contained"
            color="primary"
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              <Fragment>
                <ShareIcon style={{ marginRight: 3, fontSize: 20 }} />{" "}
                <span style={{ marginTop: 5 }}>Post</span>
              </Fragment>
            )}
          </Button>
        </Grid>
      </Grid>
      <TextField
        id="create-post-title"
        label="Give your post a title"
        fullWidth
        value={title}
        onChange={(evt) => setTitle(evt.target.value)}
        style={{ marginBottom: "1rem" }}
        inputProps={{ type: "text" }}
        disabled={loading}
      />
      <PostImageUpdate images={images} handleFiles={setImages} />
      <PostEditor content={content} setContent={setContent} />
    </Box>
  );
};

export default CreatePost;
