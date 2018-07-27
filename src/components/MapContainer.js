import React, { Component } from "react";
import { Map, InfoWindow, Marker } from "google-maps-react";

class MapContainer extends Component {
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
        onClick={this.props.onMapClick}
      >
        {this.props.filteredLocations.map(marker => (
          <Marker
            onClick={this.props.onMarkerClick}
            key={marker.venue.id}
            position={{
              lat: marker.venue.location.lat,
              lng: marker.venue.location.lng
            }}
            name={marker.venue.name}
            address={marker.venue.location.address}
            animation={
              marker.venue.name === this.props.appState.clickedMarker.name
                ? this.props.appState.animation
                : null
            }
            ref={this.props.addMarker}
          />
        ))}

        <InfoWindow
          onClose={this.props.onInfoWindowClose}
          marker={this.props.appState.clickedMarker}
          visible={this.props.appState.showInfoWindow}
        >
          <div>
            <h1>{this.props.appState.clickedMarker.name}</h1>
            <p>Adres: {this.props.appState.clickedMarker.address}</p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}
export default MapContainer;