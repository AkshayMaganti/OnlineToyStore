let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser   = require('body-parser');
let logger = require('morgan');
let MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let userRegisterRouter = require('./routes/register');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', userRegisterRouter);
// have to move it to register.js
app.use(bodyParser.json())
app.post('/register', function(req,res){
  console.log(req.body);
  let fname = req.body.fname;
  let lname = req.body.lname;
  let username = req.body.username;
  let email = req.body.email;
  let pwd = req.body.pwd;
  let hash = bcrypt.hashSync(pwd, 10);
  //connecting to mongo db
  MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true },function (err, db) {
    if (err) next(err);
    let dbo = db.db('test')
    let obj = {
      first_name : fname,
      last_name : lname,
      username : username,
      email : email,
      password : hash
    } 
    dbo.collection('users').insertOne(obj, function(err,res) {
      if (err) throw err;
      db.close();
    })
  })
})

// login check
app.post('/login', function(req,res){
  let username1 = req.body.username1;
  let password1 = req.body.password1;
  console.log(req.body)
  MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true },function (err, db) {
    if (err) console.log("no username found")
    let dbo = db.db('test')
    let obj = {
      username : username1,
    };
    let result = {
      value : true,
      username : ''
    } 
    dbo.collection('users').findOne(obj, function(err,res1) {
      if (err) next(err);
      //check if username exists by checking if we get any response
      if (res1 !== null){
        if(bcrypt.compareSync(password1, res1.password)) {
          // Passwords match
          result = {
            value : true,
            username : res1.username
          }
          

        } else {
          // Passwords don't match
          console.log(password1)
          console.log(res1.password)
          console.log("password doesn't match")
          result = {
            value : false,
            username : res1.username
          }
        }
        db.close();
        res.json(result);
      }
      else{
        console.log("username doesnot exist")
      }
      
    });
    
  });
})
//products retrieval
app.get('/products', function(req, res, next) {
  
  MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true },function (err, db) {
    if (err) throw err
  
    var dbo = db.db('test')
    
    dbo.collection('products').find().toArray(function (err, result) {
      if (err) throw err
  
      res.json(result);
    })
  })
  });

//cart updation
app.post('/items', function(req,res,next) {
  let username1 = req.body.username;
  //if (username1 == null)
  //username1 = 'Akshay';
  console.log(req.body);
  MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true },function (err, db) {
    if (err) throw err
    var dbo = db.db('test');
    let obj = {
      username : username1,
    };
    
    dbo.collection('cart').findOne(obj, function(err,result) {
      if (err) next(err);
      result1 = result.items;
      //console.log(json(result1));
      res.json(result1);
    })
  })
});
//add to cart
app.post('/addToCart', function(req,res,next) {
  let username1 = req.body.username;
  //let id = req.body.id;
  console.log(req.body);
  MongoClient.connect('mongodb://localhost:27017/', { useNewUrlParser: true },function (err, db) {
    if (err) throw err
    var dbo = db.db('test');
    let obj = {
      username : username1,
    };
    
    dbo.collection('cart').findOne(obj, function(err,result) {
      if (err) next(err);
      result1 = result.items;
      //console.log(json(result1));
      res.json(result1);
    })
  })
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
