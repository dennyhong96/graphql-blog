import React, { Fragment, useContext } from "react";
import { formatDistance } from "date-fns";
import ImageFadeIn from "react-image-fade-in";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";

import EditRoundedIcon from "@material-ui/icons/EditRounded";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";

import { DeletePost } from "../../apollo/mutations/posts";
import { ListPosts, ListPostsByUser } from "../../apollo/queries/posts";
import { AuthContext } from "../../context/authContext";
import { UpdatePostContext } from "../../context/postUpdateContext";

const PostCard = ({ post }) => {
  const {
    state: { user: loggedInUser },
  } = useContext(AuthContext);
  const { state, setState } = useContext(UpdatePostContext);

  const [deletePost] = useMutation(DeletePost, {
    update: (cache, { data: { deletePost } }) => {
      try {
        const { listPosts } = cache.readQuery({
          query: ListPosts,
        });

        cache.writeQuery({
          query: ListPosts,
          data: {
            listPosts: listPosts.filter((p) => p._id !== deletePost._id),
          },
        });
      } catch (error) {
        // Handle listPosts query not executed yet
        console.error("[CERATE POST UPDATE CACHE FAILED - ListPosts QUERY]");
      }

      try {
        const { listPostsByUser } = cache.readQuery({
          query: ListPostsByUser,
          variables: { username: deletePost.postedBy.username },
        });

        cache.writeQuery({
          query: ListPostsByUser,
          variables: { username: deletePost.postedBy.username },
          data: {
            listPostsByUser: listPostsByUser.filter(
              (p) => p._id !== deletePost._id
            ),
          },
        });
      } catch (error) {
        // Handle listPosts query not executed yet
        console.error(
          "[CERATE POST UPDATE CACHE FAILED - ListPostsByUser QUERY]"
        );
      }
    },
  });

  const handleDelete = async () => {
    try {
      await deletePost({
        variables: { id: post._id },
      });
      toast.success(`Post ${post.title} successfully deleted.`);
    } catch (error) {
      console.error("[DELETE POST ERROR]", error);
      toast.error(error.message);
    }
  };

  return (
    <Card elevation={4}>
      {/* Card Head User iInfo & Date */}
      <CardHeader
        avatar={<Avatar src={post.postedBy.images[0].url} />}
        title={`@${post.postedBy.username}`}
        subheader={formatDistance(new Date(post.createdAt), new Date(), {
          addSuffix: true,
        })}
      />

      {/* Card Image */}
      <ImageFadeIn
        src={post.image.url}
        title={post.title}
        height={200}
        transition={500}
        style={{ width: "100%", height: 200, objectFit: "cover" }}
      />

      {/* Card Title */}
      <CardContent>
        <Typography gutterBottom>
          <strong style={{ fontWeight: 500 }}>Title:</strong> {post.title}
        </Typography>
        {post.tags.map((t, idx) => (
          <Chip
            key={`${t}-idx`}
            label={t}
            color="secondary"
            size="small"
            style={{ marginRight: 3 }}
          />
        ))}
      </CardContent>
      <CardActions disableSpacing style={{ display: "flex" }}>
        {loggedInUser && post.postedBy.email === loggedInUser.email && (
          <Fragment>
            <IconButton onClick={handleDelete}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
            <IconButton onClick={() => setState({ post })}>
              <EditRoundedIcon />
            </IconButton>
          </Fragment>
        )}
        <Button color="primary" style={{ marginLeft: "auto" }}>
          <VisibilityOutlinedIcon style={{ marginRight: 3, fontSize: 20 }} />
          <span>Read</span>
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostCard;
