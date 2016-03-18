//use the mock data for testing
var mockUsers = require("./user.mock.json");

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
        mockUsers.push(user);
        return mockUsers;
    }

    function findAllUser() {
        return mockUsers;
    }

    function findUserById(userId) {
        userId = parseInt(userId);
        //console.log("user id " + userId);
        for(var i in mockUsers) {
            if(mockUsers[i]._id === userId) {
                return mockUsers[i];
            }
        }
        return null;
    }

    function updateUser(userId, newUser) {
        userId = parseInt(userId);
        for(var i in mockUsers) {
            if (mockUsers[i]._id === userId) {
                mockUsers[i].firstName = newUser.firstName;
                mockUsers[i].lastName = newUser.lastName;
                mockUsers[i].username = newUser.username;
                mockUsers[i].password = newUser.password;
            }
        }
        return mockUsers;
    }

    function deleteUser(userId) {
        userId = parseInt(userId);
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