import React, { useState, Fragment } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";

import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ChipInput from "material-ui-chip-input";
import CircularProgress from "@material-ui/core/CircularProgress";

import ShareIcon from "@material-ui/icons/Share";

import { uploadPostImage } from "../../utils/restRequests";
import { CreatePost as CreatePostMutation } from "../../apollo/mutations/posts";
import PostEditor from "../../components/posts/PostEditor";
import PostImageUpdate from "../../components/posts/PostImageUpdate";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [showDropZone, setShowDropZone] = useState(true);
  const [createPost] = useMutation(CreatePostMutation);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      // Handle missing fields
      if (!(title && content)) {
        return toast.error("Title and content are required.");
      }

      // Update post image
      let uploadedImg;
      if (image) {
        uploadedImg = await uploadPostImage(image);
      }

      // Post to DB
      const createPostRes = await createPost({
        variables: {
          input: {
            title,
            content,
            tags,
            image: uploadedImg,
          },
        },
      });

      toast.success(
        `Post "${createPostRes.data.createPost.title}" has been successfully publishsed.`
      );

      setTitle("");
      setContent("");
      setTags([]);
      setImage(null);
      setShowDropZone(false);
      setTimeout(() => {
        setShowDropZone(true);
      }, 0);
    } catch (error) {
      console.error("[CREATE POST ERROR]", error);
      toast.error(error.message);
    }

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

export default CreatePost;
