const express = require('express');
const mongoose = require('mongoose');
const Helpers = require('../db/helpers.js')
const app = express();
const port = 3004;

app.use('/', express.json())
mongoose.connect('mongodb://localhost/FEC', {useNewUrlParser: true});

app.get('/api/listings/', (req, res) => {
  Helpers.listingModel.find()
  .then((listings) => {
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(listings, 0, 2))
  })
});
app.get('/api/calendars/', (req, res) => {
  Helpers.calendarModel.find()
  .then((listings) => {
    res.header("Content-Type", 'application/json');
    res.send(JSON.stringify(listings, 0, 2))
  })
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})