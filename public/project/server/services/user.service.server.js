module.exports = function(app, userModel, db) {

    app.post("/api/project/user", createUser);
    app.get("/api/project/user", findAllUsers);
    app.get('/api/project/user/:id', findUserById);
    app.post("/api/project/user/login", findUserByCredentials);
    app.put("/api/project/user/:id", updateUser);
    app.delete("/api/project/user/:id", deleteUser);
    app.get("/api/project/profile/:username", findUserProfileByUsername);




    function createUser(req, res) {
        var user = req.body;
        userModel.createUser(user)
            .then(
                function(user){
                    res.json(user);
                }, function(err) {
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

    function findUserById(req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);
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

    function findUserByCredentials(req, res) {
        var credentials = req.body;
        userModel.findUserByCredentials(credentials)
            .then(
                function(user){
                    res.json(user);
                }, function(err) {
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
        var user = req.body;
        userModel.updateUser(userId, user)
            .then(
                function (user) {
                    res.json(user);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params.id;
        userModel.deleteUser(userId)
            .then(
                function (users) {
                    res.json(users);
                },
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
}