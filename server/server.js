const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();
const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

app.get("/tweets", async (req, res) => {
  try {
    const allTweets = await pool.query(
      "SELECT * FROM tweets ORDER BY id ASC"
    );
    res.json(allTweets.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/like/:id", async (req, res) => {
  try {
    await pool.query(
      "UPDATE tweets SET likes = likes + 1 WHERE id = $1", [req.params.id]
    );
    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);
  }
})

app.post("/tweet", async (req, res) => {
  try {
    const { name } = req.body;
    const { body } = req.body;
    console.log(name === "");
    const now = new Date();
    const newTweet = await pool.query(
      "INSERT INTO tweets (name, body, date) VALUES ($1, $2, $3) RETURNING *",
      [name, body, now]
    );
    res.json(newTweet.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));
