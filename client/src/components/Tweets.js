import React from "react";
import '../styles/tweet.css';

import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import RefreshIcon from '@material-ui/icons/Refresh'
import LikeIcon from '@material-ui/icons/ThumbUp'
import Paper from '@material-ui/core/Paper'
import NextIcon from '@material-ui/icons/NavigateNext'
import PrevIcon from '@material-ui/icons/NavigateBefore'

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

  formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(date).toLocaleDateString(undefined, options)
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
            <Paper className="tweet-container" elevation={3}>
              <div>{tweet.name} at <span style={{color: '#0000FF'}}>{this.formatDate(tweet.date)}</span></div>
              <div></div>
              <div>{tweet.body}</div>
              <Button size="small" color="primary" startIcon={<LikeIcon />} onClick={() => this.submitLike(tweet.id)}>
                {tweet.likes}
              </Button>
            </Paper>
          </ul>;
        })}
        <div className='next-prev-container'>
          <IconButton onClick={this.prevPage}><PrevIcon /></IconButton>
          <IconButton onClick={this.nextPage}><NextIcon /></IconButton>
        </div>
        <div className='refresh-container'>
          <IconButton variant="contained" size="small" color="primary" onClick={this.fetchTweet}><RefreshIcon /></IconButton>
        </div>
      </div>
    );
  }
}
