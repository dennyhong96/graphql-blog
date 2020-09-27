import { useState, useEffect } from "react";

// Reset dropzone after adding or deleting images
const useResetDropZone = (images) => {
  const [showDropZone, setShowDropZone] = useState(true);
  useEffect(() => {
    setShowDropZone(false);

    setTimeout(() => {
      setShowDropZone(true);
    }, 1);
  }, [images.length]);
  return { showDropZone };
};

export default useResetDropZone;
