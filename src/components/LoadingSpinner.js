import React from "react";
import "../css/spinner.css";

const LoadingSpinner = () => {
  return (
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default LoadingSpinner;
