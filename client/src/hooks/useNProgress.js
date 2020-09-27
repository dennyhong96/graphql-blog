import { useState, useEffect } from "react";
import nprogress from "nprogress";

const useNProgress = () => {
  useState(nprogress.start());

  useEffect(() => {
    nprogress.done();
    return () => nprogress.start();
  });
  return null;
};

export default useNProgress;
