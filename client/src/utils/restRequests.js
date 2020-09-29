import axios from "axios";
import resizeFile from "./resizeFile";

export const uploadProfileImages = async (imageFiles) => {
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
  return res.data.data.images;
};

export const deleteProfileImage = async (image) => {
  const res = await axios.delete(
    `${process.env.REACT_APP_API_URL}/api/v1/images/profiles`,
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
      },
      params: { imageKey: image.key },
    }
  );
  return res.data.data.message;
};

export const uploadPostImage = async (imageFile) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/api/v1/images/posts`,
    { image: await resizeFile(imageFile) },
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
      },
    }
  );
  return res.data.data.image;
};
