import React, { Component } from "react";

export default class Tweet extends Component {
  render() {
    return (
      <div>
        <div>{this.props.content.name}</div>
        <div>{this.props.content.body}</div>
      </div>
    );
  }
}
