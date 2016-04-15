var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//var FacebookStrategy = require('passport-facebook').Strategy;

var bcrypt = require('bcrypt-nodejs');


module.exports = function (app, userModel) {
    var auth = authenticated;

    app.post("/api/assignment/login", passport.authenticate('form-maker'), login);
    app.get("/api/assignment/loggedin", loggedin);
    app.post("/api/assignment/logout", logout);
    app.post("/api/assignment/register", register);
    app.post("/api/assignment/user", createUser);

    app.get("/api/assignment/user", auth, findAllUsers);
    app.get("/api/assignment/user/:username", auth, findUserByUsername);
    app.put("/api/assignment/user/:id", auth, updateUser);
    app.delete("/api/assignment/user/:id", auth, deleteUser);
    app.get("/api/assignment/profile/:username", auth, findUserProfileByUsername);


    passport.use('form-maker', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function authenticated(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function localStrategy(username, password, done) {
        // lookup developer by username only. cant compare password since it's encrypted
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    // if the user exists, compare passwords with bcrypt.compareSync
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }


    function serializeUser(user, done) {
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    delete user.password;
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        delete user.password;
        res.json(user);
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req, res) {
        var newUser = req.body;

        userModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.json(null);
                    } else {
                        return userModel.createUser(newUser);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            )
            .then(
                function (user) {
                    if (user) {
                        req.login(user,
                            function (err) {
                                if (err) {
                                    console.log(err);
                                    res.status(400).send(err);
                                } else {
                                    res.json(user);
                                }
                            }
                        );
                    }
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }


    function createUser(req, res) {
        var user = req.body;

        //encrypt the password when registering
        user.password = bcrypt.hashSync(user.password);

        userModel
            .createUser(user)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllUsers(req, res) {
        userModel
            .findAllUser()
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function findUserByUsername(req, res) {
        var username = req.params.username;

        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }


    function findUserProfileByUsername(req, res) {
        var username = req.params.username;
        userModel.findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }


    function updateUser(req, res) {
        var userId = req.params.id;
        var newUser = req.body;

        //only admin can update the role of the user
        if (isAdmin(req.user)) {

            //clear roles string from user input
            if (typeof newUser.roles == "string") {
                var roles = [];
                var rolesArr = newUser.roles.split(",");

                for (var i in rolesArr) {
                    var role = rolesArr[i].trim();
                    roles.push(role);
                }
                newUser.roles = roles;
            }
        }

        //encrypt the password when password is changed
        userModel.findUserById(userId)
            .then(
                function (user) {
                    //when password changed
                    var oldPassword = user.password;
                    if (newUser.password != oldPassword) {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        //console.log("encrypt when update" + newUser.password);
                    }

                    return userModel.updateUser(userId, newUser);
                }
            )
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );


        //userModel
        //    .updateUser(userId, newUser)
        //    .then(
        //        function (users) {
        //            res.json(users);
        //        },
        //        function (err) {
        //            res.status(400).send(err);
        //        }
        //    );

    }

    function deleteUser(req, res) {
        var userId = req.params.id;

        console.log(req.user);
        console.log(req.user.roles);
        console.log(req.user.roles.indexOf("admin"));

        if (isAdmin(req.user)) {
            userModel
                .deleteUser(userId)
                .then(
                    function (users) {
                        console.log("delete user");

                        res.json(users);
                    },
                    function (err) {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function isAdmin(user) {
        if (user.roles.indexOf("admin") >= 0) {
            return true
        }
        return false;
    }


};