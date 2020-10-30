CREATE DATABASE twitter-clone;

CREATE TABLE tweets(
    tweet_id SERIAL PRIMARY KEY;
    name VARCHAR(255);
    body VARCHAR(255);
)