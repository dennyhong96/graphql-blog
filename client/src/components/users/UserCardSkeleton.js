import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";
import Skeleton from "@material-ui/lab/Skeleton";

const UserCardSkeleton = () => {
  return (
    <Card elevation={3}>
      <CardHeader
        avatar={<Skeleton variant="circle" width={40} height={40} />}
        title={<Skeleton width="40%" />}
        subheader={<Skeleton width="30%" />}
      />
      <Divider />
      <CardContent style={{ minHeight: 100 }}>
        <Skeleton style={{ height: 18, width: "100%", marginBottom: 4 }} />
        <Skeleton style={{ height: 18, width: "100%", marginBottom: 4 }} />
        <Skeleton style={{ height: 18, width: "80%" }} />
      </CardContent>
      <CardActions>
        <Skeleton
          width="20%"
          style={{ height: "2.5rem", marginLeft: "auto" }}
        />
      </CardActions>
    </Card>
  );
};

export default UserCardSkeleton;
