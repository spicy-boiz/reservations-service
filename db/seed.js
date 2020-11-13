const helpers = require('./helpers.js');
const mongoose = require('mongoose');

var seedDatabase = function(entryCount, startYear, endYear) {
  var years = helpers.generateYears(startYear, endYear);
  var calendar = new helpers.calendarModel({days: years});
  var calendars = (new Array(entryCount)).fill({days:years});
  helpers.calendarModel.insertMany(calendars)
  .then((createdCalendars) => {
    let listings = createdCalendars.map((calendar, index) => {
      let listingData = helpers.generateListing(index);
      listingData["calendar"] = calendar._id;
      return listingData;
    });
    return helpers.listingModel.insertMany(listings);
  })
  .then((createdListings)=>console.log(`Number of Listings Created: ${createdListings.length}`))
  .catch((err)=>{
    console.error(err);
  })
}

seedDatabase(100, 2020, 2020);
