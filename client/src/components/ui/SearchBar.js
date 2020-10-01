import React, { useState, useEffect, useContext } from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import { useLazyQuery } from "@apollo/client";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";

import { PostSearchContext } from "../../context/postSearchResult";
import { SearchPosts } from "../../apollo/queries/posts";

const Navabr = () => {
  const { dispatch } = useContext(PostSearchContext);
  const [searchPosts, { data }] = useLazyQuery(SearchPosts);
  const classes = useStyles();
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    (async () => {
      if (searchText) {
        searchPosts({ variables: { term: searchText } });
      }
    })();
  }, [searchText, searchPosts]);

  // Update results upon data change
  useEffect(() => {
    if (data) {
      dispatch({
        type: "RESULTS_FETCHED",
        payload: data.searchPosts,
      });
    }
  }, [data, dispatch]);

  const handleCancel = () => {
    setSearchText("");
  };

  return (
    <ClickAwayListener onClickAway={handleCancel}>
      <div className={classes.search} style={{ marginLeft: "auto" }}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ "aria-label": "search" }}
          value={searchText}
          onChange={(evt) => setSearchText(evt.target.value)}
        />
      </div>
    </ClickAwayListener>
  );
};

export default Navabr;

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));
