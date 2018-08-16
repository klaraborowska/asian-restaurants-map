import React from "react";
import WarningIcon from "../utils/icons/warning.svg";

const Error = () => (
  <div className="api-failure">
    <img className="alert-icon" src={WarningIcon} alt="" />
    <p className="alert-text">Sorry, the data could not be loaded.</p>
    <p className="alert-text">
      See the JavaScript console for technical details.
    </p>
  </div>
);

export default Error;
