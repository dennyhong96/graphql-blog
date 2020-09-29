import React from "react";
import { DropzoneArea } from "material-ui-dropzone";

const PostImageUpdate = ({ images, handleFiles }) => {
  return (
    <DropzoneArea
      acceptedFiles={["image/*"]}
      dropzoneText={
        !images.length ? "Attach an image for your post" : images[0]?.name
      }
      onChange={handleFiles}
      inputProps={{ disabled: false }}
      filesLimit={1}
      clearOnUnmount
    />
  );
};

export default PostImageUpdate;
