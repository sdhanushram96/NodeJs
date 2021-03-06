//global.db = 'mongodb://localhost/jewellery';
global.db = 'mongodb://user1:mypass@ds017432.mlab.com:17432/jewellery';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var stock = require('./routes/stock');
var sales = require('./routes/sales');
var localizes = require('./routes/localizes');
var categories = require('./routes/categories');
var bills = require('./routes/bills');
var bill_ids = require('./routes/bill_ids');
var backup = require('./routes/backup');
var restore = require('./routes/restore');
var mongoose = require('mongoose');

mongoose.connect(global.db, function(err) {
  if (err) {
    console.log('connection error', err);
  } else {
    console.log('connection successful');
  }
});

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/api/stock', stock);
app.use('/api/sales', sales);
app.use('/api/categories', categories);
app.use('/api/localize', localizes);
app.use('/api/bills', bills);
app.use('/api/bill_ids', bill_ids);
app.use('/api/backup', backup);
app.use('/api/restore', restore);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

module.exports = app;