const orm = require('../config/orm');

let user = {
  create: (userObj, cb) => {
    let queryParams = {
      table: 'users',
      data: userObj // keys must match column names
    };
    orm.insert(queryParams, (err, result) => {
      console.log(result);
      let userInfo = {
        user_id: result.insertId,
        alias: userObj.alias,
        leagues: []
      };

      if (err) {
        console.log(err);
        cb(err, null);
      } else {
        cb(null, userInfo);
      }
    });
  },
  
  selectUserInfo: (uid, cb) => {
    let queryString = 'SELECT ?? FROM users LEFT JOIN league_membership ON users.user_id = league_membership.user_id LEFT JOIN leagues ON league_membership.league_id = leagues.league_id LEFT JOIN auctions ON leagues.league_id = auctions.league_id WHERE ?';
    
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
    orm.query(queryString, queryArray, where, (err, result) => {
      let userInfo = packageUserInfoAndCheckIntegrity(result);

      if (err) {
        console.log(err);
        cb(err, null);
      } else {
        cb(null, userInfo);
      }
    });
  }
}

// this function checks the integrity of the user's data coming back from MySQL
// at the moment, it only checks if the user_id and alias properties all match
const packageUserInfoAndCheckIntegrity = (data) => {
  let user_id = data[0].user_id;
  let alias = data[0].alias;

  let packagedUserInfo = {
    user_id: '',
    alias: '',
    leagues: []
  };
  
  // this loop both does an integrity check and packages the user info for the front end
  for (var row of data) {
    // checks to make sure the user_id and alias properties are the same for every array item
    if (row.user_id !== user_id || row.alias !== alias) {
      return false;
    }

    // will end up being set to the last user_id and alias entries, but they should all be the same anyways
    // will optimize in the future if necessary
    packagedUserInfo.user_id = row.user_id;
    packagedUserInfo.alias = row.alias;
    if (row.league_id) {
      packagedUserInfo.leagues.push({
        league_id: row.league_id,
        league_name: row.league_name,
        league_status: row.league_status,
        role: row.role,
        auction_id: row.auction_id
      });
    }
    
  }
  
  return packagedUserInfo;
}

module.exports = user;