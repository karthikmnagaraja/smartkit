/**
 * Created by knagaraj on 4/30/2015.
 */

var express = require('express');
var router = express.Router();
var username = '1ed80977-1650-4403-8679-080e8b840dfa';
var password = 'e4156c68-1d24-4d54-a604-6e872f63eb94';

/*router.post('/', function(req, res, next) {
 login(req,res);
 });
 */
router.post('/arduino', function(req, res, next) {
    res.removeHeader('X-Powered-By');
    res.removeHeader('Connection');
    res.removeHeader('Content-Length');
    res.removeHeader('Content-Type');
    res.removeHeader('Date');
    res.removeHeader('ETag');
    arduinoLogin(req,res);
});
var method = 'POST';
var host = 'api.us1.covisint.com';
var https = require('https');
var accept = '';
var type = '';
var client_id = '25f3e17c-8a9e-4144-a6b8-72b135d23217';
var client_secret = '4105de01-b448-4cf3-bdee-bc266e258f30';
var grant_type = 'password';

function performRequestArduino(req,res,endpoint, method, data, success) {
    var dataString = JSON.stringify(data);
    var headers = {};

    headers = {
        'Authorization' : req.get('Authorization'),
        'Accept' : req.get('Accept'),
        'Type' : req.get('Type'),
        'application-id' : req.get('applicationid')
    };

    var options = {
        host: host,
        path: endpoint,
        method: method,
        headers: headers,
        requestCert: true,
        rejectUnauthorized: false
    };

    var exreq = https.request(options, function(exres) {
        exres.setEncoding('utf-8');

        var responseString = '';

        exres.on('data', function(data) {
            responseString += data;
        });

        exres.on('end', function() {
            var responseObject = JSON.parse(responseString);
            //console.log(responseObject);
            res.header(
                'AT',responseObject.access_token
            );
            res.status(200);
            res.end();
        });
    }).on('error', function(e) {
        console.log("Got error: ");
        console.log(e);
        res.status(500).json(e);
    });

    exreq.write(dataString);
    exreq.end();
}

function arduinoLogin(req,res) {
    performRequestArduino(req,res,'/oauth/v1/token', 'POST', {
        username: username,
        password: password
    }, function(data){
    });
}

function login(req,res) {
    console.log('inside login');
}

module.exports = router;
