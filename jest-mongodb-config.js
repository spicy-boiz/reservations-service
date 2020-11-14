module.exports = {
  mongodbMemoryServerOptions: {
    instance: {
      dbName: 'jest',
    },
    binary: {
      version: 'latest', // Version of MongoDB (Why does 'latest' work but not v4.4.1)
      skipMD5: true,
    },
    autoStart: false,
  },
};
