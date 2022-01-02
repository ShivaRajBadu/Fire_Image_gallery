import React from "react";
import spinner from "../spinner.gif";
export const Spinner = () => {
  return (
    <div className="spinner">
      <img className="spinner-img" src={spinner} alt="loading..." />
    </div>
  );
};
