import React, { Component } from "react";

class Button extends Component {
 

  render() {
    return (
      <button type="button" onClick={this.props.toggleMenu} >
      </button>
    );
  }
}

export default Button;
