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
    res.removeHeader('X-Powered-By');
    res.removeHeader('Connection');
    res.removeHeader('Content-Length');
    res.removeHeader('Content-Type');
    res.removeHeader('Date');
    res.removeHeader('ETag');

    headers = {
        'Authorization' : 'Bearer '+accessToken,
        'Accept' : 'application/vnd.com.covisint.platform.group.membership.v1+json;includeGroupAndEntitlements;includeGroup'
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
            console.log("response for memberships"+responseObject);
            res.header(
                'id',responseObject[0].id
            );
            res.status(200);
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
            var accessToken =  responseObject.access_token;
            getMemberships(req,res,'/group/v1/groups?group.owner.id=FJQ4Y6K0' + '&member.id='+req.query.userId, 'GET', accessToken);

            res.status(200);
            res.end();
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