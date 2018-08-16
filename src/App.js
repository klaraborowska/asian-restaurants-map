import React, { Component } from "react";
import "./App.css";

import Button from "./components/Button";
import Error from "./components/Error";
import LocationsList from "./components/LocationsList";
import MapContainer from "./components/MapContainer";
import Search from "./components/Search";

import "./App.css";

class App extends Component {
  state = {
    locations: [],
    filteredLocations: [],
    showInfoWindow: false,
    clickedMarker: {},
    selectedPlace: {},
    animation: 0,
    error: false,
    menuOpen: true,
    searchQuery: ""
  };

  // add all rendered markers to array to be able to iterrate through all markers
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
  };

  onMapClick = () => {
    this.setState({
      showInfoWindow: false,
      animation: 0
    });
  };

  onListItemClick = e => {
    const clickedID = e.currentTarget.dataset.indexNumber;
    const clicked = this.allMarkers.filter(el => el.marker.id === clickedID);
    this.setState({
      clickedMarker: clicked[0].marker,
      showInfoWindow: true,
      animation: 1
    });
  };

  onInfoWindowClose = () => {
    this.setState({
      animation: 0,
      showInfoWindow: false
    });
  };

  onSearchLocation = e => {
    const query = e.target.value.toLowerCase();
    const filteredLocations = this.state.locations.filter(
      el =>
        el.venue.name.toLowerCase().includes(query) ||
        el.venue.categories[0].shortName.toLowerCase().includes(query)
    );
    this.setState({
      searchQuery: query,
      filteredLocations: filteredLocations,
      showInfoWindow: false,
      animation: 0
    });
  };

  // imitate a click on list item, when enter key is pressed
  clickListItem = e => {
    if (e.keyCode === 13) {
      e.target.click();
    } else if (this.state.showInfoWindow) {
      this.setState({
        showInfoWindow: false,
        animation: 0
      });
    }
  };

  toggleMenu = () => {
    this.setState(
      this.state.menuOpen ? { menuOpen: false } : { menuOpen: true }
    );
  };

  getData = () => {
    const key = "D5SNMMUIS3DTXRQ5FN5G1UBU4XKRSEGVR0KXMS5KRB1YZGSY";
    const secret = "NAJXBKSQ4VEKRWJPDEGVPW1QMASLTUEGXWYDBOVJG2ODFF5J";
    fetch(
      `https://api.foursquare.com/v2/venues/explore?ll=52.2246756,21.0122287&categoryId=4bf58dd8d48988d142941735&checkin=intent&radius=6000&limit=50&client_id=${key}&client_secret=${secret}&v=20180726`
    )
      .then(response => response.json())
      .then(res => {
        const result = res.response.groups[0].items;

        this.setState({
          locations: result,
          filteredLocations: result
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ error: true });
      });
  };

  componentDidMount() {
    this.getData();
    // handle error, when google map fails to load
    window.gm_authFailure = () => this.setState({ error: true });
    if (window.google === undefined) {
      this.setState({ error: true });
    }
  }

  render() {

    return (
      <div className="App">
        <header className="header">
          <Button toggleMenu={this.toggleMenu} />
          <h1 className="header__title">Asian Restaurants in Warsaw</h1>
        </header>

        {this.state.error ? (
          <Error />
        ) : (
          <div className="wrapper">
            {this.state.menuOpen && (
              <aside className="sidebar">
                <Search
                  onSearchLocation={this.onSearchLocation}
                  searchQuery={this.state.searchQuery}
                />
                <LocationsList
                  filteredLocations={this.state.filteredLocations}
                  onListItemClick={this.onListItemClick}
                  clickListItem={this.clickListItem}
                />
              </aside>
            )}

            <div className="map" role="application">
              <MapContainer
                google={window.google}
                addMarker={this.addMarker}
                onMarkerClick={this.onMarkerClick}
                onInfoWindowClose={this.onInfoWindowClose}
                onMapClick={this.onMapClick}
                appState={this.state}
              />
            </div>
          </div>
        )}
        <footer className="footer">
          <p className="footer__copyrights">
            All icons from Flaticon. Restaurants data from Foursquare API
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
