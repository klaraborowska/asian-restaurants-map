import React from "react";
import './ListItem.css';

const ListItem = props => (
  <li
    className="list__item"
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
