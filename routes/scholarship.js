var express = require('express');
var router = express.Router();
var pool = require('../pool.js');
var upload = require('../multer.js');

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

router.all('/*', function(req, res, next) {
  if (req.session.admin === undefined) {
    res.redirect('/admin/login');
  } else {
    next();
  }
});

router.get('/allJSON', function(req, res) {
  let query = `select * from scholarship`;
  pool.query(query, function(err, result) {
    if (err) throw err;
    res.json(result);
  });
});

router.get('/add', function(req, res) {
  res.render('scholarship/add', { admin: req.session.admin });
});

router.post('/add', upload.single('banner'), function(req, res) {
  pool.query(
    `insert into scholarship set ? `,
    { ...req.body, banner: req.file.filename },
    function(err, result) {
      if (err) throw err;
      res.redirect('/scholarship/all');
    }
  );
});

router.get('/all', function(req, res) {
  let query = `select * from scholarship`;
  pool.query(query, function(err, result) {
    if (err) throw err;
    res.render('scholarship/all', {
      scholarships: result,
      admin: req.session.admin
    });
  });
});

router.get('/update/:id', function(req, res) {
  let id = req.params.id;
  let query = `select * from scholarship where _id = ${id}`;
  pool.query(query, function(err, result) {
    if (err) throw err;
    res.render('scholarship/edit', {
      scholarship: result[0],
      admin: req.session.admin
    });
  });
});

router.post('/update', upload.single('banner'), function(req, res) {
  let _id = req.body._id;
  let data = null;
  if (req.file === undefined) {
    data = { ...req.body };
  } else {
    data = { ...req.body, banner: req.file.filename };
  }
  let query = updateQueryGenerator(`scholarship`, data, _id);
  pool.query(query, function(err, result) {
    if (err) throw err;
    res.redirect('/scholarship/all');
  });
});

router.get('/delete/:id', function(req, res) {
  let query = `delete from scholarship where _id = ${req.params.id}`;
  pool.query(query, function(err, result) {
    if (err) throw err;
    res.redirect('/scholarship/all');
  });
});

module.exports = router;
