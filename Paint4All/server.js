const host = '127.0.0.1';
const port = 8080;

//Configure the server
const express = require('express'); //express: routing
const app = express();

//Access static files
app.use('/assets', express.static('assets'));
app.use('/views', express.static('views'));

//App running on localhost:8080 || 127.0.0.1:8080
app.listen(port, function(err){
  if (!err) {
    console.log("Your app is listening on " + host + " and port " + port + ".");
  } else {
    console.log(err);
  }
});

//Export modules & incorporate loader.js file
module.exports = app;
require('./loader.js');





/*
//Connect to database 
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'Ta1iRWkzWF',
  password: '4i5FaGImZv',
  database: 'Ta1iRWkzWF'
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
}); */

app.set('view engine', 'pug') //pug: template engine

//Default route
app.get('/', (req, res) => {
    res.render('index')
})

app.use('/manager', function(req, res, next) {
  // invoked for any request starting with /users
  next();
});

//Show manager route
app.get('/manager/show', function(req, res, next) {
  res.render('show')
});

//Create manager route
app.get('/manager/create', function(req, res, next) {
  res.render('new')
});

//Update manager route
app.get('/manager/update', function(req, res, next) {
  res.render('update')
});

//Delete manager route
app.get('/manager/delete', function(req, res, next) {
  res.render('delete')
});

//Handled the post request
const bodyParser = require('body-parser') //body-parser: request parsing
app.use(bodyParser.urlencoded({extended: true}))

//Manager insert data (POST route creation)
app.post('/managerSubmit', (req, res) => {
  connection.connect(function(err) {
    var sql = "INSERT INTO manager (mobile_number, nif, nib, id_user_profile) VALUES ('" 
              + req.body.mobile_number + "', '" 
              + req.body.nif + "', '" + req.body.nib + "', 1);";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });

  res.redirect('/')
});

//Get data from database
app.get('/managerSelect', (req, res) => {
  connection.connect(function(err) {
    connection.query("SELECT * FROM manager;", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
  });

  res.redirect('/')
});

//Update data from database
app.put('/managerUpdate', (req, res) => {
  connection.connect(function(err) {
    var sql = "UPDATE manager SET mobile_number = '" + req.body.mobile_number_new + "' WHERE mobile_number = '" 
              + req.body.mobile_number_old + "';";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  });

  res.redirect('/')
});

//Delete data from data base
app.delete('/managerDelete', (req, res) => {
  connection.connect(function(err) {
    var sql = "DELETE FROM manager WHERE nif = '" + req.body.nif + "';";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  });

  res.redirect('/')
});

