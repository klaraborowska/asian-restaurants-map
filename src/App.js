import React, { Component } from "react";
import "./App.css";
import { MapContainer } from "./components/Map";
import ListItem from "./components/ListItem";
  

class App extends Component {

  state = {
    locations: [],
    filteredLocations: [],
    showInfoWindow: false,
    clickedMarker: {},
    selectedPlace: {},
    animation: 0
  };

  allMarkers = [];

  addMarker = (marker) => {
    if (marker) {
      this.allMarkers.push(marker)
    }
  }

  onMarkerClick = (props, marker) => {
    this.setState({
      selectedPlace: props,
      clickedMarker: marker,
      showInfoWindow: true,
      animation: 1
    });
    //console.log(this.state.clickedMarker)
  }

  onMapClick = () => {
    this.setState({
      showInfoWindow: false,
      animation: 0
    });
  }

  onListItemClick = (e) => {
    const clicked = this.allMarkers.filter(el => el.marker.name === e.target.innerHTML)
    this.setState({
      clickedMarker: clicked[0].marker,
      showInfoWindow: true,
      animation: 1
    }); 
    //console.log(clicked)
  }

  onInfoWindowClose = () => {
    this.setState({
      animation: 0,
      showInfoWindow: false
    });
  }

  onSearchLocation = (e) => {
    let searchQuery = e.target.value;
    this.setState({
      filteredLocations: this.state.locations.filter(el => el.venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ),
      showInfoWindow: false,
      animation: 0
    });
  }

  styleSearchField = () => {
    document.querySelector('.search-label').classList.add('search-top')
  }

  styleSearchFieldTest = () => {
    document.querySelector('.search-label').classList.remove('search-top')
  }

  componentDidMount() {
    const key = 'D5SNMMUIS3DTXRQ5FN5G1UBU4XKRSEGVR0KXMS5KRB1YZGSY';
    const secret= 'NAJXBKSQ4VEKRWJPDEGVPW1QMASLTUEGXWYDBOVJG2ODFF5J'
    fetch(`https://api.foursquare.com/v2/venues/explore?ll=52.2246756,21.0122287&categoryId=4bf58dd8d48988d137941735&client_id=${key}&client_secret=${secret}&v=20180726`)
    .then(response => response.json())
    .then(res => {
      const result = res.response.groups[0].items;
      this.setState({
        locations: result,
        filteredLocations: result
      });
      console.log(result)
    })
    .catch(error => {
      console.log(error)
    })
  }
  

  render() {

    return (
      <div className="App">
        <header className="header">
          <h1 className="header-title">Warsaw's Theaters</h1>
        </header>
        <div className="wrapper">
          <aside className="side-list">
            <form className="search-form">
              
              <input type="text" id="input" className="search" onChange={this.onSearchLocation} onFocus={this.styleSearchField} required/>
              <label for="input" className="search-label" >Search here</label>
            </form>
            
            <ul className="list">
              {this.state.filteredLocations.map(item => (
                <ListItem 
                  name={item.venue.name} 
                  key={item.venue.id} 
                  onListItemClick={this.onListItemClick}
                />
              ))}
            </ul>
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
      </div>
    );
  }
}

export default App;
