import React, { useState, useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { DropzoneArea } from "material-ui-dropzone";
import { toast } from "react-toastify";

import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import { GetUser } from "../../apollo/queries/auth";
import { UpdateUser } from "../../apollo/mutations/auth";

const INITIAL_STATE = {
  username: "",
  name: "",
  email: "",
  about: "",
  images: [],
};

const ProfileDetails = () => {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const { username, name, about, email, images } = formData;

  const { data } = useQuery(GetUser);
  const [updateUser, { loading, error }] = useMutation(UpdateUser, {
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
    try {
      const res = await updateUser();
      setProfile(res.data.updateUser);
      toast.success("Profile successfully updated.");
    } catch (error) {
      console.error("PROFILE UPDATE ERROR", error);
      toast.error(error);
    }
  };

  if (error) {
    console.log({ error });
  }

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
            alt="User profile image"
            width={100}
            key={i.url}
            style={{ borderRadius: 3 }}
          />
        ))}
      </Box>
      <DropzoneArea
        acceptedFiles={["image/*"]}
        dropzoneText={"Click or Drag and drop images here"}
        onChange={(files) => console.log("Files:", files)}
        showAlerts={false}
        filesLimit={5}
      />
      <Button variant="contained" type="submit">
        Update
      </Button>
    </Box>
  );
};

export default ProfileDetails;
