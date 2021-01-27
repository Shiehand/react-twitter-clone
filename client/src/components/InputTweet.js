import React, { Component } from "react";
import '../styles/app.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const API_URL = "http://localhost:5000/tweet";

export default class InputTweet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
      name: "",
      nameError: false,
      bodyError: false,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.name === "" || this.state.body === "") {
      this.setState({
        nameError: true,
        bodyError: true,
      })
      return;
    }
    const tweet = {
      name: this.state.name,
      body: this.state.body,
    };
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
      nameError: false,
      bodyError: false,
    })
  };

  handleChange = (event) => {
    if (event.target.value === "") {
      this.setState({
        [event.target.name + "Error"]: true
      })
    } else {
      this.setState({
        [event.target.name + "Error"]: false
      })
    }
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
          <TextField
            style={{marginBottom: "10px"}}
            className="input-name"
            name="name"
            value={this.state.name}
            placeholder="Enter your name..."
            onChange={this.handleChange}
            error={this.state.nameError}
            helperText={this.state.nameError ? "Please enter your name" : ""}
          />
          <TextField
            rows={3}
            variant='outlined'
            style={{ width: '100%' }}
            multiline
            className="input-body"
            name="body"
            value={this.state.body}
            placeholder="Enter your tweet..."
            onChange={this.handleChange}
            onKeyDown={this.submitTextArea}
            error={this.state.bodyError}
          />

          <Button variant="contained" onClick={this.handleSubmit} color="primary">Tweet</Button>
        </form>
      </div>
    );
  }
}
