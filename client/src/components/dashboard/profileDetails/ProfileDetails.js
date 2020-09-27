import React, { useState, useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import { GetUser } from "../../../apollo/queries/auth";
import { UpdateUser } from "../../../apollo/mutations/auth";
import {
  uploadProfileImages,
  deleteProfileImage,
} from "../../../utils/restRequests";
import useResetDropZone from "../../../hooks/useResetDropZone";
import ImageDropZone from "./ImageDropZone";
import ProfileImages from "./ProfileImages";
import UpdateProfileForm from "./UpdateProfileForm";

const INITIAL_STATE = {
  username: "",
  name: "",
  email: "",
  about: "",
  images: [],
};

const ProfileDetails = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(INITIAL_STATE);
  const { username, name, about, images } = formData;

  // Apollo
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

  // Prefill profile fields once apollo fetches profile data
  useMemo(() => {
    if (data?.getUser) {
      setFormData(data.getUser);
    }
  }, [data]);

  // Reset dropzone after adding or deleting images
  const { showDropZone } = useResetDropZone(images);

  // Handle form changes
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Update user's profile images and details
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setLoading(true);
    try {
      if (imageFiles.length) {
        const newImages = await uploadProfileImages(imageFiles);
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, ...newImages],
        }));
      }
      const updatedUser = await updateUser();
      setFormData(updatedUser.data.updateUser);
      toast.success("Profile successfully updated.");
    } catch (error) {
      console.error("PROFILE UPDATE ERROR", error);
      toast.error(error.message || error.response.data.message);
    }
    setLoading(false);
  };

  // Delete profile image
  const handleDelete = async (image) => {
    setLoading(true);
    try {
      const successMessage = await deleteProfileImage(image);
      setFormData((prev) => ({
        ...prev,
        images: prev.images.filter((i) => i.key !== image.key),
      }));
      setImageFiles([]);
      toast.success(successMessage);
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
        Update your profile:
      </Typography>

      <UpdateProfileForm
        {...formData}
        loading={loading}
        handleChange={handleChange}
      />

      <ProfileImages images={images} handleDelete={handleDelete} />

      <ImageDropZone
        images={images}
        showDropZone={showDropZone}
        handleFiles={setImageFiles}
      />

      <Button
        variant="contained"
        type="submit"
        color="primary"
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Update"}
      </Button>
    </Box>
  );
};

export default ProfileDetails;
