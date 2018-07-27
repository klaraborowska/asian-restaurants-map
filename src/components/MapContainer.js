import React, { Component } from "react";
import { Map, InfoWindow, Marker } from "google-maps-react";

class MapContainer extends Component {
  render() {
    const style = {};
    const icon = {
      url: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABj1BMVEUAAAD/u0T4tz75tD/4tT/4tT/+jwb9lQ78mRX7nRr/pyP5tUH4tT//jwX9nBryrkP3tj/9lxD4mCL0sUP4tj//kAb5nB34tT/9lg75tj78nBjzuTr4tT/+jwT5pB73tT/8nBn4tT/9mBT5tT/+lAz/qlX4tT//qiv/lRX4tj7+lQ74tT/+mhf6tj78nh3//wD5tj///wD4tj78mRP/uDn4tT//jwP/oB35tT/8mhb/szP/mRr4tD/8mxf/v0D4tT/+kQj/nyD4tT/+lQz4tkL7oR/4tkD+nBj4tj/+lA33sj74tD/7nB34tUD8mxf4tT/+lA33szz4tT//nxv4tT//jAD5u0z6xmf9pjL+lRH6wl3+46z/7MH34qX41Ir9oCb7z3z/7MD34aT7tE36wVv/67/34aP9nyT+4af50YT4uEb34qT/kQn6w2D9oir+jQL4t0T/jwb93p/5zHr5vVL/6rz335/+mBj6yGv/6bv33p38qTj5vFD93Jv5yXX+lxX4tkH5v1b+nB7/jQIAAACsV1vaAAAAVHRSTlMAD0p+sub96L5/HVPq/YsTp+ElF+X8LK/mW5YW7v4qXZiR0MXyA/UGDLjrdbQxWQHsAovKEvD+I3m5ChRmowTZ+QjC8CNBbKq/7yHzPmimu+0e8jjB0ZCiAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAAN1wAADdcBQiibeAAAAAd0SU1FB+IHHAArErp+qD8AAAFfSURBVDjLfdL1V8MwEAfw4O6uG7bhY0hxd7cWGQkwYMMptuH+j5NrXklast2P/X5e3vXuEOIVExsXn5CYlJySiqSVlq7S0mhlZErirGxVNYGm5eTa87x8VQRaQaENFLF4Y3Nrm4lia15ixL4djAnZ3TNEqZiXlUO+78cAyMEhgIpKATggPwpgBkjwGIRTAFUATrAJyCmAagHU0PzMz8H5BQW1PK9zUXCJOSBXFOjuP+AG4BMB/Ihez59ooOA6wEHwhoJGoYcmaPKWgztoslkALQDuQyYIPwBoFYCnDcTjEwPPL8agvOIo241Rv76FMAm/fxij7rDsorOLLevz6/uHLUvptm6rR7WuW+u1rbvPfg/99osZsILBfyc3NCyCkVHJzYpAdrVojINxWY4mXCbQJ6UATZlgWp4jzwwDs94IAM3NA1AWUMRaBLAUOUeeZVVb8UYBaHVNWUdRy+G0ffgFCX+fi6Tacn0AAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDctMjhUMDA6NDM6MTgrMDI6MDAgibP/AAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTA3LTI4VDAwOjQzOjE4KzAyOjAwUdQLQwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII="
  };
    return (
      <Map
        google={this.props.google}
        style={style}
        initialCenter={{
          lat: 52.2305556,
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
            icon={icon}
          />
        ))}

        <InfoWindow
          onClose={this.props.onInfoWindowClose}
          marker={this.props.appState.clickedMarker}
          visible={this.props.appState.showInfoWindow}
        >
          <div className="info-window">
            <h1 className="info-window-title">{this.props.appState.clickedMarker.name}</h1>
            <p className="info-window-details">{this.props.appState.clickedMarker.address ? this.props.appState.clickedMarker.address : "no address available"}</p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}
export default MapContainer;