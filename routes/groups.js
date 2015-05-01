var express = require('express');
var router = express.Router();
var host = 'api.us1.covisint.com';
var https = require('https');

router.get('/arduino', function(req, res, next) {
    res.removeHeader('X-Powered-By');
    res.removeHeader('Connection');
    res.removeHeader('Content-Length');
    res.removeHeader('Content-Type');
    res.removeHeader('Date');
    res.removeHeader('ETag');

    headers = {
        'Authorization' : req.get('Authorization'),
        'Accept' : 'application/vnd.com.covisint.platform.group.v1+json;includeEntitlements'
    };

    var options = {
        host: host,
        path: '/group/v1/groups?name=' + req.query.name,
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
          console.log(responseObject);
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
});

module.exports = router;