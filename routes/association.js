/**
 * Created by knagaraj on 4/30/2015.
 */

var express = require('express');
var router = express.Router();
var username = '1ed80977-1650-4403-8679-080e8b840dfa';
var password = 'e4156c68-1d24-4d54-a604-6e872f63eb94';

router.post('/', function(req, res, next) {
    getUser(req,res);
});

/*router.post('/arduino', function(req, res, next) {
    res.removeHeader('X-Powered-By');
    res.removeHeader('Connection');
    res.removeHeader('Content-Length');
    res.removeHeader('Content-Type');
    res.removeHeader('Date');
    res.removeHeader('ETag');
    arduinoLogin(req,res);
});
*/
var method = 'POST';
var host = 'api.us1.covisint.com';
var https = require('https');
var accept = '';
var type = '';
var client_id = '25f3e17c-8a9e-4144-a6b8-72b135d23217';
var client_secret = '4105de01-b448-4cf3-bdee-bc266e258f30';
var grant_type = 'password';

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
            var accessToken =  responseObject.access_token

	        getUserRequest(req,res,'/person/v1/persons?username='+req.query.userName, 'GET', accessToken);
	    
	   //res.status(200);
	   //res.end();
        });
    }).on('error', function(e) {
        console.log("Got error: ");
        console.log(e);
        res.status(500).json(e);
    });

    //exreq.write();
    exreq.end();
}

/*function arduinoLogin(req,res) {
    performRequestArduino(req,res,'/oauth/v1/token', 'POST', {
        username: username,
        password: password
    }, function(data){
    });
}
*/

function getUserRequest(req,res,endpoint,method,accessToken)
{
  headers = {
        'Authorization' : 'Bearer '+accessToken,
        'Accept' : 'application/vnd.com.covisint.platform.person.v1+json'
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
           if(responseObject.length==1)
	   getGroupRequest(req,res,'/group/v1/groups?name='+req.query.groupName,'GET',accessToken,responseObject[0].id,'person',responseObject[0].realm); 
           //res.status(200);
           //res.end();
        });
    }).on('error', function(e) {
        console.log("Got error: ");
        console.log(e);
        res.status(500).json(e);
    });
    //exreq.write(dataString);
    exreq.end();


}

function getGroupRequest(req,res,endpoint,method,accessToken,userid,usertype,userrealm)
{
  headers = {
        'Authorization' : 'Bearer '+accessToken,
        'Accept' : 'application/vnd.com.covisint.platform.group.v1+json;includeEntitlements'
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
           if(responseObject.length==1)
		associate(req,res,'/group/v1/groups/'+responseObject[0].id+'/memberships','POST',accessToken,userid,usertype,userrealm,responseObject[0]);
           //res.status(200);
           //res.end();
        });
    }).on('error', function(e) {
        console.log("Got error: ");
        console.log(e);
        res.status(500).json(e);
    });
    //exreq.write(dataString);
    exreq.end();

}


function associate(req,res,endpoint,method,accessToken,userid,usertype,userrealm,group)
{
  headers = {
        'Authorization' : 'Bearer '+accessToken,
        'Accept' : 'application/vnd.com.covisint.platform.group.membership.v1+json',
	'Content-Type' : 'application/vnd.com.covisint.platform.group.membership.v1+json'
    };
var options = {
        host: host,
        path: endpoint,
        method: method,
        headers: headers,
        requestCert: true,
        rejectUnauthorized: false
    };
var request = {
		"member" : {
			"id" : userid,
			"type" : usertype,
			"realm" : userrealm
		},
		"group" : group
		};
			
		
    var exreq = https.request(options, function(exres) {
        exres.setEncoding('utf-8');

        var responseString = '';

        exres.on('data', function(data) {
            responseString += data;
        });

        exres.on('end', function() {
            var responseObject = JSON.parse(responseString);
   //        if(responseObject.length==1)
               res.send(responseObject); 
           res.status(200);
           res.end();
        });
    }).on('error', function(e) {
        console.log("Got error: ");
        console.log(e);
        res.status(500).json(e);
    });
    exreq.write(JSON.stringify(request));
        exreq.end();
    
 }
  
function getUser(req,res) {
    getOAuthToken(req,res,'/oauth/v1/token', 'POST');
}

module.exports = router;
