var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');


var app = express();
var appSSL = express();

app.use(express.static(__dirname + '/dist'));
appSSL.use(express.static(__dirname + '/dist'));

app.set('port', process.env.PORT || 3000);
appSSL.set('port', process.env.PORT || 8000);

var options = {

	key: fs.readFileSync('https/hacksparrow-key.pem'),
	cert: fs.readFileSync('https/hacksparrow-cert.pem')
};

var server = http.createServer(app);
var serverSSL = https.createServer(options, appSSL);


serverSSL.listen(appSSL.get('port'), function () {
	console.log('HTTPS Server start on:' + appSSL.get('port'));
});

server.listen(app.get('port'), function () {
	console.log('Server start on:' + app.get('port'));
});