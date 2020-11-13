const faker = require('faker');
const mongoose = require('mongoose');
/**
 * Schemas
 */
mongoose.connect('mongodb://localhost/FEC', { useNewUrlParser: true })
  .catch((err) => console.error(err));

const _daySchema = new mongoose.Schema({
  day: String,
  avaliable: Boolean,
  fees: {
    pernight: Number,
    cleaning: Number,
    service: Number
  }
}, { _id: false });
const calendarSchema = new mongoose.Schema({
  days: [[_daySchema]],
});
const Calendar = mongoose.model('Calendar', calendarSchema);
const listingSchema = new mongoose.Schema({
  id: Number,
  owner: String,
  name: String,
  calendar: mongoose.ObjectId
});
const Listing = mongoose.model('Listing', listingSchema);
/*
 * Listing Generation
 */
function generateListing(count) {
  let listing = {};
  listing["id"] = count;
  listing["owner"] = generateListingOwner();
  listing["name"] = generateListingName();
  return listing;
}

function generateListingName(n) {
  var randomSuffixes = [faker.address.streetSuffix, faker.address.secondaryAddress, faker.address.streetName]
  return `${faker.company.companyName()} ${faker.commerce.department()} ${randomSuffixes[Math.floor(Math.random() * randomSuffixes.length)]()}`;
}

function generateListingOwner(n) {
  return `${faker.name.firstName()} ${faker.name.lastName()}`
}

/**
 * Fee Generation
 */
function generateFees() {
  var fees = {};
  fees["pernight"] = Math.floor(Math.random() * 200) + 50;
  fees["cleaning"] = Math.floor(Math.random() * 25) + 5;
  fees["service"] = Math.floor(Math.random() * 10) + 5;
  return fees;
}

/**
 * Date Generation
 */
function generateYears(startYear, endYear = startYear) {
  var years = [];
  for (var year = startYear; year <= endYear; year++) {
    years.push(generateYear(year));
  }
  return years;
}
function generateYear(year) {
  var dates = [];
  for (let i = 1; i <= 365; i++) {
    dates.push(generateDate(year, i));
  }
  return dates;
}
function generateDate(year, day) {
  var date = {};
  var day = new Date(year, 0, day);
  date["day"] = `${day.getMonth() + 1}-${day.getDate()}-${day.getFullYear()}`;
  date["avaliable"] = true;
  date["fees"] = generateFees();
  return date;
}

module.exports = {
  generateListing: generateListing,
  generateYears: generateYears,
  calendarModel : Calendar,
  listingModel : Listing
};