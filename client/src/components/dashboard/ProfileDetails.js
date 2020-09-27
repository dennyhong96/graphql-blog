import React, { useState, useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { DropzoneArea } from "material-ui-dropzone";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import axios from "axios";

import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

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
      500,
      500,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });

const ProfileDetails = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const { username, name, about, email, images } = formData;
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data } = useQuery(GetUser);
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
      toast.error(error);
    }
    setLoading(false);
  };

  const handleFiles = (files) => {
    setImageFiles(files);
  };

  return (
    <Box
      component="form"
      style={{ marginBottom: "1rem" }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h6" style={{ marginBottom: "0.25rem" }}>
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
      <Box style={{ marginBottom: "1rem" }}>
        {images.map((i) => (
          <img
            src={i.url}
            alt="User profile"
            key={i.url}
            style={{
              borderRadius: 3,
              objectFit: "cover",
              height: 100,
              width: 100,
              marginRight: "0.5rem",
            }}
          />
        ))}
      </Box>
      <DropzoneArea
        acceptedFiles={["image/*"]}
        dropzoneText={"Click or Drag and drop images here"}
        onChange={handleFiles}
        showAlerts={false}
        filesLimit={5}
      />
      <Button variant="contained" type="submit" disabled={loading}>
        {loading ? <CircularProgress size={24} /> : "Update"}
      </Button>
    </Box>
  );
};

export default ProfileDetails;
