import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useLazyQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";

import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";

import { SearchPosts } from "../../apollo/queries/posts";

let TIMEOUT;

const SearchBar = () => {
  const classes = useStyles();
  const history = useHistory();
  const [searchPosts, { data }] = useLazyQuery(SearchPosts);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {
    if (loading) {
      clearTimeout(TIMEOUT);
      TIMEOUT = setTimeout(() => {
        setLoading(false);
      }, 750);
    }
    return () => {
      if (TIMEOUT) clearTimeout(TIMEOUT);
    };
  }, [loading]);

  useEffect(() => {
    (async () => {
      if (searchText) {
        setLoading(true);
        searchPosts({ variables: { term: searchText } });
      }
    })();
  }, [searchText, searchPosts]);

  // Update results upon data change
  useEffect(() => {
    if (data) {
      setOptions(data.searchPosts);
    }
  }, [data]);

  return (
    <Autocomplete
      id="search-bar"
      style={{ width: 250 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option) => {
        history.push(`/posts/${option._id}`);
      }}
      getOptionLabel={(option) => option.title}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          className={classes.input}
          label="Search..."
          variant="standard"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <Fragment>
                {loading ? (
                  <CircularProgress style={{ color: "#fff" }} size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </Fragment>
            ),
            style: { borderBottom: "1px solid white", color: "#fff" },
          }}
        />
      )}
    />
  );
};

export default SearchBar;

const useStyles = makeStyles((theme) => ({
  input: {
    marginTop: "-1.25rem",
    "& .MuiFormLabel-root": {
      color: "#fff",
    },
    "& .MuiSvgIcon-root": {
      fill: "#fff",
    },
    "& .MuiInputLabel-shrink": {
      transform: `translate(0, 7px) scale(0.75)`,
    },
  },
}));
