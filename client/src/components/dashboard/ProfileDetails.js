import React, { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { DropzoneArea } from "material-ui-dropzone";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { makeStyles } from "@material-ui/core";
import ImageFadeIn from "react-image-fade-in";

import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { GetUser } from "../../apollo/queries/auth";
import { UpdateUser } from "../../apollo/mutations/auth";

const INITIAL_STATE = {
  username: "",
  name: "",
  email: "",
  about: "",
  images: [],
};

const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      300,
      300,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

const useStyles = makeStyles((theme) => ({
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

const ProfileDetails = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const { username, name, about, email, images } = formData;
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropZone, setShowDropZone] = useState(true);
  const classes = useStyles();

  const { data } = useQuery(GetUser, { fetchPolicy: "cache-and-network" });
  const [updateUser] = useMutation(UpdateUser, {
    variables: {
      input: {
        username,
        name,
        about,
        images,
      },
    },
  });

  const setProfile = (user) => {
    setFormData({
      username: user.username,
      name: user.name,
      email: user.email,
      about: user.about,
      images: user.images,
    });
  };

  useMemo(() => {
    if (data?.getUser) {
      setProfile(data.getUser);
    }
  }, [data]);

  // Reset dropzone after adding or deleting images
  useEffect(() => {
    setShowDropZone(false);
    setTimeout(() => {
      setShowDropZone(true);
    }, 1);
  }, [images.length]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      if (imageFiles.length) {
        const promises = imageFiles.map((i) => resizeFile(i));
        const imageUris = await Promise.all(promises);

        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/images/profiles`,
          { images: imageUris },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
            },
          }
        );
        console.log(res.data.data);
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...res.data.data.images],
        }));
      }

      const res = await updateUser();
      setProfile(res.data.updateUser);
      toast.success("Profile successfully updated.");
    } catch (error) {
      console.error("PROFILE UPDATE ERROR", error);
      toast.error(error.message || error.response.data.message);
    }
    setLoading(false);
  };

  const handleFiles = (files) => {
    setImageFiles(files);
  };

  const handleDelete = async (image) => {
    setLoading(true);
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/images/profiles`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
          },
          params: { imageKey: image.key },
        }
      );
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((i) => i.key !== image.key),
      }));
      setImageFiles([]);
      toast.success(res.data.data.message);
    } catch (error) {
      console.error("PROFILE UPDATE ERROR", error);
      toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <Box
      component="form"
      style={{ marginBottom: "1rem" }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h6" style={{ marginBottom: "0.5rem" }}>
        Update Profile:
      </Typography>
      <TextField
        id="profile-update-email"
        label="Your email."
        fullWidth
        name="email"
        value={email}
        style={{ marginBottom: "1rem" }}
        disabled={true}
      />
      <TextField
        id="profile-update-username"
        label="Enter a new username."
        fullWidth
        name="username"
        value={username}
        onChange={handleChange}
        style={{ marginBottom: "1rem" }}
        disabled={loading}
      />
      <TextField
        id="profile-update-name"
        label="Enter a new name."
        fullWidth
        name="name"
        value={name}
        onChange={handleChange}
        style={{ marginBottom: "1rem" }}
        disabled={loading}
      />
      <TextField
        id="profile-update-about"
        label="Write something about your self."
        fullWidth
        name="about"
        value={about}
        onChange={handleChange}
        style={{ marginBottom: "1rem" }}
        disabled={loading}
        multiline
      />
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
                borderRadius: 3,
                objectFit: "cover",
                height: 150,
                width: 150,
              }}
            />
          </Box>
        ))}
      </Box>
      {showDropZone ? (
        <DropzoneArea
          acceptedFiles={["image/*"]}
          dropzoneText={
            images.length >= 5
              ? `You already have 5 images, delete some to add new ones.`
              : `You have ${images.length} images, you can upload ${
                  5 - images.length
                } more.`
          }
          onChange={handleFiles}
          inputProps={{ disabled: images.length >= 5 }}
          filesLimit={5 - images.length}
          clearOnUnmount
        />
      ) : (
        <Box
          style={{
            height: "6.5rem",
            border: "2px dashed #bdbdbd",
            marginBottom: "1rem",
          }}
        />
      )}

      <Button variant="contained" type="submit" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Update"}
      </Button>
    </Box>
  );
};

export default ProfileDetails;
