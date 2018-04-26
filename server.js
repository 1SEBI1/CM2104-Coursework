const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/cookie_jar_users";
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
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
  res.render('pages/login');
});
app.get('/newaccount', function(req, res) {
  res.render('pages/newaccount');
});

app.post('/dologin', function(req, res) {
  console.log(JSON.stringify(req.body))
  var uname = req.body.username;
  var pword = req.body.password;

  db.collection('users').find().toArray(function(err, result) {
    if(!result){
      console.log("res : "+ result);
      //res.redirect('/login')}

    if (err) throw err;
    //the result of the query is sent to the users page as the "users" array
    console.log("results : " + JSON.stringify(result));
    //res.redirect('/')

    }

  });
/*
  db.collection('users').findOne({"login.username":uname}, function(err, result) {
    if (err) throw err;//if there is an error, throw the error
    //if there is no result, redirect the user back to the login system as that username must not exist
    console.log("database working");
    if(!result){
      console.log("not match");
      res.redirect('/login');return}
    console.log("user found");
    //if there is a result then check the password, if the password is correct set session loggedin to true and send the user to the index
    if(result.login.password == pword){
      req.session.loggedin = true;
      req.session.username = uname;
      res.redirect('/')
      console.log("successfully logged in");}
    //otherwise send them back to login
    else{
      console.log("wrong password fucko");
      res.redirect('/login')}
  });*/
});


app.get('/newaccount', function(req, res) {
  if(!req.session.loggedin){res.redirect('/login');return;}
  res.render('pages/adduser')
});

app.post('/createaccount', function(req, res) {
  //check we are logged in
  //if(!req.session.loggedin){res.redirect('/login');return;}

  //we create the data string from the form components that have been passed in

var newuserdata = {
"name":{"first":req.body.first,"last":req.body.last},
"login":{"username":req.body.username,"password":req.body.password},
"email":req.body.email,
"dob":req.body.dob,"registered":Date()}


//once created we just run the data string against the database and all our new data will be saved/
  db.collection('user').save(newuserdata, function(err, result) {
    if (err) throw err;
    console.log('saved to database')
    //when complete redirect to the index
    res.redirect('/')
  })
});
