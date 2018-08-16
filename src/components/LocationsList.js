import React from "react";
import ListItem from "./ListItem";

const LocationsList = props => (
  <ul className="sidebar__list">
    {props.filteredLocations.map(item => (
      <ListItem
        name={item.venue.name}
        key={item.venue.id}
        onListItemClick={props.onListItemClick}
        clickListItem={props.clickListItem}
        restID={item.venue.id}
      />
    ))}
  </ul>
);

export default LocationsList;
