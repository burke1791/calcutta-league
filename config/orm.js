const connection = require('./connection');

let orm = {
  selectWhere: (params, cb) => {
    let queryString = 'SELECT ?? FROM ?? WHERE' + queryWhereBuilderTest(params.where, 'AND');
    let queryParams = [params.select, params.from].concat(params.where.values);
    
    let query = connection.query(queryString, queryParams, (err, result) => {
      // @TODO error handling!!
      cb(err, result);
    });
    console.log(query.sql);
  },
  
  insert: (params, cb) => {
    let queryString = 'INSERT INTO ?? SET ?';
    let query = connection.query(queryString, [params.table, params.data], (err, result) => {
      // @TODO error handling!!
      cb(err, result);
    });
    if (params.debug || true) {
      console.log(query.sql);
    }
  },

  // used to copy records from one table to another table
  insertSelectJoinWhereAnd: (params, cb) => { 
    let queryString = 'INSERT INTO ?? ' + params.columns + ' SELECT ?? FROM ?? JOIN ?? WHERE ? AND ?';
    let query = connection.query(queryString, [params.insertTable, params.select, params.fromTable, params.join, params.where, params.and], (err, result) => {
      cb(err, result);
    });
    console.log(query.sql);
  },

  // spent too many hours trying to programatically get this query to work
  // just going to hard code it until I'm not as much of a moron
  selectJoinWhereGroup: (uid, cb) => {
    // let queryString = 'SELECT ??';
    // queryString += querySumBuilder(params.sum);
    // queryString += 'FROM ??';
    // queryString += queryJoinBuilder(params.joinTable, 'LEFT');
    // queryString += queryWhereBuilder(params.where, 'AND');
    // queryString += queryGroupBuilder(params.group);

    // let options = [params.columns, params.table];
    // options.push(...params.joinCondition);
    // options.push(...params.where);
    // options.push(params.group);

    let queryString = `SELECT u.user_id, l.league_id, l.league_name, l.league_status, l.auction_id, lm.role, SUM(lt.price) AS buyIn, SUM(lt.return) AS payout
    FROM league_membership lm
    LEFT JOIN users u
    ON ?
    LEFT JOIN league_teams lt
    ON lt.user_id = u.user_id AND lt.league_id = lm.league_id
    LEFT JOIN leagues l
    ON l.league_id = lm.league_id
    WHERE lm.league_id = l.league_id AND lm.user_id = u.user_id
    GROUP BY l.league_id, u.user_id`;

    let query = connection.query(queryString, uid, (err, result) => {
      cb(err, result);
    });
    console.log(query.sql);
  },

  selectJoinWhereGroupTest: (params, cb) => {
    let queryString = 'SELECT ??';
    queryString += querySumBuilder(params.sum, params.sumAlias);
    queryString += 'FROM ??'
    queryString += queryJoinBuilder(params.joinTable, params.joinCondition, 'LEFT');
    queryString += queryWhereBuilder(params.where, null);
    queryString += queryGroupBuilder(params.group);

    let options = [params.columns, ...params.sum, params.table];
    options.push(...(() => {
      let arr = [];
      params.joinCondition.forEach(el => {
        arr.push(...el);
      });
      return arr;
    })());
    options.push(params.where);
    options.push(params.group);

    console.log(options);

    let query = connection.query(queryString, options, (err, result) => {
      cb(err, result);
    });
    console.log(query.sql);
  },

  // for testing new queries from the models
  query: (queryString, queryArray, where, cb) => {
    let query = connection.query(queryString, [queryArray, where], (err, result) => {
      cb(err, result);
    });
    // console.log(query.sql);
  }
}

const queryWhereBuilderTest = (where, logical) => {
  let whereString = ' ';

  for (var i in where.columns) {
    whereString += where.columns[i] + ' = ?';
    if (i < where.columns.length - 1) {
      whereString = whereString + ' ' + logical + ' ';
    }
  }

  return whereString;
}

const queryWhereBuilder = (where, logical) => {
  let whereString = ' ';

  for (var i in where) {
    if (i > 0) {
      whereString += ' ' + logical + ' ?';
    } else {
      whereString += 'WHERE ?';
    }
  }

  return whereString;
}

const queryJoinBuilder = (joinTable, joinCondition, direction) => {
  let joinString = ' ';

  for (var i in joinTable) {
    // if someone tries to insert a drop statement, void this join builder
    if (joinTable[i].toLowerCase().includes('drop') || joinTable[i].includes(';')) {
      return null;
    } else {
      joinString += ' ' + direction + ' JOIN ';
      joinString += joinTable[i];

      if (joinCondition[i].length > 2) {
        for (var j in joinCondition[i]) {
          if (j > 1) {  
            if (j % 2 == 0) {
              joinString += ' AND ?? = ';
            } else {
              joinString += '??';
            }
          } else {
            if (j % 2 == 0) {
              joinString += ' ON ?? = ';
            } else {
              joinString += '??';
            }
          }
        }
      } else {
        joinString += ' ON ?? = ??';
      }
    }
  }
  return joinString;
}

const queryGroupBuilder = (groupBy) => {
  let groupString = ' GROUP BY ??';
  return groupString;
}

const querySumBuilder = (sum, sumAlias) => {
  let sumString = ' ';
  for (var i in sum) {
    // if someone tries to insert a drop statement, void this join builder
    if (sum[i].toLowerCase().includes('drop') || sum[i].includes(';')) {
      return null;
    } else {
      sumString += ', SUM( ?? ) AS ' + sumAlias[i] + ' ';
    }
  }

  return sumString;
}

module.exports = orm;