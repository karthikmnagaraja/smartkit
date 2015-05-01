/**
 * Created by knagaraj on 5/1/2015.
 */
var express = require('express');
var router = express.Router();
var host = 'api.us1.covisint.com';
var https = require('https');

router.get('/', function(req, res, next) {
    console.log("memberships api reached router!!!");
    getUser(req,res);
});
    function getMemberships(req,res,endpoint, method,accessToken){


    headers = {
        'Authorization' : 'Bearer '+accessToken,
       'Accept' : 'application/vnd.com.covisint.platform.group.membership.v1+json;includeGroupAndEntitlements;includeGroup',
        'Content-Type' :'application/vnd.com.covisint.platform.group.membership.v1+json;charset=UTF-8'
    };

    var options = {
        host: host,
        path: endpoint,
        method: 'GET',
        headers: headers,
        requestCert: true,
        rejectUnauthorized: false
    };

    var exreq = https.request(options, function(exres) {

        var responseString = '';

        exres.on('data', function(data) {
            responseString += data;
        });

        exres.on('end', function() {
            var responseObject = JSON.parse(responseString);
            console.log("response for memberships\n"+responseString);
            res.status(200);
            res.send(responseObject);

            res.end();
        })

    }).on('error', function(e) {
        console.log("Got error: ");
        console.log(e);
        res.status(500).json(e);
    });
    exreq.end();
}

function getOAuthToken(req,res,endpoint, method) {
    //var dataString = JSON.stringify(data);
    var headers = {};

    headers = {
        'Authorization' : 'Basic MjVmM2UxN2MtOGE5ZS00MTQ0LWE2YjgtNzJiMTM1ZDIzMjE3OjQxMDVkZTAxLWI0NDgtNGNmMy1iZGVlLWJjMjY2ZTI1OGYzMA==',
        'Accept' : 'application/vnd.com.covisint.platform.oauth.token.v1+json',
        'Type' : 'client_credentials',
        'application-id' : 'tUEb8QHWXDxfljWw0oY3ZIya3ltZwpid'
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
            var accessToken =  responseObject.access_token;
            getMemberships(req,res,'/group/v1/memberships?group.owner.id=FJQ4Y6K0' + '&member.id='+req.query.userId, 'GET', accessToken);
//            res.status(200);
  //          res.end();
        });
    }).on('error', function(e) {
        console.log("Got error: ");
        console.log(e);
        res.status(500).json(e);
    });

    //exreq.write();
    exreq.end();
}

function getUser(req,res) {
    getOAuthToken(req,res,'/oauth/v1/token', 'POST');
}


module.exports = router;