var mysql = require('mysql');

var pool = mysql.createPool({
  host: '68.66.224.58',
  user: 'saanviin_consultancy',
  password: 'Reactnative@2018',
  database: 'saanviin_consultancy',
  multipleStatements: true
});

module.exports = pool;
