var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function (app, assignmentUserModel, projectUserModel) {
    var auth = authenticated;

    passport.use('assignment', new LocalStrategy(assignmentLocalStrategy));
    passport.use('project', new LocalStrategy(projectLocalStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    //for assignment user
    app.post('/api/assignment/login', passport.authenticate('assignment'), login);
    app.get("/api/assignment/loggedin", auth, loggedin);
    app.post("/api/assignment/logout", auth, logout);
    app.post("/api/assignment/register", assignmentRegister);
    app.post("/api/assignment/user", auth, assignmentCreateUser);

    app.get("/api/assignment/user", auth, asFindAllUsers);
    app.get("/api/assignment/user/:username", auth, asFindUserByUsername);
    app.put("/api/assignment/user/:id", auth, asUpdateUser);
    app.delete("/api/assignment/user/:id", auth, asDeleteUser);
    app.get("/api/assignment/profile/:username", auth, asFindUserProfileByUsername);


    //for project user
    app.post('/api/project/login', passport.authenticate('project'), login);
    app.post('/api/project/logout', auth, logout);
    app.get('/api/project/loggedin', auth, loggedin);
    app.post('/api/project/register', projectRegister);

    app.post("/api/project/user", auth, proCreateUser);
    app.get("/api/project/user", auth, proFindAllUsers);
    app.get('/api/project/user/:id', auth, proFindUserById);
    app.put("/api/project/user/:id", auth, proUpdateUser);
    app.delete("/api/project/user/:id", auth, proDeleteUser);
    app.get("/api/project/profile/:username", auth, proFindUserProfileByUsername);


    function authenticated(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function assignmentLocalStrategy(username, password, done) {
        assignmentUserModel
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

    function projectLocalStrategy(username, password, done) {
        projectUserModel
            .findUserByUsername(username)
            .then(
                function (user) {
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
        done(null, user);
    }

    function deserializeUser(user, done) {

        if (user.type == 'assignment') {
            assignmentUserModel
                .findUserById(user._id)
                .then(
                    function (user) {
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );
        } else if (user.type == 'project') {
            projectUserModel
                .findUserById(user._id)
                .then(
                    function (user) {
                        done(null, user);
                    },
                    function (err) {
                        done(err, null);
                    }
                );
        }
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

    function assignmentRegister(req, res) {
        var newUser = req.body;

        assignmentUserModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.json(null);
                    } else {
                        return assignmentUserModel.createUser(newUser);
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

    //admin can create user
    function assignmentCreateUser(req, res) {
        var user = req.body;

        assignmentUserModel
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

    function asFindAllUsers(req, res) {
        assignmentUserModel
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

    function asFindUserByUsername(req, res) {
        var username = req.params.username;

        assignmentUserModel
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


    function asFindUserProfileByUsername(req, res) {
        var username = req.params.username;
        assignmentUserModel.findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }


    function asUpdateUser(req, res) {
        var userId = req.params.id;
        var newUser = req.body;

        //only admin can update the role of the user
        if (asIsAdmin(req.user)) {

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
        assignmentUserModel.findUserById(userId)
            .then(
                function (user) {
                    //when password changed
                    var oldPassword = user.password;
                    if (newUser.password != oldPassword) {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        //console.log("encrypt when update" + newUser.password);
                    }

                    return assignmentUserModel.updateUser(userId, newUser);
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

    }

    function asDeleteUser(req, res) {
        var userId = req.params.id;

        //console.log(req.user);
        //console.log(req.user.roles);
        //console.log(req.user.roles.indexOf("admin"));

        if (asIsAdmin(req.user)) {
            assignmentUserModel
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

    function asIsAdmin(user) {
        if (user.roles.indexOf("admin") >= 0) {
            return true
        }
        return false;
    }

    //==========================project
    function projectRegister(req, res) {
        var newUser = req.body;

        projectUserModel
            .findUserByUsername(newUser.username)
            .then(
                function (user) {
                    if (user) {
                        res.json(null);
                    } else {
                        return projectUserModel.createUser(newUser);
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

    function proCreateUser(req, res) {
        var user = req.body;
        projectUserModel.createUser(user)
            .then(
                function(user){
                    res.json(user);
                }, function(err) {
                    res.status(400).send(err);
                }
            );

    }

    function proFindAllUsers(req, res) {
        projectUserModel
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

    function proFindUserById(req, res) {
        var userId = req.params.id;
        var user = projectUserModel.findUserById(userId);
        res.json(user);
    }

    function proFindUserByUsername(req, res) {
        var username = req.params.username;

        projectUserModel
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

    function proFindUserProfileByUsername(req, res) {
        var username = req.params.username;
        projectUserModel.findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function proUpdateUser(req, res) {
        var userId = req.params.id;
        var user = req.body;
        projectUserModel.updateUser(userId, user)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function proDeleteUser(req, res) {
        var userId = req.params.id;
        projectUserModel.deleteUser(userId)
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
};