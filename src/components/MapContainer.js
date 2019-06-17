import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import FetchFromCoords from "./FetchFromCoords.js";
import React, { Component } from "react";
class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: [],
      activeMarker: {},
      selectedPlace: {},
      showingInfoWindow: false
    };
  }
  onMarkerClick = (props, marker) => {
    return this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    });
  };
  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };
  handleMapClick = (ref, map, ev) => {
    const location = ev.latLng;
    this.setState(prevState => ({
      locations: [...prevState.locations, location]
    }));
    map.panTo(location);
  };

  render() {
    return (
      <div className="map-container">
        <Map
          google={this.props.google}
          className={"map"}
          zoom={this.props.zoom}
          initialCenter={this.props.center}
          onClick={this.handleMapClick}
        >
          {this.state.locations.map((location, i) => {
            return (
              <Marker
                name="Current location"
                key={i}
                onClick={this.onMarkerClick}
                position={{ lat: location.lat(), lng: location.lng() }}
              />
            );
          })}
          <InfoWindow
            marker={this.state.activeMarker}
            onClose={this.onInfoWindowClose}
            visible={this.state.showingInfoWindow}
          >
            <div>
              {this.state.selectedPlace.position ? (
                <>
                  <h1>Lat: {this.state.selectedPlace.position.lng}</h1>
                  <h1>Lng: {this.state.selectedPlace.position.lat}</h1>
                  <FetchFromCoords
                    coordinates={this.state.selectedPlace.position}
                  />
                </>
              ) : null}
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY
})(MapContainer);
