import React from "react";
import ListItem from "./ListItem";

const LocationsList = props => {
  return (
    <ul className="list">
      {props.filteredLocations.map(item => (
        <ListItem
          name={item.venue.name}
          key={item.venue.id}
          onListItemClick={props.onListItemClick}
          className="list-item"
        />
      ))}
    </ul>
  );
};

export default LocationsList;
