import React from "react";
import { Switch, useLocation, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import PrivateRoute from "../components/routes/PrivateRoute";

const SUBPATHS = [
  { pathname: "/dashboard/main", label: "Dashboard" },
  { pathname: "/dashboard/create", label: "create" },
  { pathname: "/dashboard/delete", label: "delete" },
];

const useStyles = makeStyles((theme) => ({
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const location = useLocation();

  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          className={classes.tabs}
          value={SUBPATHS.findIndex(
            (path) => path.pathname === location.pathname
          )}
        >
          {SUBPATHS.map((path) => (
            <Tab
              key={path.pathname}
              component={Link}
              to={path.pathname}
              label={path.label}
            />
          ))}
        </Tabs>
      </Grid>
      <Grid item xs={9}>
        <Switch>
          {SUBPATHS.map((path) => (
            <PrivateRoute
              key={path.pathname}
              exact
              path={path.pathname}
              component={() => <h1>{path.label}</h1>}
            />
          ))}
        </Switch>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
