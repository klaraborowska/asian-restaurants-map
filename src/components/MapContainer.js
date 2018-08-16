import React, { Component } from "react";
import { Map, InfoWindow, Marker } from "google-maps-react";

import Pin from "../utils/icons/pin.svg";
import AsianIcon from "../utils/icons/asian.svg";
import ThaiIcon from "../utils/icons/thai.svg";
import VietnameseIcon from "../utils/icons/vietnamese.svg";
import JapaneseIcon from "../utils/icons/japanese.svg";
import SushiIcon from "../utils/icons/sushi.svg";
import ChineseIcon from "../utils/icons/chinese.svg";
import IndianIcon from "../utils/icons/indian.svg";
import NoodlesIcon from "../utils/icons/noodles.svg";

import './MapContainer.css';

class MapContainer extends Component {
  addCategory = () => {
    let category = "";
    const location = this.props.appState.filteredLocations.filter(
      el => el.venue.name === this.props.appState.clickedMarker.name
    );

    if (location[0]) {
      category = location[0].venue.categories[0].shortName;
    }
    return category;
  };

  addIcon = () => {
    const category = this.addCategory().toLowerCase();
    let src = "";
    switch (category) {
      case "asian":
        src = AsianIcon;
        break;
      case "thai":
        src = ThaiIcon;
        break;
      case "vietnamese":
        src = VietnameseIcon;
        break;
      case "japanese":
        src = JapaneseIcon;
        break;
      case "sushi":
        src = SushiIcon;
        break;
      case "chinese":
        src = ChineseIcon;
        break;
      case "indian":
        src = IndianIcon;
        break;
      default:
        src = NoodlesIcon;
    }
    return src;
  };

  render() {
    const { animation, clickedMarker, showInfoWindow, filteredLocations } = this.props.appState;
    const { google, onMapClick, onMarkerClick, addMarker, onInfoWindowClose } = this.props;
    const icon = {
      url: Pin,
      scaledSize: new window.google.maps.Size(32, 32)
    };
    return (
      <Map
        google={google}
        initialCenter={{
          lat: 52.2305556,
          lng: 21.0122287
        }}
        zoom={13}
        onClick={onMapClick}
      >
        {filteredLocations.map(marker => (
          <Marker
            onClick={onMarkerClick}
            key={marker.venue.id}
            position={{
              lat: marker.venue.location.lat,
              lng: marker.venue.location.lng
            }}
            name={marker.venue.name}
            address={marker.venue.location.address}
            animation={marker.venue.id === clickedMarker.id ? animation : null}
            ref={addMarker}
            icon={icon}
            id={marker.venue.id}
          />
        ))}

        <InfoWindow
          onClose={onInfoWindowClose}
          marker={clickedMarker}
          visible={showInfoWindow}
          locations={filteredLocations}
        >
          <div className="info-window">
            <h1 className="info-window__title">{clickedMarker.name}</h1>
            <img className="info-window__icon icon" src={this.addIcon()} alt="" />
            <p className="info-window__details">
              Address: {clickedMarker.address || "no address available"}
            </p>
            <p className="info-window__details">
              Category: {this.addCategory()}
            </p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}
export default MapContainer;
