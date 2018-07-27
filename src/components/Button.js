import React, { Component } from "react";

class Button extends Component {
  hideLocationsList = () => {
    document.querySelector(".side-list").classList.toggle("hidden");
  };

  render() {
    return (
      <button type="button" onClick={this.hideLocationsList}>
      </button>
    );
  }
}

export default Button;
