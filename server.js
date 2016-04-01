var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var multer = require("multer");
var request = require("request");
var mongoose = require("mongoose");

var connectionString = "mongodb://127.0.0.1:27017/cs5610";

//Openshift mongoDB
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get('/hello', function(req, res){
    res.send('hello world, from chenjin');
});

//For assignment
require("./public/assignment/server/app.js")(app, db, mongoose);

//For project
require("./public/project/server/app.js")(app, db, request);

app.listen(port, ipaddress);


