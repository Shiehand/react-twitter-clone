import React from "react";
import Tweet from "./Tweet";
import '../styles/tweet.css';

const API_URL = "http://localhost:5000/tweets";

export default class Tweets extends React.Component {
  state = {
    tweets: [],
  };

  fetchTweet = async () => {
    const response = await (await fetch(API_URL)).json();
    this.setState({
      tweets: response.tweets,
    });
  };

  render() {
    return (
      <div className='tweets-container'>
        {this.state.tweets.map((element) => {
          return <Tweet key={element.id} content={element} />;
        })}
        <button onClick={this.fetchTweet}>Refresh</button>
      </div>
    );
  }
}
