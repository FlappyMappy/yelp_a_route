var express = require('express');
var https = require('https');
var fs = require('fs');


var app = express();

app.use(express.static(__dirname + '/dist'));


app.set('port', process.env.PORT || 8000);


var options = {

	key: fs.readFileSync('https/hacksparrow-key.pem'),
	cert: fs.readFileSync('https/hacksparrow-cert.pem')
};

var server = https.createServer(options, appSSL);



server.listen(app.get('port'), function () {
	console.log('HTTPS Server start on:' + app.get('port'));
});