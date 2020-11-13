/* eslint-disable no-console */
const faker = require('faker');
const mongoose = require('mongoose');
/**
 * Schemas
 */
mongoose.connect('mongodb://localhost/FEC', { useNewUrlParser: true })
  .catch((err) => console.error(err));

const daySchema = new mongoose.Schema({
  day: String,
  avaliable: Boolean,
  fees: {
    pernight: Number,
    cleaning: Number,
    service: Number,
  },
}, { _id: false });
const calendarSchema = new mongoose.Schema({
  days: [[daySchema]],
});
const Calendar = mongoose.model('Calendar', calendarSchema);
const listingSchema = new mongoose.Schema({
  id: Number,
  owner: String,
  name: String,
  calendar: mongoose.ObjectId,
});
const Listing = mongoose.model('Listing', listingSchema);
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
  return listing;
}

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

/**
 * Date Generation
 */
function generateDate(year, dayNum) {
  const date = {};
  const day = new Date(year, 0, dayNum);
  date.day = `${day.getMonth() + 1}-${day.getDate()}-${day.getFullYear()}`;
  date.avaliable = true;
  date.fees = generateFees();
  return date;
}
function generateYear(year) {
  let dates = [];
  const months = Array.from(new Array(12), () => []);
  for (let i = 1; i <= 365; i += 1) {
    dates.push(generateDate(year, i));
  }
  dates = dates.reduce((acc, dayObj) => {
    const monthNum = dayObj.day.split('-')[0];
    acc[monthNum - 1].push(dayObj);
    return acc;
  }, months);
  return dates;
}
module.exports = {
  generateListing,
  generateYear,
  calendarModel: Calendar,
  listingModel: Listing,
};
