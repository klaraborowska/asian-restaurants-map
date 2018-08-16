import React from "react";
import WarningIcon from "../utils/icons/warning.svg";
import './Error.css';

const Error = () => (
  <div className="alert">
    <img className="icon icon--alert" src={WarningIcon} alt="" />
    <p className="alert__text">Sorry, the data could not be loaded.</p>
    <p className="alert__text">
      See the JavaScript console for technical details.
    </p>
  </div>
);

export default Error;
