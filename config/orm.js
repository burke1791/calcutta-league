const connection = require('./connection');

let orm = {
  selectWhere: (params, cb) => {
    let queryString = 'SELECT ?? FROM ?? WHERE' + queryWhereBuilder(params.where, 'AND');
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
    if (params.debug) {
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

  // for testing new queries from the models
  query: (queryString, queryArray, where, cb) => {
    let query = connection.query(queryString, [queryArray, where], (err, result) => {
      cb(err, result);
    });
    // console.log(query.sql);
  }
}

const queryWhereBuilder = (where, logical) => {
  let whereString = ' ';

  for (var i in where.columns) {
    whereString += where.columns[i] + ' = ?';
    if (i < where.columns.length - 1) {
      whereString = whereString + ' ' + logical + ' ';
    }
  }

  return whereString;
}

module.exports = orm;