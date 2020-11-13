/* eslint-disable no-console */
const faker = require('faker');
const mongoose = require('mongoose');
/**
 * Schemas
 */
mongoose.connect('mongodb://localhost/FEC', { useNewUrlParser: true })
  .catch((err) => console.error(err));

const listingSchema = new mongoose.Schema({
  id: Number,
  owner: String,
  name: String,
  reserved: [String],
  fees: {
    pernight: Number,
    cleaning: Number,
    service: Number,
  },
});
const Listing = mongoose.model('Listing', listingSchema);

/**
 * Fee Generation
 */
function generateFees() {
  const fees = {};
  fees.pernight = Math.floor(Math.random() * 200) + 50;
  fees.cleaning = Math.floor(Math.random() * 25) + 5;
  fees.service = Math.floor(Math.random() * 10) + 5;
  return fees;
}
/*
 * Listing Generation
 */
function generateListingOwner() {
  return `${faker.name.firstName()} ${faker.name.lastName()}`;
}
function generateListingName() {
  const generate = faker.address;
  const randomSuffixes = [generate.streetSuffix, generate.secondaryAddress, generate.streetName];
  return `${faker.company.companyName()} ${faker.commerce.department()} ${randomSuffixes[Math.floor(Math.random() * randomSuffixes.length)]()}`;
}
function generateListing(count) {
  const listing = {};
  listing.id = count;
  listing.owner = generateListingOwner();
  listing.name = generateListingName();
  listing.reserved = [];
  listing.fees = generateFees();
  return listing;
}

module.exports = {
  generateListing,
  listingModel: Listing,
};
