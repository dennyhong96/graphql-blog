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
import { ListPostsByUser, ListPosts } from "../../apollo/queries/posts";
import PostEditor from "../../components/posts/PostEditor";
import PostImageUpdate from "../../components/posts/PostImageUpdate";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState([]);
  const [showDropZone, setShowDropZone] = useState(true);

  // Mutation with cache update
  const [createPost] = useMutation(CreatePostMutation, {
    update: (cache, { data: { createPost } }) => {
      try {
        // Read Query from cache (user's posts)
        const { listPostsByUser } = cache.readQuery({
          query: ListPostsByUser,
          variables: { username: createPost.postedBy.username },
        });

        // Write mutation data to cache (user's posts)
        cache.writeQuery({
          query: ListPostsByUser,
          data: { listPostsByUser: [createPost, ...listPostsByUser] },
          variables: { username: createPost.postedBy.username },
        });
      } catch (error) {
        // Handle listPostsByUser query not executed yet
        console.error(
          "[CERATE POST UPDATE CACHE FAILED - ListPostsByUser QUERY]"
        );
      }

      try {
        // Read Query from cache (all posts)
        const { listPosts } = cache.readQuery({ query: ListPosts });
        // Write mutation data to cache (all posts)
        cache.writeQuery({
          query: ListPosts,
          data: { listPosts: [createPost, ...listPosts] },
        });
      } catch (error) {
        // Handle listPosts query not executed yet
        console.error("[CERATE POST UPDATE CACHE FAILED - ListPosts QUERY]");
      }
    },
  });

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

      // Reset inputs
      setTitle("");
      setContent("");
      setTags([]);
      setImage(null);

      // Reset dropzone
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
