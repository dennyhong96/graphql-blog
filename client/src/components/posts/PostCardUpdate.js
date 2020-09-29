import React, { useState, Fragment } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import ChipInput from "material-ui-chip-input";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";
import ShareIcon from "@material-ui/icons/Share";

import PostEditor from "./PostEditor";
import PostImageUpdate from "./PostEditor";

const PostCardUpdate = (post) => {
  const [title, setTitle] = useState(post.title);
  const [image, setImage] = useState(null);
  const [content, setContent] = useState(post.content);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState(post.tags);
  const [showDropZone, setShowDropZone] = useState(true);

  return (
    <Box>
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

        {/* Post button */}
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

      {/* Post title input */}
      <TextField
        id="create-post-title"
        label="Give your post a title"
        fullWidth
        value={title}
        onChange={(evt) => setTitle(evt.target.value)}
        inputProps={{ type: "text" }}
        style={{ marginBottom: "1rem" }}
        disabled={loading}
      />

      {/* Post tags input */}
      <ChipInput
        value={tags}
        fullWidth
        label="Add post tags"
        placeholder="Type and press enter to add tags"
        style={{ marginBottom: "1rem" }}
        onChange={setTags}
      />

      {/* Post image upload */}
      {showDropZone && (
        <PostImageUpdate
          image={image}
          handleFiles={(imgs) => setImage(imgs.length ? imgs[0] : null)}
        />
      )}
      <PostEditor content={content} setContent={setContent} />
    </Box>
  );
};

export default PostCardUpdate;
