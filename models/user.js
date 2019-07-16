const orm = require('../config/orm.js');

let user = {
  create: (userObj, cb) => {
    let queryParams = {
      table: 'users',
      data: userObj // keys must match column names
    };
    orm.insert(queryParams, cb);
  },
}

module.exports = user;