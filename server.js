//At this point only a single GET route "/" is required which returns the following object (JSON): {message: "API Listening"}.

// Path: server.js
const express = require('express');
const path = require('path');
const cors = require('cors');


const app = express();
var HTTP_PORT = process.env.PORT || 8080;

const MoviesDB = require('./modules/moviesDB.js');
const db = new MoviesDB();
require('dotenv').config();
app.use(cors());
app.use(express.json());








 app.get('/', (req, res) => {
  res.json({message: "API Listening"});
});



app.post('/api/movies', (req, res) => {
  db.addNewMovie(req.body).then((data) => {
    res.status(201).json(data);
  }).catch((err) => {
    res.status(404).json({message: err});
  });
});




app.get('/api/movies', (req, res) => {
  db.getAllMovies(req.query.page, req.query.perPage, req.query.title).then((data) => {
    res.status(200).json(data);
  }).catch((err) => {
    res.status(500).json({message: err});
  });
});




app.get('/api/movies/:id', (req, res) => {
  db.getMovieById(req.params.id).then((data) => {
    res.status(200).json(data);
  }).catch((err) => {
    res.status(500).json({message: err});
  });
});





app.put('/api/movies/:id', (req, res) => {
  db.updateMovieById(req.params.id, req.body).then((data) => {
    res.status(200).json(data);
  }).catch((err) => {
    res.status(404).json({message: err});
  });
});






app.delete('/api/movies/:id', (req, res) => {
  db.deleteMovieById(req.params.id).then((data) => {
    res.status(204).json({message: 'Deleted'});
  }).catch((err) => {
    res.status(500).json({message: err});
  });
});





db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
  app.listen(HTTP_PORT, ()=>{
  console.log(`server listening on: ${HTTP_PORT}`);
  });
 }).catch((err)=>{
  console.log(err);
 });


