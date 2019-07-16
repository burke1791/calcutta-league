const connection = require('./connection');

let orm = {
  insert: (params, cb) => {
    let queryString = 'INSERT INTO ?? SET ?';
    let query = connection.query(queryString, [params.table, params.data], (err, result) => {
      cb(err, result);
    });
    if (params.debug) {
      console.log(query.sql);
    }
  },
}

module.exports = orm;