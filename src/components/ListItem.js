import React, { Component } from "react";

class ListItem extends Component {
  clickListItem = e => {
    if (e.keyCode === 13) {
      e.target.click();
    }
  };

  render() {
    return (
      <li
        className="list-item"
        onClick={this.props.onListItemClick}
        aria-label={this.props.name}
        onKeyDown={this.clickListItem}
        role="button"
        tabIndex="0"
      >
        {this.props.name}
      </li>
    );
  }
}

export default ListItem;
