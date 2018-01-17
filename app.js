let express = require('express');
let fs = require('fs');
let bluebird = require('bluebird');
let nconf = require('nconf').argv().env();
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');

let index = require('./routes/index');
let users = require('./routes/users');

let app = express();

// Do configuration
nconf.file({
	file: './environment/environment.json'
});

//Add CORS support for angular applications
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

//Add Bluebird promise to mongoose
mongoose.Promise = bluebird;


//const dbUrl = nconf.get('database:mongodb:');
mongoose.connect('mongodb://127.0.0.1:27017/openmdb', { useMongoClient: true})
.then(()=> { console.log(`Succesfully Connected to the Mongodb Database  at URL : mongodb://127.0.0.1:27017/openmdb`)})
.catch(()=> { console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/openmdb`)});
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
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


// Get the API route ...

var api = require('./routes/api.route')


// Other stuffs ...



//Use the Routes
app.use('/', index);
app.use('/users', users);

//Use the API routes for all routes matching /api

app.use('/api', api);

module.exports = app;
