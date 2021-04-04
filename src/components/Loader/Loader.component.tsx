import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

import "./loader.css";

type LoaderProps = {
  pageCentered: boolean;
};

/**
 * Loading spinner to display when pages are loading.
 */
export default function Loader(props: LoaderProps) {
  const { pageCentered, ...otherProps } = props;

  return (
    <div className={`LoadingSpinner${pageCentered ? " page-centered" : ""}`}>
      <CircularProgress {...otherProps} color="primary" />
    </div>
  );
}
