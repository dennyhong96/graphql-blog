import React, { useState, useEffect } from "react";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import "../components/routes/Route.css";

const useNProgress = () => {
  useState(nprogress.start());

  useEffect(() => {
    nprogress.done();
    return () => nprogress.start();
  });
  return null;
};

export default useNProgress;
