import React from "react";

export const Loading = () => {
  return (
    <div className="Loading d-flex justify-content-center align-items-center">
      <div className="d-flex flex-column align-items-center">
        <div className="Loading-spinner ms-2" color="dark" />
        <br />
        Loading...
      </div>
    </div>
  );
};
