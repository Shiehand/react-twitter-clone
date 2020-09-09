const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.port || 5000;

const tweets = [];

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express");
});

app.get("/tweets", (req, res) => {
  res.json({ tweets: tweets });
});

app.post("/tweets", (req, res) => {
  tweets.push(req.body);
  res.sendStatus(200);
});

app.listen(port, () => console.log(`Listening on port ${port}`));
