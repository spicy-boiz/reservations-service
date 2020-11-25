/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const Helpers = require('../db/models.js');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use('/', express.json());
// app.use('/api/reservations/:id', express.static(path.join(__dirname, '..', 'client', 'dist')));
app.use('/listings/:id', express.static(path.join(__dirname, '..', 'client', 'dist')));
// app.use('/:id', express.static(path.join(__dirname, '..', 'client', 'dist')));
// app.use('/bundle.js', express.static(path.join(__dirname, '..', 'client', 'dist', 'build', 'bundle.js')));
// app.get('/reservations/:id', (req, res) => {
//   Helpers.listingModel.find({ id: req.params.id })
//     .then((listings) => {
//       res.header('Content-Type', 'application/json');
//       res.send(JSON.stringify(listings, 0, 2));
//     })
//     .catch((err) => console.error(err));
// });
app.get('/api/listings/', (req, res) => {
  console.log('no id');
  Helpers.listingModel.find()
    .then((listings) => {
      res.header('Content-Type', 'application/json');
      res.send(JSON.stringify(listings, 0, 2));
    });
});
app.get('/api/listings/:id', (req, res) => {
  console.log('id');
  Helpers.listingModel.find({ id: req.params.id })
    .then((listings) => {
      res.header('Content-Type', 'application/json');
      res.send(JSON.stringify(listings, 0, 2));
    });
});

module.exports = app;
