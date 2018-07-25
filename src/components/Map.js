import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  state = {
    points: [
      { name: "restaurant1", lat: 52.23, lng: 21.02, id: 1 },
      { name: "restaurant2", lat: 52.21, lng: 21.0, id: 2 },
      { name: "restaurant3", lat: 52.2, lng: 21.02, id: 3 },
      { name: "restaurant4", lat: 52.24, lng: 21.03, id: 4 }
    ],
    showingInfoWindow: false,
    clickedMarker: {}
    //selectedPlace: {}
  };

  onMarkerClick = (/*props, */ marker) =>
    this.setState({
      //selectedPlace: props,
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
          lat: 52.2296756,
          lng: 21.0122287
        }}
        zoom={12}
        gestureHandling={"greedy"}
      >
        {this.state.points.map(marker => (
          <Marker
            onClick={this.onMarkerClick}
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            name={marker.name}
          />
        ))}

        <InfoWindow
          onClose={this.onInfoWindowClose}
          marker={this.state.clickedMarker}
          visible={this.state.showInfoWindow}
        >
          <div>
            <h1>{this.state.clickedMarker.name}</h1>
            <img src="" alt="rest-pic" />
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDy6nwZDZ9oHbjpRhtrTZr4lPzEgQnKfzE"
})(MapContainer);
