var express = require('express');
var router = express.Router();
var pool = require('../pool.js');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

function generateFilterQuery(params) {
  if (Object.keys(params).length === 0) {
    return `select  * from scholarship`;
  }
  let keys = Object.keys(params);
  let values = Object.values(params);
  let query = `select * from scholarship where `;
  for (let index = 0; index < values.length; index++) {
    query += ` ${keys[index].split('__')[0]} = '${values[index]}' and `;
  }
  query = query.substr(0, query.lastIndexOf('and'));
  return query;
}

router.post('/search_scholarships', function(req, res) {
  let query = `select distinct degree from scholarship ; select distinct language from scholarship ; select distinct intake from scholarship ; select distinct program_id from scholarship `;
  let filter = generateFilterQuery(req.body);
  pool.query(`${filter} ; ${query}`, function(err, result) {
    if (err) throw err;
    res.render('users/scholarship', {
      scholarships: result[0],
      degrees: result[1],
      languages: result[2],
      intakes: result[3],
      programs: result[4],
      loggedIn: req.session.user === undefined ? false : true,
      user: req.session.user === undefined ? {} : req.session.user,
      message: req.flash('message') === undefined ? '' : req.flash('message')
    });
  });
});

router.get('/scholarships', function(req, res) {
  let query = `select * from scholarship ; select distinct degree from scholarship ; select distinct language from scholarship ; select distinct intake from scholarship ; select distinct program_id from scholarship `;
  pool.query(query, function(err, result) {
    if (err) {
      throw err;
    } else {
      res.render('users/scholarship', {
        scholarships: result[0],
        degrees: result[1],
        languages: result[2],
        intakes: result[3],
        programs: result[4],
        loggedIn: req.session.user === undefined ? false : true,
        user: req.session.user === undefined ? {} : req.session.user,
        message: req.flash('message') === undefined ? '' : req.flash('message')
      });
    }
  });
});

router.get('/login', function(req, res) {
  res.render('users/login', { message: '' });
});

router.post('/login', function(req, res) {
  const { email_mobile } = req.body;
  let query = `select * from user where email = '${email_mobile}' or mobile = '${email_mobile}'`;
  pool.query(query, function(err, result) {
    if (err) throw err;
    if (result.length === 0) {
      res.render('users/login', { message: 'Invalid Email/Mobile' });
    } else if (bcrypt.compareSync(req.body.password, result[0].password)) {
      req.session.user = result[0];
      res.redirect('/users/home');
      res.end();
    } else {
      res.render('users/login', { message: 'Invalid Password' });
    }
  });
});

router.get('/all', function(req, res) {
  if (req.session.admin === undefined) {
    req.redirect('/admin/login');
  } else {
    let query = 'select * from user';
    pool.query(query, function(err, result) {
      if (err) throw err;
      res.render('users/all', { users: result, admin: req.session.admin });
    });
  }
});

router.get('/signup', function(req, res) {
  res.render('users/signup', { message: '' });
});

router.post('/create', function(req, res) {
  let hashedPassword = bcrypt.hashSync(req.body.password, salt);
  let data = { ...req.body, password: hashedPassword };
  let query = `insert into user set ? `;
  pool.query(query, data, function(err, result) {
    if (err) throw err;
    req.session.user = { ...req.body, _id: result.insertId };
    res.redirect('/users/home');
    res.end();
  });
});

router.all('/*', function(req, res, next) {
  if (req.session.user === undefined) {
    res.redirect('/users/login');
  } else {
    next();
  }
});

router.get('/home', function(req, res) {
  res.render('users/home', { user: req.session.user, loggedIn: true });
});

router.get('/logout', function(req, res) {
  req.session.user = undefined;
  res.redirect('/users/login');
});

module.exports = router;
