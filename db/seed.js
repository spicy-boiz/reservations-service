/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const helpers = require('./helpers.js');

const seedDatabase = (entryCount) => {
  const entries = new Array(entryCount).fill(undefined);
  const listings = entries.map((id, index) => helpers.generateListing(index));
  helpers.listingModel.insertMany(listings)
    .then((createdListings) => console.log(`Number of Listings Created: ${createdListings.length}`))
    .catch((err) => console.error(err));
};

seedDatabase(100);
