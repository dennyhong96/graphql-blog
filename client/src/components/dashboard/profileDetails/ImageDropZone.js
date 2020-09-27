import React from "react";
import { DropzoneArea } from "material-ui-dropzone";

import Box from "@material-ui/core/Box";

const ImageDropZone = ({ showDropZone, images, handleFiles }) => {
  return showDropZone ? (
    <DropzoneArea
      acceptedFiles={["image/*"]}
      dropzoneText={
        images.length >= 5
          ? `You already have 5 profile images, delete some to add new ones.`
          : `You have ${images.length} profile images, you can upload ${
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
  );
};

export default ImageDropZone;
