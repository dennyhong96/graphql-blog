import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Hidden from "@material-ui/core/Hidden";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import GitHubIcon from "@material-ui/icons/GitHub";
import PostAddIcon from "@material-ui/icons/PostAdd";

import { auth } from "../../services/firebase";
import { AuthContext } from "../../context/authContext";
import client from "../../apollo/client";
import SearchBar from "./SearchBar";

const Navabr = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { state, dispatch } = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
    <div className={classes.root}>
      <AppBar position="fixed">
        <Container>
          <Toolbar className={classes.toolBar}>
            <Hidden smUp>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Typography
              component={Link}
              to="/"
              variant="h6"
              className={classes.title}
            >
              <GitHubIcon style={{ fontSize: 32, marginRight: "0.5rem" }} />
              GraphQL BLOG
            </Typography>

            {state.user && (
              <Button
                component={Link}
                to="/dashboard/create"
                color="inherit"
                style={{ marginLeft: "1rem" }}
              >
                <PostAddIcon style={{ marginRight: 1 }} />
                <span style={{ marginTop: 3 }}>New Post</span>
              </Button>
            )}

            {location.pathname === "/" && <SearchBar />}

            <Button
              component={Link}
              to="/users"
              style={{
                marginLeft: location.pathname !== "/" ? "auto" : "0.5rem",
              }}
              color="inherit"
            >
              Users
            </Button>

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
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </div>
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
