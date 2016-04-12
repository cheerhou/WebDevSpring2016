var express = require('express');
var app = express();

var mongoose = require('mongoose');

// load passport module
var passport = require('passport');

// load cookie parsers
var cookieParser = require("cookie-parser");

// load session support
var session = require("express-session");

var connectionString = "mongodb://127.0.0.1:27017/cs5610";
//Openshift mongoDB
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

//configure local or openShift ip address and port
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var db = mongoose.connect(connectionString);

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure cookie parser - needed for oauth
app.use(cookieParser());

// configure session support
app.use(session({ secret: 'meanstackisthebest' }));

// initialize passport and session support
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));


//For assignment
require("./public/assignment/server/app.js")(app, db, mongoose);

//For project
require("./public/project/server/app.js")(app, db);

app.listen(port, ipaddress);
