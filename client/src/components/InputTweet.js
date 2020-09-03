import React, { Component } from "react";

export default class InputTweet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tweet: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <textarea
            name="tweet"
            value={this.state.tweet}
            placeholder="Enter your tweet..."
            onChange={this.handleChange}
          ></textarea>
        </form>
      </div>
    );
  }
}
