module.exports = function (app, userModel) {

    app.post("/api/assignment/user", createUser);
    app.get("/api/assignment/user", findUser);
    app.get('/api/assignment/user/:id', findUserById);
    app.post("/api/assignment/user/login", findUserByCredentials);
    app.put("/api/assignment/user/:id", updateUser);
    app.delete("/api/assignment/user/:id", deleteUser);
    app.get("/api/assignment/loggedin", loggedin)
    app.post("/api/assignment/logout", logout)


    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                //promise resolved
                function (doc) {
                    //set current user in session
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                //promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function findUser(req, res) {
        var username = req.param("username");
        console.log("username " + username);

        if (!username) {
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
        } else {
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
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );

    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
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

    function findUserByCredentials(req, res) {
        var credentials = req.body;
        userModel
            .findUserByCredentials(credentials)
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
        var user = req.body;
        //console.log("receive from client: userId-" + userId + " user-" + user.username);
        userModel
            .updateUser(userId, user)
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.param.id;
        userModel
            .deleteUser(userId)
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }

    function logout(req, res) {
        req.session.destroy();
        res.send(200);
    }

};