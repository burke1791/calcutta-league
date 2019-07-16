const mysql = require('mysql');
const config = require('./config.js');

const connection = mysql.createConnection(config.mysql.url);

connection.connect(error => {
  if (error) throw error;
  console.log('connected to database on ' + connection.config.host + ' as ' + connection.config.user + '@' + connection.config.database);
});

module.exports = connection;