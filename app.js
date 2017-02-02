'use strict';

var express = require('express'),
   path = require('path'),
   favicon = require('serve-favicon'),
   parser = require('body-parser');
var logger = require("morgan");
var compression = require('compression')
// Import the required dependencies

var cors = require('cors');


// var leadership = require('./routes/api/leadership');
var people = require('./routes/api/people');
var blog = require('./routes/api/blog');
var recent = require('./routes/api/home');
var library = require('./routes/api/library');
var strike = require('./routes/api/strike');
var results = require('./routes/strike-result');
var names = require('./routes/name-result');
var app = express();
var oneDay = 86400000;


require('./database');
// require('./strike-seed');
// New call to compress content
// compress all requests 
app.use(compression())
app.use(cors());
app.use(logger("dev"));
// app.use(express.static(path.join(__dirname, 'dist', { maxAge: oneDay })));

app.use(parser.json());


// ==============================================================
// Development Section
// ==============================================================
/* GET home page. */

// app.get('/', function(req, res) {
//   res.sendFile('index.html', { root: __dirname });
// });
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'dist/', 'index.html'));
// });
app.use('/api/people', people);
app.use('/api/posts', blog);
app.use('/api/publications', library);
app.use('/landing', recent);
app.use('/strikes', strike);
app.use('/search', results);
app.use('/names', names);
// =======================================================
// app.use(function(req, res, next) {
//   res.sendFile('index.html', { root: __dirname });
// })
// app.use(function(req, res, next) {
//   res.sendFile(path.join(__dirname, 'dist/', 'index.html'));
// })
// Catch 404
app.use(function(req, res, next){
	var err = new Error("Not Found");
	err.status = 404;
	next(err);
});


// Error Handler
app.use(function(err, req, res, next){

	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
	console.log("Express server is listening on port", port);
});


