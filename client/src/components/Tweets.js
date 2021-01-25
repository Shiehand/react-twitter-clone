import React from "react";
import '../styles/tweet.css';

const LIKE_URL = "http://localhost:5000/like"
const FETCH_URL = "http://localhost:5000/tweets"

export default class Tweets extends React.Component {
  state = {
    tweets: [],
  };

  fetchTweet = async () => {
    const response = await (await fetch(FETCH_URL)).json();
    this.setState({
      tweets: response,
    });
  };

  submitLike = async (id) => {
    fetch(`${LIKE_URL}/${id}`);
    this.fetchTweet(); //this probably isn't efficient
  }

  componentDidMount() {
    this.fetchTweet();
  }

  render() {
    return (
      <div className='tweets-container'>
        {this.state.tweets.map((tweet) => {
          console.log(tweet);
          return <ul key={tweet.id}>
            <div>{tweet.name}</div>
            <div>{tweet.body}</div>
            <button onClick={() => this.submitLike(tweet.id)}>{tweet.likes}</button>
          </ul>;
        })}
        <button onClick={this.fetchTweet}>Refresh</button>
      </div>
    );
  }
}
