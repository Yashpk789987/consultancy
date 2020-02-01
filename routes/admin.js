var express = require('express');
var router = express.Router();
var pool = require('../pool.js');

router.get('/login', function(req, res) {
  res.render('admin/login', { message: '' });
});

router.post('/checkLogin', function(req, res) {
  let query = `select * from admin where email = '${req.body.email}' and password = '${req.body.password}'`;
  pool.query(query, function(err, result) {
    if (err) throw err;
    if (result.length === 0) {
      res.render('admin/login', { message: 'Wrong Credientials' });
    } else {
      req.session.admin = result[0];
      res.redirect('/admin/home');
    }
  });
});

router.all('/*', function(req, res, next) {
  if (req.session.admin === undefined) {
    res.redirect('/admin/login');
  } else {
    next();
  }
});

router.get('/home', function(req, res) {
  res.render('admin/home', { admin: req.session.admin });
});

module.exports = router;
