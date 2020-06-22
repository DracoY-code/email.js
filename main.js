/* 	
	EMAIL HANDLER
	
	Run this on your Node.js
	Do remember to input your email data in email.json
*/


// Requirements
const http = require('http');
const mailer = require('nodemailer');
const fs = require('fs');

// Read json data
let jsonFile = 'email.json';
let str = fs.readFileSync(jsonFile, 'utf8');

// Generate object from JSON
const emailObj = JSON.parse(str);

// Set the email credentials
// Make sure username and password are correct
const userMail = mailer.createTransport(emailObj['credentials']);

// Get mail data from json file
const mailOptions = emailObj['mail'];

// Server is created; just for fun
http.createServer(function (req, res) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write('Hello world!');
	// Say hello too
	
	// Mail sender function
	userMail.sendMail(mailOptions, function (err, info) {
		if (err)
			console.log(err);
		else
			console.log('Email sent: ' + info.response);
	});
	
	res.end();
	
// Run http://localhost:8080
}).listen(8080);
