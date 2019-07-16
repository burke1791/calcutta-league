const orm = require('../config/orm');

let league = {
  create: (leagueObj, cb) => {
    let queryParams = {
      table: 'leagues',
      data: leagueObj // keys must match column names
    };
    orm.insert(queryParams, cb);
  }
}

module.exports = league;