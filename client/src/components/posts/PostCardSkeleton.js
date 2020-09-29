import React from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Skeleton from "@material-ui/lab/Skeleton";

const PostCardSkeleton = () => {
  return (
    <Card elevation={4}>
      {/* Card Head User iInfo & Date */}
      <CardHeader
        avatar={<Skeleton variant="circle" width={50} height={50} />}
        title={
          <Skeleton variant="rect" width="30%" style={{ marginBottom: 5 }} />
        }
        subheader={<Skeleton variant="rect" width="40%" />}
      />

      {/* Card Image */}
      <Skeleton variant="rect" style={{ height: 200, width: "100%" }} />

      {/* Card Title */}
      <CardContent>
        <Skeleton variant="rect" width="100%" style={{ marginBottom: 5 }} />
        <Skeleton variant="rect" width="75%" style={{ marginBottom: 10 }} />

        {/* Chips */}
        <Skeleton
          variant="rect"
          width="20%"
          style={{
            borderRadius: "5rem",
            display: "inline-block",
            marginRight: 3,
            height: 20,
          }}
        />
        <Skeleton
          variant="rect"
          width="20%"
          style={{
            borderRadius: "5rem",
            display: "inline-block",
            marginRight: 3,
            height: 20,
          }}
        />
        <Skeleton
          variant="rect"
          width="20%"
          style={{
            borderRadius: "5rem",
            display: "inline-block",
            marginRight: 3,
            height: 20,
          }}
        />
      </CardContent>
      <CardActions disableSpacing style={{ display: "flex" }}>
        <Skeleton
          variant="rect"
          width="25%"
          style={{ marginLeft: "auto", height: 30 }}
        />
      </CardActions>
    </Card>
  );
};

export default PostCardSkeleton;
