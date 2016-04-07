var q = require("q");
var mongoose = require("mongoose");

module.exports = function (db) {
    var UserSchema = require("./user.schema.server.js")();
    var ProUserModel = mongoose.model("ProUserModel", UserSchema);


    var api = {
        createUser: createUser,
        findAllUser: findAllUser,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials

    };
    return api;


    function createUser(user) {
        var deferred = q.defer();
        ProUserModel.create(user,
            function (err, user) {
                if (!err) {
                    deferred.resolve(user);
                } else {
                    deferred.reject(err);
                }

            });
        return deferred.promise;
    }


    function findAllUser() {
        var deferred = q.defer();

        ProUserModel.find(function (err, users) {
            if (!err) {
                deferred.resolve(users);
            } else {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }


    function findUserById(userId) {
        var deferred = q.defer();
        ProUserModel.findById(userId, function (err, user) {
            if (!err) {
                deferred.resolve(user);
            } else {
                deferred.reject(err);
            }
        });

        return deferred.promise;
    }


    function updateUser(userId, newUser) {
        var deferred = q.defer();
        ProUserModel
            .update({_id: userId}, {$set: newUser}, function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        ProUserModel
            .remove({_id: userId}, function (err, stats) {
                if (!err) {
                    deferred.resolve(stats);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }


    function findUserByUsername(username) {
        var deferred = q.defer();

        ProUserModel
            .findOne({username: username},
                function (err, user) {
                    if (!err) {
                        deferred.resolve(user);
                    } else {
                        deferred.reject(err);
                    }
                });

        return deferred.promise;
    }


    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        ProUserModel.findOne(
            {
                username: credentials.username,
                password: credentials.password
            },
            function (err, user) {
                if (!err) {
                    deferred.resolve(user);
                } else {
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }
};