const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let movies = [];
let id = 1;

app.get('/movies', (req, res) => {
  res.json(movies);
});

app.post('/movies', (req, res) => {
  const movie = { ...req.body, _id: id++ };
  movies.push(movie);
  res.json(movie);
});

app.put('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const movieIndex = movies.findIndex((m) => m._id === movieId);
  if (movieIndex >= 0) {
    movies[movieIndex] = { ...movies[movieIndex], ...req.body };
    res.json(movies[movieIndex]);
  } else {
    res.status(404).send('Movie not found');
  }
});

app.delete('/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  movies = movies.filter((m) => m._id !== movieId);
  res.status(204).send();
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
