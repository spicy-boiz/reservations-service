/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const helpers = require('./helpers.js');

const seedDatabase = (entryCount, startYear, endYear) => {
  const years = helpers.generateYear(startYear, endYear);
  const calendars = (new Array(entryCount)).fill({ days: years });
  helpers.calendarModel.insertMany(calendars)
    .then((createdCalendars) => {
      const listings = createdCalendars.map((calendar, index) => {
        const listingData = helpers.generateListing(index);
        listingData.calendar = calendar._id;
        return listingData;
      });
      return helpers.listingModel.insertMany(listings);
    })
    .then((createdListings) => console.log(`Number of Listings Created: ${createdListings.length}`))
    .catch((err) => {
      console.error(err);
    });
};

seedDatabase(100, 2020, 2020);
