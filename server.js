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
  res.render('pages/edit')
  

});

/*
app.post('/doedit', function(req, res) {
  //check we are logged in
  //we create the data string from the form components that have been passed in
var query ={"login.username":req.body.username}
var newvalues = {$set:{
"gender":req.body.newgender,
"name":{"title":req.body.newtitle,"first":req.body.newfirst,"last":req.body.newlast},
"location":{"street":req.body.newstreet,"city":req.body.newcity,"state":req.body.newstate,"postcode":req.body.newpostcode},
"email":req.body.newemail,
"login":{"username":req.body.newusername,"password":req.body.newpassword},
"dob":req.body.newdob,"registered":Date(),
"picture":{"large":req.body.newlarge,"medium":req.body.newmedium,"thumbnail":req.body.newthumbnail},
"nat":req.body.newnat}};


//once created we just run the data string against the database and all our new data will be saved/
  db.collection('people').updateOne(query, newvalues, function(err, result) {
    if (err) throw err;
    console.log('updated to database');
    //when complete redirect to the index
    res.redirect('/');
  });
});*/
