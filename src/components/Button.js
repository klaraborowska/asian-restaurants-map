import React from "react";
import MenuIcon from "../utils/icons/menu.svg";

const Button = props => (
  <button type="button" aria-label="Toggle Menu" onClick={props.toggleMenu} className="button">
    <img src={MenuIcon} alt="" className="menu-icon" />
  </button>
);

export default Button;
