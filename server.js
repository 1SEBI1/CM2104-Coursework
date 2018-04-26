const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/star_wars_quotes";
const express = require('express');
const bodyParser = require('body-parser')
const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
// set the view engine to ejs
app.set('view engine', 'ejs');

var db;

MongoClient.connect(url, function(err, database) {
  if (err) throw err;
  db = database;
  app.listen(8080);
  console.log('listening');
});



app.get('/', function(req, res) {
  res.render('pages/home');
});
app.get('/saved', function(req, res) {
  res.render('pages/saved');
});
app.get('/account', function(req, res) {
  res.render('pages/account');
});
app.get('/login', function(req, res) {
  res.render('pages/account');
});
app.get('/newaccount', function(req, res) {
  res.render('pages/newaccount');
});
