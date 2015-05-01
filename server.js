// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var groups = require('./routes/groups');
var actions = require('./routes/actions');

//OAuth
var oAuth=require('./routes/oAuth');
var association=require('./routes/association');
var memberships = require('./routes/memberships');

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    //app.use(favicon(__dirname + '/public/favicon.ico'));
            app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/javascripts')));
//app.register('.html', require('jade'));
app.use('/', routes);
app.use('/menu', users);
app.use('/oAuth',oAuth);
app.use('/groups', groups);
app.use('/actions', actions);
app.use('/association',association);
app.use('/memberships', memberships);
////////////////////////////////////////////////////////////////////////////////////

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.VCAP_APP_PORT || 3000;      // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// START THE SERVER
// =============================================================================
app.listen(port);
