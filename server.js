// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
//OAuth
var method = 'POST';
var host = 'api.us1.covisint.com';
var https = require('https');
var authorization = 'Basic MWVkODA5NzctMTY1MC00NDAzLTg2NzktMDgwZThiODQwZGZhOmU0MTU2YzY4LTFkMjQtNGQ1NC1hNjA0LTZlODcyZjYzZWI5NA==';
var accept = '';
var type = '';
var applicationid = '';
function OAuth(){
accept = 'application/vnd.com.covisint.platform.oauth.token.v1+json';
type = 'client_credentials';
applicationid = 'mk7SgGMf4alufI9zOoeZ7jpZrfb5dOjU';
}

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

    app.use('/', routes);
app.use('/users', users);
var username = '1ed80977-1650-4403-8679-080e8b840dfa';
var password = 'e4156c68-1d24-4d54-a604-6e872f63eb94';




function performRequest(endpoint, method, data, success) {
var dataString = JSON.stringify(data);
var headers = {};

if (method == 'GET') {
    endpoint += '?' + querystring.stringify(data);
  }
  else {
    headers = {
      'Authorization' : authorization,
      'Accept' : accept,
      'Type' : type,
      'application-id' : applicationid
    };
  }
  var options = {
    host: host,
    path: endpoint,
    method: method,
    headers: headers
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf-8');

    var responseString = '';

    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      //console.log(responseString);
      var responseObject = JSON.parse(responseString);
      success(responseObject);
    });
  });

  req.write(dataString);
  req.end();
}

function login() {
OAuth();
  performRequest('/oauth/v1/token', 'POST', {
    username: username,
    password: password
  }, function(data) {
    //sessionId = data.result.id;
    console.log('Logged in:', data.creator);
//    getCards();
  });
}


////////////////////////////////////////////////////////////////////////////////////

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

login();

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
