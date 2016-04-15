var q = require("q");
var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');


module.exports = function (db) {
    var UserSchema = require("./user.schema.server.js")();
    var ProjectUserModel = mongoose.model("ProjectUserModel", UserSchema);


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

        //encrypt the password when registering
        user.password = bcrypt.hashSync(user.password);

        ProjectUserModel.create(user,
            function (err, user) {
                if (!err) {
                    deferred.resolve(user);
                } else {
                    deferred.reject(err);
                }

            }
        );
        return deferred.promise;
    }


    function findAllUser() {
        var deferred = q.defer();

        ProjectUserModel.find(
            function (err, users) {
                if (!err) {
                    deferred.resolve(users);
                } else {
                    deferred.reject(err);
                }
            }
        );

        return deferred.promise;
    }


    function findUserById(userId) {
        var deferred = q.defer();
        ProjectUserModel.findById(userId, function (err, user) {
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
        ProjectUserModel
            .update(
                {_id: userId},
                {
                    $set: {
                        username: newUser.username,
                        password: newUser.password,
                        firstName: newUser.firstName,
                        lastName: newUser.lastName,
                        roles: newUser.roles,
                        email: newUser.email,
                        phone: newUser.phone
                    }
                },
                function (err, stats) {
                    if (!err) {
                        deferred.resolve(stats);
                    } else {
                        deferred.reject(err);
                    }
                }
            );
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        ProjectUserModel
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

        ProjectUserModel
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

        ProjectUserModel.findOne(
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