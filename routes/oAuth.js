/**
 * Created by knagaraj on 4/30/2015.
 */

var express = require('express');
var router = express.Router();
var username = '1ed80977-1650-4403-8679-080e8b840dfa';
var password = 'e4156c68-1d24-4d54-a604-6e872f63eb94';

router.post('/', function(req, res, next) {
    login();
});

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

module.exports = router;