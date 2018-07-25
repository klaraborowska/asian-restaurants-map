import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    clickedMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker) =>
    this.setState({
      selectedPlace: props,
      clickedMarker: marker,
      showInfoWindow: true
    });

  render() {
    const style = {};

    return (
      <Map
        google={this.props.google}
        style={style}
        initialCenter={{
          lat: 52.2246756,
          lng: 21.0122287
        }}
        zoom={13}
        gestureHandling={"greedy"}
      >
        {this.props.locations.map(marker => (
          <Marker
            onClick={this.onMarkerClick}
            key={marker.venue.id}
            position={{ lat: marker.venue.location.lat, lng: marker.venue.location.lng }}
            name={marker.venue.name}
            address={marker.venue.location.address}
          />
        ))}

        <InfoWindow
          onClose={this.onInfoWindowClose}
          marker={this.state.clickedMarker}
          visible={this.state.showInfoWindow}
        >
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
            <p>Adres: {this.state.selectedPlace.address}</p>
            <img src="" alt="" />
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDy6nwZDZ9oHbjpRhtrTZr4lPzEgQnKfzE"
})(MapContainer);
