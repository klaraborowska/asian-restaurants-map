import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  render() {
    const style = {};

    var points = [
      { lat: 52.23, lng: 21.02, id: 1 },
      { lat: 52.21, lng: 21.0, id: 2 },
      { lat: 52.2, lng: 21.02, id: 3 },
      { lat: 52.24, lng: 21.03, id: 4 }
    ];
   
    return (
      <Map
        google={this.props.google}
        style={style}
        initialCenter={{
          lat: 52.2296756,
          lng: 21.0122287
        }}
        zoom={13}
        gestureHandling={"greedy"}
        onClick={this.onMapClicked}
      >
        {points.map(marker => (
          <Marker
            onClick={this.onMarkerClick}
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>x</h1>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDy6nwZDZ9oHbjpRhtrTZr4lPzEgQnKfzE"
})(MapContainer);
