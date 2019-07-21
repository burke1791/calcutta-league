const connection = require('./connection');

let orm = {
  insert: (params, cb) => {
    let queryString = 'INSERT INTO ?? SET ?';
    let query = connection.query(queryString, [params.table, params.data], (err, result) => {
      // @TODO error handling!!
      cb(err, result);
    });
    if (params.debug) {
      console.log(query.sql);
    }
  },

  // for testing new queries from the models
  query: (queryString, queryArray, where, cb) => {
    let query = connection.query(queryString, [queryArray, where], (err, result) => {
      cb(err, result);
    });
    console.log(query.sql);
  }
}

module.exports = orm;