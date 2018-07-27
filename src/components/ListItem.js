import React from "react";

const ListItem = props => {
  return (
    <li className="list-item" onClick={props.onListItemClick}>
      {props.name}
    </li>
  );
};

export default ListItem;
