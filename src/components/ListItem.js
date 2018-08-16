import React from "react";

const ListItem = props => (
  <li
    className="list-item"
    onClick={props.onListItemClick}
    aria-label={props.name}
    onKeyDown={props.clickListItem}
    role="button"
    tabIndex="0"
    data-index-number={props.restID}
  >
    {props.name}
  </li>
);

export default ListItem;
