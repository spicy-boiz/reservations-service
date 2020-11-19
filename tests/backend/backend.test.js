/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
/* eslint-disable new-cap */
/* eslint-disable no-console */
/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
const mms = require('mongodb-memory-server');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../../server/app.js');
const helpers = require('../../db/helpers.js');
const models = require('../../db/models.js');

describe('Seeding', () => {
  const mongoServer = new mms.MongoMemoryServer();
  const expectedListing = {
    id: 0,
    owner: 'Dumbledore',
    name: 'Hogwarts',
    reserved: [new Date(2020, 0, 1)],
    fees: {
      pernight: 50,
      cleaning: 25,
      service: 15,
    },
  };
  const expectedGenerated = helpers.generateListing(1);
  expectedGenerated.reserved.push(new Date(2020, 0, 1));
  beforeEach(async () => {
    const mongoURi = await mongoServer.getUri();
    await mongoose.connect(mongoURi, { useNewUrlParser: true })
      .catch((err) => console.error(err));
  });
  afterEach(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });
  describe('Listing Generation', () => {
    test('Creates an object with the keys: id, owner, name, reserved, and fees', () => {
      const expectedKeys = ['id', 'owner', 'name', 'reserved', 'fees'];
      expect(expectedKeys).toEqual(Object.keys(helpers.generateListing(0)));
    });
    test('Expects the listing object to have the correct output types', () => {
      const expectedTypes = ['number', 'string', 'string', true, ['number', 'number', 'number']];
      const actualTypes = [];
      const listing = helpers.generateListing(0);
      const keys = Object.keys(listing);
      for (let index = 0; index < keys.length; index += 1) {
        const listingValue = listing[keys[index]];
        if (keys[index] === 'reserved') {
          actualTypes.push(Array.isArray(listingValue));
        } else if (keys[index] === 'fees') {
          actualTypes.push(Object.keys(listingValue).map((key) => (typeof listingValue[key])));
        } else {
          actualTypes.push(typeof listingValue);
        }
      }
      expect(expectedTypes).toEqual(actualTypes);
    });
  });
  describe('Database Insertion', () => {
    test('Non-Generated Listing can be sucessfully added into database', () => {
      const newListing = new models.listingModel(expectedListing);
      expect.assertions(1);
      return newListing.save()
        .then(() => (models.listingModel.find({ id: 0 }, { _id: 0, __v: 0 })))
        .then((resObjects) => {
          expect(resObjects[0].toObject()).toEqual(expectedListing);
        });
    });
    test('Generated Listing can be sucessfully added into database', () => {
      const newListing = new models.listingModel(expectedGenerated);
      expect.assertions(1);
      return newListing.save()
        .then(() => (models.listingModel.find({ id: 1 }, { _id: 0, __v: 0 })))
        .then((resObjects) => {
          expect(resObjects[0].toObject()).toEqual(expectedGenerated);
        });
    });
  });
  describe('API Grabbing', () => {
    test('API server is functioning', () => (
      supertest(app)
        .get('/api/listings/')
        .then((response) => {
          expect(response.statusCode).toBe(200);
        })
    ));
    test('API returns all added listings', () => {
      const expectedListings = [expectedListing, expectedGenerated];
      return models.listingModel.insertMany(expectedListings)
        .then(() => (
          supertest(app)
            .get('/api/listings/')
            .then((response) => {
              response.body.forEach((listing) => {
                delete listing.__v;
                delete listing._id;
              });
              response.body.forEach((listing) => {
                const listingObj = listing;
                listingObj.reserved = listing.reserved.map((dateStr) => new Date(dateStr));
                return listingObj;
              });
              expect(response.body).toEqual(expectedListings);
            })
        ));
    });
    test('API returns the correct listing when supplied an ID', () => {
      const expectedListings = [expectedListing, expectedGenerated];
      return models.listingModel.insertMany(expectedListings)
        .then(() => (
          supertest(app)
            .get('/api/listings/0')
            .then((response) => {
              response.body.forEach((listing) => {
                delete listing.__v;
                delete listing._id;
              });
              response.body.forEach((listing) => {
                const listingObj = listing;
                listingObj.reserved = listing.reserved.map((dateStr) => new Date(dateStr));
                return listingObj;
              });
              expect(response.body[0]).toEqual(expectedListing);
            })
        ));
    });
  });
});
