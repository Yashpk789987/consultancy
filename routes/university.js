var express = require('express');
var router = express.Router();
var pool = require('../pool.js');

function updateQueryGenerator(table, data, _id) {
  let query = `update ${table} set `;
  let keys = Object.keys(data);
  let values = Object.values(data);
  for (let i = 0; i < keys.length; i++) {
    if (!(keys[i] === '_id')) {
      query += ` ${keys[i]} = '${values[i]}',`;
    }
  }
  query = query.substr(0, query.length - 1);
  query += ` where _id = ${_id}`;
  return query;
}

router.get('/allJSON', function(req, res) {
  let query = `select * from university`;
  pool.query(query, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

router.all('/*', function(req, res, next) {
  if (req.session.admin === undefined) {
    res.redirect('/admin/login');
  } else {
    next();
  }
});

router.get('/add', function(req, res) {
  res.render('university/add', { admin: req.session.admin });
});

router.post('/add', function(req, res) {
  pool.query(`insert into university set ? `, req.body, function(err, result) {
    if (err) throw err;
    res.redirect('/university/all');
  });
});

router.get('/all', function(req, res) {
  let query = `select * from university`;
  pool.query(query, function(err, result) {
    if (err) throw err;
    res.render('university/all', {
      universities: result,
      admin: req.session.admin
    });
  });
});

router.get('/update/:id', function(req, res) {
  let id = req.params.id;
  let query = `select * from university where _id = ${id}`;
  pool.query(query, function(err, result) {
    if (err) throw err;
    res.render('university/edit', {
      university: result[0],
      admin: req.session.admin
    });
  });
});

router.post('/update', function(req, res) {
  let _id = req.body._id;
  let query = updateQueryGenerator(`university`, req.body, _id);
  pool.query(query, function(err, result) {
    if (err) throw err;
    res.redirect('/university/all');
  });
});

router.get('/delete/:id', function(req, res) {
  let query = `delete from university where _id = ${req.params.id}`;
  pool.query(query, function(err, result) {
    if (err) throw err;
    res.redirect('/university/all');
  });
});

module.exports = router;
