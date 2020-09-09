import React, { Component } from "react";
import shortid from "shortid";
const API_URL = "http://localhost:5000/tweets";

export default class InputTweet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
      name: "",
    };
  }

  handleSubmit = (event) => {
    const tweet = {
      id: shortid.generate(),
      name: this.state.name,
      body: this.state.body,
    };
    event.preventDefault();
    fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(tweet),
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
    });
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
          <input
            name="name"
            value={this.state.name}
            placeholder="Enter your name..."
            onChange={this.handleChange}
          ></input>

          <textarea
            name="body"
            value={this.state.body}
            placeholder="Enter your tweet..."
            onChange={this.handleChange}
          ></textarea>
        </form>
      </div>
    );
  }
}
