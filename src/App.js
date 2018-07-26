import React, { Component } from "react";
import "./App.css";
import { MapContainer } from "./components/Map";
import ListItem from "./components/ListItem";
  

class App extends Component {
  state = {
    locations: []
  };

  componentDidMount() {
    const key = 'D5SNMMUIS3DTXRQ5FN5G1UBU4XKRSEGVR0KXMS5KRB1YZGSY';
    const secret= 'NAJXBKSQ4VEKRWJPDEGVPW1QMASLTUEGXWYDBOVJG2ODFF5J'
    fetch(`https://api.foursquare.com/v2/venues/explore?ll=52.2246756,21.0122287&categoryId=4bf58dd8d48988d137941735&client_id=${key}&client_secret=${secret}&v=20180726`)
    .then(response => response.json())
    .then(res => {
      console.log(res)
      const result = res.response.groups[0].items;
      this.setState({
        locations: result
      });
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
            <input type="text" value="Search" id="input" className="search" />
            <ul className="list">
              {this.state.locations.map(item => (
                <ListItem name={item.venue.name} key={item.venue.id} />
              ))}
            </ul>
          </aside>

          <div className="map">
            <MapContainer
              google={window.google}
              locations={this.state.locations}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
