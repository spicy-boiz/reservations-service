const helpers = require('./helpers.js');
const mongoose = require('mongoose');

var seedDatabase = function(entryCount, startYear, endYear) {
  for (let count=0; count < entryCount;count++ ) {
    let years = helpers.generateYears(startYear, endYear);
    let calendar = new helpers.calendarModel({days: years});
    calendar.save()
    .then((addedCalendar)=>{
      let listingData = helpers.generateListing(count);
      listingData["calendar"] = addedCalendar._id;
      let listing = new helpers.listingModel(listingData);
      listing.save((err, doc) => {
        if (err) {
          console.error(err);
        } else {
          console.log(`Added to DB: Listing ${doc._id} Calendar ${addedCalendar._id}`)
        }
      })
    })
    .catch((err)=>console.error(err));
  }
}

seedDatabase(1, 2020, 2020);
