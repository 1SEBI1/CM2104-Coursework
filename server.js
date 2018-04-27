const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/cookie_jar_users";
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

app.use(session({ secret: 'example' }));
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
    if(!req.session.loggedin){res.redirect('/login');return;}
    res.render('pages/home');
});

app.get('/saved', function(req, res) {
  if(!req.session.loggedin){res.redirect('/login');return;}
  res.render('pages/saved');
});
app.get('/account', function(req, res) {
  if(!req.session.loggedin){res.redirect('/login');return;}
  res.render('pages/account');
});
app.get('/login', function(req, res) {
  if(req.session.loggedin){res.redirect('/');return;}
  res.render('pages/login');
});
app.get('/newaccount', function(req, res) {
  res.render('pages/newaccount');
});

app.post('/dologin', function(req, res) {
  console.log(JSON.stringify(req.body))
  var uname = req.body.username;
  var pword = req.body.password;


  db.collection('users').findOne({"login.username":uname}, function(err, result) {
    if (err) throw err;//if there is an error, throw the error
    //if there is no result, redirect the user back to the login system as that username must not exist
    if(!result){
      res.redirect('/login');return}
    //if there is a result then check the password, if the password is correct set session loggedin to true and send the user to the index
    if(result.login.password == pword){
      req.session.loggedin = true;
      req.session.username = uname;
      res.redirect('/')}
    //otherwise send them back to login
    else{
      res.redirect('/login')}
  });
});

app.get('/logout', function(req, res) {
  req.session.loggedin = false;
  req.session.destroy();
  res.redirect('/');
});


app.post('/createaccount', function(req, res) {
var newuserdata = {
"name":{"first":req.body.first,"last":req.body.last},
"login":{"username":req.body.username,"password":req.body.password},
"email":req.body.email,
"dob":req.body.dob,"registered":Date()}


//once created we just run the data string against the database and all our new data will be saved/
  db.collection('users').save(newuserdata, function(err, result) {
    if (err) throw err;
    console.log('saved to database')
    //when complete redirect to the index
    res.redirect('/')
  })
});

app.get('/edit', function(req,res) {
  if(!req.session.loggedin){res.redirect('/login');return;}

  db.collection('users').findOne({"login.username":req.session.username}, function(err, result) {
    if (err) throw err;//if there is an error, throw the error
    //if(!result){res.redirect('/login');return}

    res.render('pages/edit',{
      user: result
    })
  });
});





app.post('/doedit', function(req, res) {
  //check we are logged in
  //we create the data string from the form components that have been passed in
var newvalues = {$set:{
"name":{"first":req.body.newfirst,"last":req.body.newlast},
"email":req.body.newemail,
"login":{"username":req.body.newusername},
"dob":req.body.newdob}};
  console.log("first :" +req.body.newfirst);

//once created we just run the data string against the database and all our new data will be saved/
  db.collection('users').updateOne({"login.username":req.session.username}, newvalues, function(err, result) {
    if (err) throw err;
    console.log('updated to database');
    //when complete redirect to the index
    res.redirect('/');
  });
});

app.get('/delete', function(req, res) {
  //check we are logged in.
  if(!req.session.loggedin){res.redirect('/login');return;}

  db.collection('users').deleteOne({"login.username":req.session.username}, function(err, result) {
    if (err) throw err;
    //when complete redirect to the index
    res.redirect('/logout');
  });
});

