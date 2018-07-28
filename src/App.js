import React, { Component } from "react";
import "./App.css";

import Button from "./components/Button";
import Error from "./components/Error";
import LocationsList from "./components/LocationsList";
import MapContainer from "./components/MapContainer";
import Search from "./components/Search";


class App extends Component {
  state = {
    locations: [],
    filteredLocations: [],
    showInfoWindow: false,
    clickedMarker: {},
    selectedPlace: {},
    animation: 0,
    error: false
  };

  allMarkers = [];

  addMarker = marker => {
    if (marker) {
      this.allMarkers.push(marker);
    }
  };

  onMarkerClick = (props, marker) => {
    this.setState({
      selectedPlace: props,
      clickedMarker: marker,
      showInfoWindow: true,
      animation: 1
    });

    this.removeActiveClass();
    document.querySelectorAll(".list-item").forEach(el => {
      if (el.textContent === marker.name) {
        el.classList.add("active");
      }
    });
  };

  onMapClick = () => {
    this.setState({
      showInfoWindow: false,
      animation: 0
    });
    this.removeActiveClass();
  };

  onListItemClick = e => {
    const clicked = this.allMarkers.filter(
      el => el.marker.name === e.target.textContent
    );
    this.setState({
      clickedMarker: clicked[0].marker,
      showInfoWindow: true,
      animation: 1
    });
    this.removeActiveClass();
    this.addActiveClass(e.target);
  };

  onInfoWindowClose = () => {
    this.setState({
      animation: 0,
      showInfoWindow: false
    });
  };

  onSearchLocation = e => {
    let searchQuery = e.target.value;
    this.setState({
      filteredLocations: this.state.locations.filter(
        el =>
          el.venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          el.venue.categories[0].shortName
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      ),
      showInfoWindow: false,
      animation: 0
    });
    this.removeActiveClass();
  };

  removeActiveClass = () => {
    document
      .querySelectorAll(".list-item")
      .forEach(el => el.classList.remove("active"));
  };

  addActiveClass = element => {
    element.classList.add("active");
  };

  componentDidMount() {
    const key = "D5SNMMUIS3DTXRQ5FN5G1UBU4XKRSEGVR0KXMS5KRB1YZGSY";
    const secret = "NAJXBKSQ4VEKRWJPDEGVPW1QMASLTUEGXWYDBOVJG2ODFF5J";
    fetch(
      `https://api.foursquare.com/v2/venues/explore?ll=52.2246756,21.0122287&categoryId=4bf58dd8d48988d142941735&checkin=intent&radius=6000&limit=50&client_id=${key}&client_secret=${secret}&v=20180726`
    )
      .then(response => response.json())
      .then(res => {
        const result = res.response.groups[0].items;
        console.log(result);

        this.setState({
          locations: result,
          filteredLocations: result
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: true });
      });

    window.gm_authFailure = () => this.setState({ error: true });
    if (window.google === undefined) {
      this.setState({ error: true });
    }
  }

  render() {
    const noError = !this.state.error;

    return (
      <div className="App">
        <header className="header">
          <Button />
          <h1 className="header-title">Asian Restaurants in Warsaw</h1>
        </header>

        {noError ? (
          <div className="wrapper">
            <aside className="side-list">
              <Search onSearchLocation={this.onSearchLocation} />
              <LocationsList
                filteredLocations={this.state.filteredLocations}
                onListItemClick={this.onListItemClick}
              />
            </aside>
            <div className="map">
              <MapContainer
                google={window.google}
                filteredLocations={this.state.filteredLocations}
                addMarker={this.addMarker}
                onMarkerClick={this.onMarkerClick}
                onInfoWindowClose={this.onInfoWindowClose}
                onMapClick={this.onMapClick}
                appState={this.state}
              />
            </div>
          </div>
        ) : (
          <Error />
        )}
        <footer className="footer">
          <p>
            All icons by Flaticon. Restaurants data fetched from Foursquare API
          </p>
        </footer>
      </div>
    );
  }
}

export default App;

window.gm_authFailure = function() {};
