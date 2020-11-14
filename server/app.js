/* eslint-disable no-console */
const express = require('express');
const Helpers = require('../db/models.js');
const mongoose = require('mongoose');

const app = express();

// app.use('/', express.json())
mongoose.connect('mongodb://localhost/FEC', { useNewUrlParser: true });
app.get('/api/listings/', (req, res) => {
  Helpers.listingModel.find()
    .then((listings) => {
      res.header('Content-Type', 'application/json');
      res.send(JSON.stringify(listings, 0, 2));
    });
});
app.get('/api/listings/:id', (req, res) => {
  Helpers.listingModel.find({ id: req.params.id })
    .then((listings) => {
      res.header('Content-Type', 'application/json');
      res.send(JSON.stringify(listings, 0, 2));
    });
});

module.exports = app;