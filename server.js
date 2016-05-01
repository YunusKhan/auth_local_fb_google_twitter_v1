// server.js

var csrf = require('csurf');
var express  = require('express');
var session = require('client-sessions');
var app      = express();
var path    = require("path");
var port     = process.env.PORT || 3015;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
app.use(express.bodyParser());
app.use(express.static(__dirname + '/views'));
app.use('/static', express.static('public'));
app.use("/bower_components", express.static(__dirname + '/bower_components'));
app.use("/css", express.static(__dirname + '/css'));
var configDB = require('./config/database.js');

// to set the engine as html you need to below 2 commands to ensure html files render seamlessly
// very important --- do not forget --- 
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {

	// set up our express application
	app.use(express.logger('dev')); // log every request to the console
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms


	// required for passport
	app.use(express.session({ secret: 'test' , cookie: { secure: false }})); // session secret
	app.use(passport.initialize());
	app.use(passport.session()); // persistent login sessions
	app.use(flash()); // use connect-flash for flash messages stored in session

});

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('Accepting requests at port # ' + port);
