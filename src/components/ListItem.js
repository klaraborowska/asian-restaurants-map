import React, { Component } from "react";

class ListItem extends Component {
  

  render() {
    return (
      <li
        className="list-item"
        onClick={this.props.onListItemClick}
        aria-label={this.props.name}
        onKeyDown={this.props.clickListItem}
        role="button"
        tabIndex="0"
      >
        {this.props.name}
      </li>
    );
  }
}

export default ListItem;
