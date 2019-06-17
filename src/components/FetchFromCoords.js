import React, { Component } from "react";

export default class FetchFromCoords extends Component {
  render() {
    return (
      <div>
        <button onClick={console.log(this.props.coordinates)}>Click!</button>
      </div>
    );
  }
}
