import React from "react";
import '../styles/tweet.css';

const LIKE_URL = "http://localhost:5000/like";
const FETCH_URL = "http://localhost:5000/tweets";
const PAGE_SIZE = 5;

export default class Tweets extends React.Component {
  state = {
    tweets: [],
    page: 0,
  };

  fetchTweet = async () => {
    const response = await (await fetch(FETCH_URL)).json();
    this.setState({
      tweets: response,
      page: 0,
    });
  };

  submitLike = async (id) => {
    fetch(`${LIKE_URL}/${id}`);
    this.fetchTweet(); //this probably isn't efficient
  }

  nextPage = () => {
    if (this.state.tweets.length > (this.state.page + 1) * PAGE_SIZE) {
      this.setState({
        page: this.state.page + 1,
      })
    }
  }

  prevPage = () => {
    if (this.state.page > 0) {
      this.setState({
        page: this.state.page - 1,
      })
    }
  }

  componentDidMount() {
    this.fetchTweet();
  }

  render() {
    let i = this.state.page * PAGE_SIZE;
    return (
      <div className='tweets-container'>
        {this.state.tweets.slice(i, i + PAGE_SIZE).map((tweet) => {
          return <ul key={tweet.id}>
            <div>{tweet.name}</div>
            <div>{tweet.body}</div>
            <button onClick={() => this.submitLike(tweet.id)}>{tweet.likes}</button>
          </ul>;
        })}
        <button onClick={this.prevPage}>Previous</button>
        <button onClick={this.nextPage}>Next</button>
        <button onClick={this.fetchTweet}>Refresh</button>
      </div>
    );
  }
}
