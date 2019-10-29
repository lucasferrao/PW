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
});

//Configure the server
const express = require('express') //express: routing
const app = express()

app.set('view engine', 'pug') //pug: template engine

//Default route
app.get('/', (req, res) => {
    res.render('index')
})

//3000 localhost port
app.listen(3000)

//Handled the post request
const bodyParser = require('body-parser') //body-parser: request parsing
app.use(bodyParser.urlencoded({extended: true}))

//POST route creation
app.post('/submit', (req, res) => {
  console.log('Name: '+ req.body.manager_name)
  console.log('Email: '+ req.body.email)
  console.log('Mobile Number: '+ req.body.mobile_number)
  console.log('NIF: '+ req.body.nif)
  console.log('NIB: '+ req.body.nib)

  //Insert data into database
  connection.connect(function(err) {
    var sql = "INSERT INTO manager_candidature (manager_name, email, mobile_number, nif, nib) VALUES ('" 
              + req.body.manager_name + "', '" + req.body.email + "', '" + req.body.mobile_number + "', '" + req.body.nif + "', '" + req.body.nib + "');"
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });

  res.redirect('/')
})

