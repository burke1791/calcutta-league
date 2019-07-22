let config = {
  dev: {
    mysql: {
      url: process.env.DB_URL
    },
    firebase: {
      dbUrl: 'https://calcutta-test.firebaseio.com'
    },
    apiKeys: {}
  },
  staging: {
    mysql: {
      url: process.env.JAWSDB_URL
    },
    firebase: {
      dbUrl: 'https://calcutta-test.firebaseio.com'
    },
    apiKeys: {}
  },
  prod: {
    mysql: {
      url: process.env.JAWSDB_URL
    },
    firebase: {
      dbUrl: 'https://calcutta-prod.firebaseio.com'
    },
    apiKeys: {}
  }
};

module.exports = config[process.env.APP_ENV || 'dev'];