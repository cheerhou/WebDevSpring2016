var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, userModel) {

    app.post("/api/project/user", createUser);
    app.get("/api/project/user", findUser);
    app.get('/api/project/user/:id', findUserById);
    app.post("/api/project/user/login", findUserByCredentials);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);



    function createUser(req, res) {
        var user = req.body;
        var users = userModel.createUser(user)
        res.json(users);

    }

    function findUser(req, res) {
        var username = req.param("username");
        if(username) {
            var user = userModel.findUserByUsername(username);
            res.json(user);
        }else {
            var users = userModel.findAllUser();
            res.json(users);
        }

    }

    function findUserById(req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        console.log("username " + username);
        var user = userModel.findUserByUsername(username);
        res.json(user);
    }

    function findUserByCredentials(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials)
        res.json(user);
    }

    function updateUser(req, res) {
        var userId = req.params.id;
        var user = req.body;
        console.log("receive from client: userId-" + userId +" user-" + user.username);
        var users = userModel.updateUser(userId, user);
        res.json(users);
    }

    function deleteUser(req, res) {
        var userId = req.param.id;
        var users = userModel.deleteUser(userId);
        res.json(users);
    }
}