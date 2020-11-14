/* eslint-disable new-cap */
/* eslint-disable no-console */
/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
const mms = require('mongodb-memory-server');
const mongoose = require('mongoose');
const helpers = require('../../db/helpers.js');
const models = require('../../db/models.js');
/**
 * Unit Test
 */
describe('Seeding functions', () => {
  const mongoServer = new mms.MongoMemoryServer();
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
  describe('Database Seeding', () => {
    beforeEach(async () => {
      const mongoURi = await mongoServer.getUri();
      await mongoose.connect(mongoURi, { useNewUrlParser: true })
        .catch((err) => console.error(err));
    });
    afterEach(async () => {
      await mongoose.disconnect();
      await mongoServer.stop();
    });
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
    test('Listing can be sucessfully added into database', async () => {
      const newListing = new models.listingModel(expectedListing);
      expect.assertions(1);
      return newListing.save()
        .then(() => (models.listingModel.find({ id: 0 }, { _id: 0, __v: 0 })))
        .then((resObjects) => {
          expect(resObjects[0].toObject()).toEqual(expectedListing);
        });
    });
  });
});
