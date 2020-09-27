import React, { useState, useMemo } from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { DropzoneArea } from "material-ui-dropzone";
import { toast } from "react-toastify";

import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const GetUser = gql`
  query GetUser {
    getUser {
      _id
      username
      name
      email
      images {
        url
        public_id
      }
      about
      createdAt
      updatedAt
    }
  }
`;

const UpdateUser = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      _id
      username
      name
      email
      images {
        url
        public_id
      }
      about
      createdAt
      updatedAt
    }
  }
`;

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

  useMemo(() => {
    if (data?.getUser) {
      setFormData({
        username: data.getUser.username,
        name: data.getUser.name,
        email: data.getUser.email,
        about: data.getUser.about,
        images: data.getUser.images,
      });
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

      console.log(res);
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
      <Typography variant="h6">Update Profile:</Typography>
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
        id="profile-update-email"
        label="Your email."
        fullWidth
        name="email"
        value={email}
        style={{ marginBottom: "1rem" }}
        disabled={true}
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
      <Box>
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
