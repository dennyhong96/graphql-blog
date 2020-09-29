import React from "react";
import { Link } from "react-router-dom";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";

const UserCard = ({ user }) => {
  return (
    <Card elevation={3}>
      <CardHeader
        avatar={<Avatar src={user.images[0].url} />}
        title={`@${user.username}`}
        subheader={user.name || "anonymous"}
      />
      <Divider />
      <CardContent style={{ minHeight: 105 }}>
        <Typography>
          <span style={{ fontWeight: 500 }}>About:</span>{" "}
          {user.about && user.about.length > 100
            ? `${user.about.slice(0, 100)}...`
            : user.about && user.about.length <= 100
            ? user.about
            : "No about section yet."}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          component={Link}
          to={`/users/${user.username}`}
          color="primary"
          style={{ marginLeft: "auto" }}
        >
          Profile
        </Button>
      </CardActions>
    </Card>
  );
};

export default UserCard;
