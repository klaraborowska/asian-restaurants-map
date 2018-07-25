import React, { Component } from "react";
import "./App.css";
import { MapContainer } from "./components/Map";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="header">Neighborhood Map</header>
        <div className="wrapper">
          <aside className="side-list">
            <input type="text" value="Search" id="input" className="search" />
            <ul className="list">
              <li className="list-item">Wilanów</li>
              <li className="list-item">Mokotów</li>
              <li className="list-item">Centrum</li>
              <li className="list-item">Praga</li>
              <li className="list-item">Ursus</li>
              <li className="list-item">Włochy</li>
              <li className="list-item">Białołęka</li>
              <li className="list-item">Wola</li>
              <li className="list-item">Żoliborz</li>
              <li className="list-item">Bielany</li>
            </ul>
          </aside>
          
          <div className="map"><MapContainer google = {window.google}/></div>
        </div>
      </div>
    );
  }
}

export default App;
