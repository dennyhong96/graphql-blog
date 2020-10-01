import React, { useContext, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles, useTheme, useMediaQuery } from "@material-ui/core";
import { useHistory, useLocation } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Hidden from "@material-ui/core/Hidden";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PostAddIcon from "@material-ui/icons/PostAdd";
import GroupRoundedIcon from "@material-ui/icons/GroupRounded";
import FreeBreakfastRoundedIcon from "@material-ui/icons/FreeBreakfastRounded";

import { auth } from "../../services/firebase";
import { AuthContext } from "../../context/authContext";
import client from "../../apollo/client";
import SearchBar from "./SearchBar";

const Navabr = () => {
  const classes = useStyles();
  const [drawerShow, setDrawerShow] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { state, dispatch } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const matchXS = useMediaQuery(theme.breakpoints.down("xs"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setDrawerShow(false);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      handleClose();

      localStorage.removeItem("AUTH_TOKEN");
      await client.resetStore();
      dispatch({ type: "USER_LOGGED_OUT" });
      history.push("/login");
    } catch (error) {
      console.error("LOGOUT ERROR", error);
      dispatch({ type: "AUTH_ERROR" });
    }
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <AppBar position="fixed">
          <Container>
            <Toolbar className={classes.toolBar}>
              {/* Toggle drawer icon */}
              <Hidden smUp>
                <IconButton
                  edge="start"
                  className={classes.menuButton}
                  color="inherit"
                  aria-label="menu"
                  onClick={() => setDrawerShow(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Hidden>

              {/* Brand Icon and Text */}
              <Typography
                component={Link}
                to="/"
                variant="h6"
                className={classes.title}
                style={{
                  marginRight: matchXS ? 0 : state.user ? "0.5rem" : "auto",
                  marginLeft: matchXS ? "auto" : undefined,
                  fontSize: matchXS ? "1rem" : undefined,
                }}
              >
                <FreeBreakfastRoundedIcon
                  style={{
                    fontSize: matchXS ? 24 : 32,
                    marginRight: 5,
                  }}
                />
                Realtime Blog
              </Typography>

              {/* New post button */}
              {state.user && (
                <Button
                  component={Link}
                  to="/dashboard/create"
                  color="inherit"
                  style={{ marginLeft: "1rem", marginRight: "auto" }}
                >
                  <PostAddIcon style={{ marginRight: 1 }} />
                  <span style={{ marginTop: 3 }}>New Post</span>
                </Button>
              )}

              <Hidden xsDown>
                {/* Search Bar */}
                {location.pathname === "/" && <SearchBar />}

                {/* Users Button */}
                <IconButton
                  component={Link}
                  to="/users"
                  style={{ color: "#fff", marginLeft: "0.25rem" }}
                >
                  <GroupRoundedIcon />
                </IconButton>

                {/* Log in and resgiter  */}
                {!state.user ? (
                  <Fragment>
                    <Button component={Link} to="/login" color="inherit">
                      Login
                    </Button>
                    <Button component={Link} to="/register" color="inherit">
                      Register
                    </Button>
                  </Fragment>
                ) : (
                  <div>
                    {/* Account menu toggle */}
                    <IconButton
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleMenu}
                      color="inherit"
                      edge="end"
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={!!anchorEl}
                      onClose={handleClose}
                    >
                      <MenuItem
                        component={Link}
                        onClick={handleClose}
                        to="/dashboard/profile"
                      >
                        Dashboard
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </div>
                )}
              </Hidden>
            </Toolbar>
          </Container>
        </AppBar>
        <Toolbar />
      </div>

      {/* Drawer for small screen devices */}
      <SwipeableDrawer
        PaperProps={{
          style: {
            padding: "2.5rem 1.5rem",
            backgroundColor: theme.palette.primary.light,
          },
        }}
        anchor="right"
        open={drawerShow}
        onClose={() => setDrawerShow(false)}
      >
        {/* Search bar */}
        <SearchBar onOptionClicked={() => setDrawerShow(false)} />

        {/* User button */}
        <IconButton
          component={Link}
          to="/users"
          style={{ color: "#fff", alignSelf: "center" }}
          onClick={() => setDrawerShow(false)}
        >
          <GroupRoundedIcon
            style={{
              width: "2.5rem",
              height: "2.5rem",
              color: "#fff",
              marginTop: "1rem",
            }}
          />
        </IconButton>

        {!state.user ? (
          <Fragment>
            {/* Login register button */}
            <Button
              component={Link}
              to="/login"
              color="inherit"
              style={{ alignSelf: "center", color: "#fff" }}
              onClick={() => setDrawerShow(false)}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/register"
              color="inherit"
              style={{ alignSelf: "center", color: "#fff" }}
              onClick={() => setDrawerShow(false)}
            >
              Register
            </Button>
          </Fragment>
        ) : (
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            edge="end"
            style={{ alignSelf: "center", marginLeft: "-0.75rem" }}
          >
            <AccountCircle
              style={{ width: "2.5rem", height: "2.5rem", color: "#fff" }}
            />
          </IconButton>
        )}
      </SwipeableDrawer>
    </Fragment>
  );
};

export default Navabr;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    color: "inherit",
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
  },
  toolBar: {
    padding: 0,
  },
}));
