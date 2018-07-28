import React from "react";

const Error = () => {
  return (
    <div className="api-failure">
      <div className="alert-icon" />
      <p>Sorry, the data could not be loaded.</p>
      <p>See the JavaScript console for technical details.</p>
    </div>
  );
};

export default Error;
