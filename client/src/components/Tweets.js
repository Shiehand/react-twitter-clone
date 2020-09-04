import React, { Component } from "react";

export default class Tweets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: "",
    };
  }

  render() {
    return <div>{this.props.body}</div>;
  }
}
