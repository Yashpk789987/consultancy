var express = require('express');
var router = express.Router();
var pool = require('../pool.js');

function getDateAndTime() {
  var currentdate = new Date();
  var datetime =
    currentdate.getDate() +
    '/' +
    (currentdate.getMonth() + 1) +
    '/' +
    currentdate.getFullYear() +
    ' @ ' +
    currentdate.getHours() +
    ':' +
    currentdate.getMinutes() +
    ':' +
    currentdate.getSeconds();
  return datetime;
}

router.get('/', function(req, res) {
  res.send('');
});

router.get('/apply/:scholarship_id', function(req, res) {
  let scholarship_id = req.params.scholarship_id;
  if (req.session.user === undefined) {
    res.redirect('/users/signup');
  } else {
    let datetime = getDateAndTime();
    let data = {
      date: datetime.split('@')[0],
      time: datetime.split('@')[1],
      scholarship_id: scholarship_id,
      user_id: req.session.user._id,
      status: 'APPLIED'
    };
    pool.query(`insert into application set ?`, data, function(err, result) {
      if (err) throw err;
      req.flash('message', 'Your Request Has Registered Successfully...');
      res.redirect('/users/scholarships');
    });
  }
});

router.all('/*', function(req, res, next) {
  if (req.session.admin === undefined) {
    res.redirect('/admin/login');
  } else {
    next();
  }
});

router.get('/all', function(req, res) {
  let query = `select a.* , a._id as application_id , u.* , s.* from application a , user u , scholarship s where a.user_id = u._id and a.scholarship_id = s._id `;
  pool.query(query, function(err, result) {
    if (err) throw err;
    res.render('applications/all', {
      applications: result,
      admin: req.session.admin
    });
  });
});

router.get('/approve/:id', function(req, res) {
  let query = `update application set status = 'APPROVED' where _id = '${req.params.id}' `;
  pool.query(query, function(err, result) {
    if (err) throw err;
    res.redirect('/applications/all');
  });
});

router.get('/reject/:id', function(req, res) {
  let query = `update application set status = 'REJECTED' where _id = '${req.params.id}' `;
  pool.query(query, function(err, result) {
    if (err) throw err;
    res.redirect('/applications/all');
  });
});

router.get('/view/:id', function(req, res) {
  let query = `select a.* , a._id as application_id , u.* , s.* from application a , user u , scholarship s where a.user_id = u._id and a.scholarship_id = s._id and a._id = ${req.params.id}`;
  pool.query(query, function(err, result) {
    if (err) throw err;
    console.log(result[0]);
    res.render('applications/view', {
      admin: req.session.admin,
      application: result[0]
    });
  });
});

module.exports = router;
