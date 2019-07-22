let config = {
  dev: {
    mysql: {
      url: process.env.DB_URL
    },
    apiKeys: {}
  },
  staging: {
    mysql: {
      url: process.env.JAWSDB_URL
    },
    apiKeys: {}
  },
  prod: {
    mysql: {
      url: process.env.JAWSDB_URL
    },
    apiKeys: {}
  }
};

module.exports = config[process.env.APP_ENV || 'dev'];