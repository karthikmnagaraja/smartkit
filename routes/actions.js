var mysql      = require('mysql');
var express = require('express');
var router = express.Router();
var host = 'api.us1.covisint.com';

var connection = mysql.createConnection({
  host     : '10.96.160.202',
  // host: 'localhost',
  // port: '13306',
  user     : 'puNMbiYPZdMTyH5J',
  password : 'GYUWpW9p7wGnWdsc',
  database : 'cf_7d851986_532a_479a_93d3_e5ed66102f4c'
});

router.get('/arduino', function(req, res, next) {
    res.removeHeader('X-Powered-By');
    res.removeHeader('Connection');
    res.removeHeader('Content-Length');
    res.removeHeader('Content-Type');
    res.removeHeader('Date');
    res.removeHeader('ETag');

		connection.query('select * from actions where deviceId = \''+req.query.deviceId+'\' AND ack = 0 limit 1;', function(err, rows, fields) {
		  if (err){
		  	console.log("Got error: ");
        console.log(err);
        res.status(500).json(err);

		  } else {

		  	if(rows.length > 0){
			  	console.log('The solution is: ', rows[0]);
			  	res.header('pin',rows[0].pin);
			  	res.header('val',rows[0].val);
			  	connection.query("update actions set ack=1 where id = "+rows[0].id+";")
				}
			  res.status(200);
			  res.end();
			}
		});

});

router.post('/', function(req, res, next) {

		connection.query('insert into actions(deviceId,pin,val,ack) values(\''+req.body.deviceId+'\','+req.body.pin+','+req.body.val+',0)',
		 function(err, result) {
		  if (err){
		  	console.log("Got error: ");
        console.log(err);
        res.status(500).json(err);

		  } else {
			  res.status(201);
			  res.end();
			}
		});

});


module.exports = router;