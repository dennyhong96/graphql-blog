import React from "react";
import { DropzoneArea } from "material-ui-dropzone";

const PostImageUpdate = ({ image, handleFiles, isUpdate = false }) => {
  return (
    <DropzoneArea
      acceptedFiles={["image/*"]}
      dropzoneText={
        !image
          ? isUpdate
            ? "Update Image"
            : "Attach an image for your post"
          : image.name
      }
      onChange={handleFiles}
      inputProps={{ disabled: false }}
      filesLimit={1}
      clearOnUnmount
    />
  );
};

export default PostImageUpdate;
