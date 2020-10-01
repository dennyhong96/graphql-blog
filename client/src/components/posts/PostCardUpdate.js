import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import axios from "axios";
import ImageFadeIn from "react-image-fade-in";
import resizeFile from "../../utils/resizeFile";
import { motion, AnimatePresence } from "framer-motion";

import TextField from "@material-ui/core/TextField";
import ChipInput from "material-ui-chip-input";
import CircularProgress from "@material-ui/core/CircularProgress";
import Box from "@material-ui/core/Box";

import { UpdatePost } from "../../apollo/mutations/posts";
import { UpdatePostContext } from "../../context/postUpdateContext";
import { AuthContext } from "../../context/authContext";
import PostEditor from "./PostEditor";
import PostImageUpdate from "./PostImageUpdate";
import Dialog from "../ui/Dialog";

const variants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
  exit: {
    opacity: 0,
  },
};

const PostCardUpdate = () => {
  const {
    state: { post },
    setState,
  } = useContext(UpdatePostContext);
  const {
    state: { user },
  } = useContext(AuthContext);

  const [updatePost] = useMutation(UpdatePost);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.content);
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState(post?.tags);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setTags(post.tags);
    }
  }, [post]);

  const handleUpdate = async () => {
    setLoading(true);

    try {
      let newImageObj;
      if (newImage) {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/images/posts`,
          { image: await resizeFile(newImage) },
          {
            headers: {
              authorization: `Bearer ${user?.token}`,
            },
          }
        );
        newImageObj = res.data.data.image;
      }

      // Individual entity cache is updated automatically if _id field is returned
      const updateInput = {
        id: post._id,
        title,
        content,
        tags,
      };

      if (newImageObj) {
        updateInput.image = newImageObj;
      }

      await updatePost({
        variables: {
          input: updateInput,
        },
      });

      toast.success(`${post.title} is successfully updated.`);
      setState({ post: null });
    } catch (error) {
      console.error("[UPDATE POST ERROR]", error);
      toast.error(error.message);
    }
    setLoading(false);
  };

  return (
    <Dialog
      disabled={!(title && content)}
      loading={loading}
      open={!!post}
      confirmButtonText={loading ? <CircularProgress size={24} /> : "Update"}
      title="Update Post"
      handleClose={() => setState({ post: false })}
      handleConfirm={handleUpdate}
    >
      <AnimatePresence>
        {post && (
          <motion.div
            variants={variants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
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
              defaultValue={tags}
              // value={tags}
              fullWidth
              label="Add post tags"
              placeholder="Type and press enter to add tags"
              style={{ marginBottom: "1rem" }}
              onChange={setTags}
            />

            {post.image && (
              <ImageFadeIn
                width={200}
                height={100}
                duration={1000}
                src={post.image.url}
                alt={post.title}
                style={{
                  display: "block",
                  width: 200,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 10,
                  marginBottom: "1rem",
                }}
              />
            )}

            {/* Post image upload */}
            <PostImageUpdate
              handleFiles={(imgs) => setNewImage(imgs.length ? imgs[0] : null)}
              isUpdate
            />
            <PostEditor content={content} setContent={setContent} />
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  );
};

export default PostCardUpdate;
