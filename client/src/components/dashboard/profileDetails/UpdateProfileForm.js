import React, { Fragment } from "react";

import TextField from "@material-ui/core/TextField";

const UpdateProfileForm = ({
  email,
  username,
  name,
  about,
  loading,
  handleChange,
}) => {
  return (
    <Fragment>
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
    </Fragment>
  );
};

export default UpdateProfileForm;
