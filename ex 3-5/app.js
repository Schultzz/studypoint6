var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var db = require('./model/db');
var auth = require('./model/userFacade');

var routes = require('./routes/index');
var users = require('./routes/users');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(session({secret:'secret_3162735',saveUninitialized:true, resave: true}));

/*
app.use(function(req, res, next){
    var userName = req.session.userName;
    if(typeof(userName) === 'undefined') {
        userName = req.body.userName;
        if (typeof(userName) !== 'undefined') {
            req.session.userName = userName;
            return res.redirect('/');
        } else {
            req.url = "/login";
            return next();
        }
    }
    next();
});
*/


app.use(function(req,res,next){

    var username = req.body.username;
    var password = req.body.password;

    if(typeof(req.session.username) === 'undefined') {

        auth.validate(req.body.username, (function(data) {

            if(data == null){
                req.method = 'get';
                req.url = "/login";
                return next();
            }
            else if (req.body.password == data.password) {
                console.log("Password correct!")
                req.session.username = username;
                res.redirect('/');
            } else {
                req.method = 'get';
                req.url = "/login";
                return next();
            }

        }));

    }else{
        return next();
    }
});


if (app.get('env') === 'development') {
    app.locals.pretty = true;
}

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

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
    error: {}
  });
});

//app.set('port', process.env.PORT || 3000);
//var server = app.listen(app.get('port'), function() {
//    console.log('Express server listening on port ' + server.address().port);
//});

module.exports = app;
