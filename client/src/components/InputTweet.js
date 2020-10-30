import React, { Component } from "react";
import shortid from "shortid";
import '../styles/app.css'

const API_URL = "http://localhost:5000/tweet";

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
    this.setState({
      body: "",
      name: "",
    })
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitTextArea = (event) => {
    if (event.keyCode === 13 && !event.shiftKey) {
      this.handleSubmit(event);
    }
  }
  render() {
    return (
      <div className="input-container">
        <form onSubmit={this.handleSubmit}>
          <input
            className="input-name"
            name="name"
            value={this.state.name}
            placeholder="Enter your name..."
            onChange={this.handleChange}
          ></input>

          <textarea
            style={{ width: '100%' }}
            className="input-body"
            name="body"
            value={this.state.body}
            placeholder="Enter your tweet..."
            onChange={this.handleChange}
            onKeyDown={this.submitTextArea}
          ></textarea>

          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}
