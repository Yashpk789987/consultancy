var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cookieSession = require('cookie-session');
var expressSession = require('express-session');
var flash = require('req-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var scholarshipRouter = require('./routes/scholarship');
var cityRouter = require('./routes/city');
var languageRouter = require('./routes/language');
var universityRouter = require('./routes/university');
var applicationRouter = require('./routes/applications');

var degreeRouter = require('./routes/degree');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var session = cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
});

app.use(expressSession({ secret: '123' }));
app.use(flash());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/scholarship', scholarshipRouter);
app.use('/city', cityRouter);
app.use('/language', languageRouter);
app.use('/university', universityRouter);
app.use('/degree', degreeRouter);
app.use('/applications', applicationRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
