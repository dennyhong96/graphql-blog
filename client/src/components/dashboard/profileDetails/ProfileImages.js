import React from "react";
import { makeStyles } from "@material-ui/core";
import ImageFadeIn from "react-image-fade-in";

import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(() => ({
  images: {
    marginBottom: "1rem",
    display: "flex",
    flexWrap: "wrap",
  },
  image: {
    position: "relative",
    marginRight: "1.25rem",
    "&:hover": {
      "& .MuiIconButton-root": {
        opacity: 1,
        transition: "all 0.2s ease",
      },
    },
  },
  deleteBtn: {
    opacity: 0,
    transition: "all 0.2s ease",
    position: "absolute",
    right: 4,
    top: 2,
    backgroundColor: "#e0e0e0",
    padding: "0.25rem",
    boxShadow: "0 3px 7px rgb(0,0,0,0.075)",
    "&:hover": {
      backgroundColor: "#eeeeee",
    },
  },
  deleteIcon: {
    width: 20,
    height: 20,
  },
}));

const ProfileImages = ({ images, handleDelete }) => {
  const classes = useStyles();

  return (
    <Box className={classes.images}>
      {images.map((i) => (
        <Box key={i.url} className={classes.image}>
          {i.key && (
            <IconButton
              className={classes.deleteBtn}
              onClick={() => handleDelete(i)}
            >
              <DeleteIcon className={classes.deleteIcon} />
            </IconButton>
          )}
          <ImageFadeIn
            height={150}
            width={150}
            src={i.url}
            alt="User profile"
            style={{
              boxShadow: "0 3px 7px rgb(0,0,0,0.1)",
              borderRadius: 3,
              objectFit: "cover",
              height: 150,
              width: 150,
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default ProfileImages;
