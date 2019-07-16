const orm = require('../config/orm');

let user = {
  create: (userObj, cb) => {
    let queryParams = {
      table: 'users',
      data: userObj // keys must match column names
    };
    orm.insert(queryParams, cb);
  },
  
  selectUserInfo: (uid, cb) => {
    let queryString = 'SELECT ?? FROM users JOIN league_membership ON users.user_id = league_membership.user_id JOIN leagues ON league_membership.league_id = leagues.league_id JOIN auctions ON leagues.league_id = auctions.league_id WHERE ?';
    
    let queryArray = [
      'users.user_id',
      'users.alias',
      'leagues.league_id',
      'leagues.league_name',
      'leagues.league_status',
      'league_membership.role',
      'auctions.auction_id'
    ];

    let where = {
      uid: uid.uid
    };

    // orm.query is for testing new queries - will refactor to be more orm-y
    orm.query(queryString, queryArray, where, cb);
  }
}

module.exports = user;