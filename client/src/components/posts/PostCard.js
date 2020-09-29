import React from "react";
import { formatDistance } from "date-fns";
import ImageFadeIn from "react-image-fade-in";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";

import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";

const PostCard = ({ post }) => {
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
        <Button
          variant="contained"
          color="primary"
          style={{ marginLeft: "auto" }}
        >
          <VisibilityOutlinedIcon style={{ marginRight: 3, fontSize: 20 }} />
          <span style={{ marginTop: 1 }}>Read</span>
        </Button>
      </CardActions>
    </Card>
  );
};

export default PostCard;
