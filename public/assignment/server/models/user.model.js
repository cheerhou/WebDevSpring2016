//use the mock data for testing
var mockUsers = require("./user.mock.json");
var uuid = require("node-uuid");

module.exports = function(app) {
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
        //get an id to new created user
        var newUser = {
            _id: uuid.v4(),
            username: user.username,
            password: user.password,
            email: user.email
        };
        mockUsers.push(newUser);
        return mockUsers;
    }

    function findAllUser() {
        return mockUsers;
    }

    function findUserById(userId) {
        //console.log("user id " + userId);
        for(var i in mockUsers) {
            if(mockUsers[i]._id === userId) {
                return mockUsers[i];
            }
        }
        return null;
    }

    function updateUser(userId, newUser) {
        for(var i in mockUsers) {
            if (mockUsers[i]._id === userId) {
                mockUsers[i].firstName = newUser.firstName;
                mockUsers[i].lastName = newUser.lastName;
                mockUsers[i].username = newUser.username;
                mockUsers[i].password = newUser.password;
                mockUsers[i].email = newUser.email;

                console.log("in user model: " + newUser.firstName + " " + newUser.lastName);
            }
        }
        return mockUsers;
    }

    function deleteUser(userId) {
        for(var i in mockUsers) {
            if (mockUsers[i]._id === userId) {
                mockUsers.splice(i, 1);
            }
        }
        return mockUsers;
    }

    function findUserByUsername(username) {
        for(var i in mockUsers) {
            if (mockUsers[i].username === username) {
                return mockUsers[i];
            }
        }
        return null;
    }

    function findUserByCredentials(credentials) {
        for(var i in mockUsers) {
            if (mockUsers[i].username === credentials.username && mockUsers[i].password === credentials.password) {
                return mockUsers[i];
            }
        }
        return null;
    }
}