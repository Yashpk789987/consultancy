var express = require('express');
var router = express.Router();
var mysql = require('mysql');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/about-us', function(req, res, next) {
  res.render('about_us');
});

router.get('/pick-up-service', function(req, res, next) {
  res.render('pick-up-service');
});

router.get('/university', function(req, res, next) {
  res.render('university');
});

router.get('/scholarship', function(req, res, next) {
  res.render('scholarship');
});

router.get('/coursesnew', function(req, res, next) {
  res.render('coursesnew');
});

router.get('/agent', function(req, res, next) {
  res.render('agent');
});

router.get('/contactus', function(req, res, next) {
  res.render('contact');
});

module.exports = router;
