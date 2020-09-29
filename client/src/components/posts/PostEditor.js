import React from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const PostEditor = ({ content, setContent }) => {
  return <ReactQuill value={content} onChange={setContent} />;
};

export default PostEditor;
