import React from "react";

const Button = props => {
  return <button type="button" onClick={props.toggleMenu} className="button" />;
};

export default Button;
